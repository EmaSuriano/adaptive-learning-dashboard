import {
  LineChart,
  Line,
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, Book, Clock, Target, Brain } from 'lucide-react';

const LEARNING_DATA = {
  performanceHistory: Array.from({ length: 20 }, (_, i) => ({
    session: i + 1,
    performance: 0.5 + Math.random() * 0.3,
    expectedPerformance: 0.6 + Math.random() * 0.2,
    difficulty: 2 + Math.random() * 2,
  })),
  conceptMastery: {
    vocabulary: {
      basic_nouns: 0.8,
      basic_verbs: 0.7,
      adjectives: 0.6,
      adverbs: 0.4,
      idioms: 0.3,
    },
    grammar: {
      present_simple: 0.9,
      past_simple: 0.7,
      present_perfect: 0.5,
      conditionals: 0.3,
      passive_voice: 0.2,
    },
  },
  timeAnalysis: Array.from({ length: 10 }, (_, i) => ({
    concept: `Concept ${i + 1}`,
    averageTime: Math.random() * 100 + 50,
    successRate: Math.random() * 0.5 + 0.3,
  })),
  learningPath: {
    currentLevel: 'B1',
    progress: 0.65,
    recentTopics: [
      { name: 'Past Perfect', status: 'completed', score: 0.85 },
      { name: 'Conditionals', status: 'in_progress', score: 0.6 },
      { name: 'Modal Verbs', status: 'pending', score: 0 },
    ],
  },
};

const LearningProgressDashboard = () => {
  const learningData = LEARNING_DATA;

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <Brain className="w-8 h-8" />
        Language Learning Progress Dashboard
      </h1>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="concepts" className="flex items-center gap-2">
            <Book className="w-4 h-4" />
            Concepts
          </TabsTrigger>
          <TabsTrigger value="time" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Time Analysis
          </TabsTrigger>
          <TabsTrigger value="path" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Learning Path
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Performance Trend</h3>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={learningData.performanceHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="session" />
                    <YAxis domain={[0, 1]} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="performance"
                      stroke="#8884d8"
                      name="Actual Performance"
                    />
                    <Line
                      type="monotone"
                      dataKey="expectedPerformance"
                      stroke="#82ca9d"
                      name="Expected Performance"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">
                  Concept Mastery Overview
                </h3>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart
                    data={[
                      ...Object.entries(
                        learningData.conceptMastery.vocabulary,
                      ).map(([key, value]) => ({
                        concept: key,
                        mastery: value,
                        type: 'vocabulary',
                      })),
                      ...Object.entries(
                        learningData.conceptMastery.grammar,
                      ).map(([key, value]) => ({
                        concept: key,
                        mastery: value,
                        type: 'grammar',
                      })),
                    ]}
                  >
                    <PolarGrid />
                    <PolarAngleAxis dataKey="concept" />
                    <PolarRadiusAxis domain={[0, 1]} />
                    <Radar
                      name="Concept Mastery"
                      dataKey="mastery"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.6}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="concepts">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Vocabulary Mastery</h3>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={Object.entries(
                      learningData.conceptMastery.vocabulary,
                    ).map(([key, value]) => ({
                      concept: key,
                      mastery: value,
                    }))}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="concept" />
                    <YAxis domain={[0, 1]} />
                    <Tooltip />
                    <Bar dataKey="mastery" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Grammar Mastery</h3>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={Object.entries(
                      learningData.conceptMastery.grammar,
                    ).map(([key, value]) => ({
                      concept: key,
                      mastery: value,
                    }))}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="concept" />
                    <YAxis domain={[0, 1]} />
                    <Tooltip />
                    <Bar dataKey="mastery" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="time">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">
                Time vs Success Analysis
              </h3>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={learningData.timeAnalysis}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="concept" />
                  <YAxis yAxisId="left" domain={[0, 150]} />
                  <YAxis yAxisId="right" orientation="right" domain={[0, 1]} />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="averageTime"
                    stroke="#8884d8"
                    name="Average Time (seconds)"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="successRate"
                    stroke="#82ca9d"
                    name="Success Rate"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="path">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Current Progress</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Current Level</p>
                    <p className="text-2xl font-bold">
                      {learningData.learningPath.currentLevel}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Level Progress</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{
                          width: `${learningData.learningPath.progress * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Recent Topics</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {learningData.learningPath.recentTopics.map(
                    (topic, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <p className="font-medium">{topic.name}</p>
                          <p className="text-sm text-gray-500 capitalize">
                            {topic.status.replace('_', ' ')}
                          </p>
                        </div>
                        {topic.status !== 'pending' && (
                          <div className="text-right">
                            <p className="font-bold">
                              {(topic.score * 100).toFixed(0)}%
                            </p>
                          </div>
                        )}
                      </div>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};


export default LearningProgressDashboard;