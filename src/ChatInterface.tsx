import { useEffect, useMemo, useRef, useState } from "react";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Client, Thread } from "@langchain/langgraph-sdk";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { match } from "ts-pattern";
import Markdown from "react-markdown";
import { Card, CardContent } from "./components/ui/card";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { v4 } from "uuid";
import { useStore } from "./lib/store";

const FormSchema = z.object({
  input: z.string().trim().min(1, "Message cannot be empty ..."),
});

const ResponseSchema = z.object({
  data: z
    .array(z.object({ content: z.string(), type: z.literal("ai") }))
    .min(1),
});

// move to env
const API_URL = "http://localhost:2024";

type Message =
  | { id: string; author: "user"; content: string }
  | { id: string; author: "system"; content: string; isStreaming?: boolean };

type StreamResponse =
  | { type: "stream"; content: string; done: boolean }
  | { type: "error"; error: string };

const useAgent = (agent: string) => {
  const client = new Client({ apiUrl: API_URL });
  const [thread, setThread] = useState<Thread | null>(null);

  const createThread = async () => {
    const newThread = await client.threads.create();
    setThread(newThread);

    return newThread;
  };

  const sendMessage = async (
    input: string,
    onStream: (response: StreamResponse) => void,
  ) => {
    let threadId = thread ? thread.thread_id : null;

    try {
      if (!threadId) {
        const newThread = await createThread();
        threadId = newThread.thread_id;
      }

      const streamResponse = client.runs.stream(threadId, agent, {
        input: { messages: [{ role: "user", content: input }] },
        streamMode: "messages",
      });

      let content = "";

      for await (const chunk of streamResponse) {
        try {
          const { data } = ResponseSchema.parse(chunk);
          content = data[0].content;
          onStream({ type: "stream", content, done: false });
        } catch (error) {
          // For now we only care about the messages with content
          continue;
        }
      }

      onStream({ type: "stream", content, done: true });
    } catch (error) {
      if (error instanceof Error) {
        onStream({ type: "error", error: error.message });
      } else {
        onStream({ type: "error", error: "Unknown error" });
      }
    }
  };

  return { sendMessage };
};

export const ChatInterface = () => {
  const { agentSettings, settings, messages, addMessage, updateMessage } =
    useStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  const { sendMessage } = useAgent(agentSettings.agent);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { input: "" },
  });

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const isLoading = useMemo(() => {
    const lastMessage = messages[messages.length - 1];

    return lastMessage?.author === "system" && lastMessage.isStreaming;
  }, [messages]);

  const onSubmit = async ({ input }: z.infer<typeof FormSchema>) => {
    const userMessage: Message = {
      author: "user",
      content: input,
      id: v4(),
    };

    addMessage(userMessage);
    form.setValue("input", "");

    const systemMessage: Message = {
      author: "system",
      content: "",
      id: v4(),
      isStreaming: true,
    };

    addMessage(systemMessage);

    await sendMessage(input, (response) => {
      // for some reason match doesn't work here...
      switch (response.type) {
        case "stream":
          updateMessage(systemMessage.id, {
            content: response.content,
            isStreaming: !response.done,
          });
          break;
        case "error":
          updateMessage(systemMessage.id, {
            content: response.error,
            isStreaming: false,
          });
          break;
        default:
          throw Error("Unknown response type");
      }
    });
  };

  return (
    <Card className="h-[calc(100vh-6rem)]">
      <CardContent className="flex flex-col h-full p-4 gap-4">
        <ScrollArea className="flex-1 pr-4 overflow-auto" type="always">
          <div className="space-y-4">
            {messages.map((message, i) =>
              match(message)
                .with({ author: "user" }, (curr) => (
                  <Card key={curr.id} className="bg-blue-50 ml-auto w-fit">
                    <CardContent className="p-4 flex flex-col items-end text-right">
                      {messages[i - 1]?.author !== curr.author && (
                        <span className="font-semibold">{settings.name}</span>
                      )}
                      <span>{curr.content}</span>
                    </CardContent>
                  </Card>
                ))
                .with({ author: "system" }, (curr) => (
                  <Card key={curr.id} className="bg-gray-50 mr-auto w-fit">
                    <CardContent className="p-4 flex flex-col">
                      <span className="font-semibold">Teacher</span>
                      <Markdown>{curr.content}</Markdown>
                      {curr.isStreaming && (
                        <span className="inline-block w-2 h-4 ml-1 bg-gray-400 animate-pulse" />
                      )}
                    </CardContent>
                  </Card>
                ))
                .exhaustive(),
            )}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full  gap-2 items-center space-x-6 justify-between"
          >
            <FormField
              control={form.control}
              name="input"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="Your text here"
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading}>
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
