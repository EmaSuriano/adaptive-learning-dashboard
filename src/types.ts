// Represents a single session's performance data
export interface PerformanceHistory {
  session: number;
  performance: number;
  expectedPerformance: number;
  difficulty: number;
}

// Represents the mastery level of a single concept
export interface ConceptMastery {
  [concept: string]: number;
}

// Represents the mastery levels for vocabulary and grammar
export interface MasteryData {
  vocabulary: ConceptMastery;
  grammar: ConceptMastery;
}

// Represents the time analysis data for a single concept
export interface TimeAnalysis {
  concept: string;
  averageTime: number;
  successRate: number;
}

// Represents a single topic in the learning path
export interface LearningPathTopic {
  name: string;
  status: 'completed' | 'in_progress' | 'pending';
  score: number;
}

// Represents the learning path data
export interface LearningPath {
  currentLevel: string;
  progress: number;
  recentTopics: LearningPathTopic[];
}

// Represents the entire learning data structure
export interface LearningData {
  performanceHistory: PerformanceHistory[];
  conceptMastery: MasteryData;
  timeAnalysis: TimeAnalysis[];
  learningPath: LearningPath;
}
