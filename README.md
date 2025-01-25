# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```

# Adaptive Learning Dashboard

This project is a language learning progress dashboard that visualizes various aspects of a learner's progress using different types of charts and data representations.

## Features

- **Performance Trend**: Displays the learner's performance over multiple sessions using a line chart.
- **Concept Mastery Overview**: Shows the mastery level of different vocabulary and grammar concepts using a radar chart.
- **Vocabulary Mastery**: Visualizes the mastery level of various vocabulary concepts using a bar chart.
- **Grammar Mastery**: Visualizes the mastery level of various grammar concepts using a bar chart.
- **Time vs Success Analysis**: Analyzes the average time spent on concepts and the success rate using a line chart.
- **Learning Path**: Displays the current learning level, progress, and recent topics with their completion status and scores.

## Components

### LearningProgressDashboard

The `LearningProgressDashboard` component is the main component that renders the entire dashboard. It uses the following data structure:

```typescript
type PerformanceHistory = {
  session: number;
  performance: number;
  expectedPerformance: number;
  difficulty: number;
};

type ConceptMastery = {
  vocabulary: {
    basic_nouns: number;
    basic_verbs: number;
    adjectives: number;
    adverbs: number;
    idioms: number;
  };
  grammar: {
    present_simple: number;
    past_simple: number;
    present_perfect: number;
    conditionals: number;
    passive_voice: number;
  };
};

type TimeAnalysis = {
  concept: string;
  averageTime: number;
  successRate: number;
};

type LearningPath = {
  currentLevel: string;
  progress: number;
  recentTopics: {
    name: string;
    status: "completed" | "in_progress" | "pending";
    score: number;
  }[];
};

type LearningData = {
  performanceHistory: PerformanceHistory[];
  conceptMastery: ConceptMastery;
  timeAnalysis: TimeAnalysis[];
  learningPath: LearningPath;
};
```

### Tabs

The dashboard is divided into four main tabs:

1. **Overview**: Contains the performance trend and concept mastery overview.
2. **Concepts**: Contains separate charts for vocabulary and grammar mastery.
3. **Time Analysis**: Contains the time vs success analysis chart.
4. **Learning Path**: Contains the current progress and recent topics.

Each tab uses different charts from the `recharts` library to visualize the data.

### Charts

- **LineChart**: Used for performance trend and time vs success analysis.
- **RadarChart**: Used for concept mastery overview.
- **BarChart**: Used for vocabulary and grammar mastery.

### UI Components

- **Card**: Used to display each chart and its header.
- **Tabs, TabsContent, TabsList, TabsTrigger**: Used to create the tabbed interface.

## Getting Started

To run the project locally:

1. Clone the repository.
2. Install dependencies using `yarn install`.
3. Start the development server using `yarn start`.

## License

This project is licensed under the MIT License.
