import { Component, createSignal } from 'solid-js';

export interface LanguageInfo {
  id: number;
  name: string;
  langcode: string;
};

export const LANGUAGES: Array<LanguageInfo> = [
  {
    "id": 75,
    "name": "C (Clang 7.0.1)",
    "langcode": "cpp"
  },
  {
    "id": 76,
    "name": "C++ (Clang 7.0.1)",
    "langcode": "cpp"
  },
  {
    "id": 86,
    "name": "Clojure (1.10.1)",
    "langcode": "clojure"
  },
  {
    "id": 51,
    "name": "C# (Mono 6.6.0.161)",
    "langcode": "csharp"
  },
  {
    "id": 60,
    "name": "Go (1.13.5)",
    "langcode": "go"
  },
  {
    "id": 62,
    "name": "Java (OpenJDK 13.0.1)",
    "langcode": "java"
  },
  {
    "id": 63,
    "name": "JavaScript (Node.js 12.14.0)",
    "langcode": "javascript"
  },
  {
    "id": 78,
    "name": "Kotlin (1.3.70)",
    "langcode": "kotlin"
  },
  {
    "id": 64,
    "name": "Lua (5.3.5)",
    "langcode": "lua"
  },
  {
    "id": 79,
    "name": "Objective-C (Clang 7.0.1)",
    "langcode": "objective-c"
  },
  {
    "id": 67,
    "name": "Pascal (FPC 3.0.4)",
    "langcode": "pascal"
  },
  {
    "id": 68,
    "name": "PHP (7.4.1)",
    "langcode": "php"
  },
  {
    "id": 71,
    "name": "Python (3.8.1)",
    "langcode": "python"
  },
  {
    "id": 80,
    "name": "R (4.0.0)",
    "langcode": "r"
  },
  {
    "id": 72,
    "name": "Ruby (2.7.0)",
    "langcode": "ruby"
  },
  {
    "id": 73,
    "name": "Rust (1.40.0)",
    "langcode": "rust"
  },
  {
    "id": 83,
    "name": "Swift (5.2.3)",
    "langcode": "swift"
  },
  {
    "id": 74,
    "name": "TypeScript (3.7.4)",
    "langcode": "typescript"
  }
];

export const DEFAULT_LANGUAGE = "javascript";

export function getLanguageById(id: number): LanguageInfo | undefined {
  return LANGUAGES.find(lang => lang.id === id);
}

export const Language: Component<{lang: LanguageInfo}> = (props) => {
  const lang: LanguageInfo = props.lang;
  if (lang.langcode == DEFAULT_LANGUAGE) {
    return <option value={lang.id} selected>{lang.name}</option>
  } else {
    return <option value={lang.id}>{lang.name}</option>
  }
};