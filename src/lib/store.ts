import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserSettings {
  name: string;
  nativeLanguage: string;
  targetLanguage: string;
  proficiencyLevel: string;
}

interface Message {
  id: string;
  content: string;
  author: "user" | "system";
  isStreaming?: boolean;
}

interface AgentSettings {
  agent: string;
}

interface AppState {
  agentSettings: AgentSettings;
  settings: UserSettings;
  messages: Message[];
  updateSettings: (settings: UserSettings) => void;
  addMessage: (message: Message) => void;
  updateMessage: (id: string, update: Partial<Message>) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      agentSettings: {
        agent: "agent",
      },
      settings: {
        name: "You",
        nativeLanguage: "English",
        targetLanguage: "Spanish",
        proficiencyLevel: "Beginner",
      },
      messages: [],
      updateSettings: (newSettings) => set({ settings: newSettings }),
      addMessage: (message) =>
        set((state) => ({
          messages: [...state.messages, message],
        })),
      updateMessage: (id, update) =>
        set((state) => ({
          messages: state.messages.map((msg) =>
            msg.id === id ? { ...msg, ...update } : msg,
          ),
        })),
    }),
    { name: "language-learning-storage" },
  ),
);
