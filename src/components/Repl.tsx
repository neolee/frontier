import { Component, createSignal, For, JSX } from 'solid-js';
import Monaco from "@uwu/monaco-solid";
import { LanguageInfo, LANGUAGES, DEFAULT_LANGUAGE, getLanguageById, Language } from "./Language";

const execute = async (lang: LanguageInfo, source: string) => {
  const host = "https://judge0.paradigmx.net";
  // const host = "https://judge0-ce.p.rapidapi.com";
  const endpoint = "/submissions";
  const params = "?wait=true&base64_encoded=true&fields=*";
  const url = host + endpoint + params;

  const post_data = {
    "language_id": lang.id,
    "source_code": window.btoa(source),
    "stdin": ""
  };
  const config = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': '35ebaecfe8msh93c7fbf6220ac51p1f7804jsn4a46388653f7',
      'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
    },
    body: JSON.stringify(post_data)
  };
  // console.log(post_data);

  try {
    const response = await fetch(url, config);
    return response.json();
  } catch (e) {
    return e;
  }
}

const REPL: Component = () => {
  const [langCode, setLangCode] = createSignal(DEFAULT_LANGUAGE);
  const [source, setSource] = createSignal("");
  const [output, setOutput] = createSignal("ready");

  function decode(s: string): string {
    return s ? window.atob(s) : "<empty>";
  }

  function getLanguage(): LanguageInfo | undefined {
    const elm = document.getElementById('languages') as HTMLSelectElement;
    return getLanguageById(Number(elm.value));
  }

  function clearOutputLine() {
    setOutput("");
  }

  function addOutputLine(s: string) {
    var lines = output() ? output().split("\n") : [];
    lines.push(s);
    setOutput(lines.join("\n"));
  }

  function addOutputEmptyLine() {
    var lines = output() ? output().split("\n") : [];
    if (lines && lines[lines.length-1]) {
      addOutputLine("");
    }
  }

  function addOutputHeader(s: string) {
    addOutputLine(s);
    addOutputLine("=".repeat(s.length));
  }

  const onLangChange: JSX.EventHandlerUnion<HTMLSelectElement, Event> = () => {
    const lang = getLanguage();
    if (lang) {
      setLangCode(lang.langcode);
    }
  };

  const onExecute: JSX.EventHandler<HTMLButtonElement, MouseEvent> = () => {
    const lang = getLanguage();
    const src = source();
    if (lang && src) {
      setOutput("executing...");
      execute(lang, src).then((data) => {
        // console.log(data);
        clearOutputLine();

        const stdout = decode(data.stdout);
        const stderr = decode(data.stderr);

        if (data.status.id == 3) {
          addOutputHeader("stdout");
          addOutputLine(stdout);
          addOutputEmptyLine();
          addOutputHeader("stderr");
          addOutputLine(stderr);
        } else {
          addOutputLine("something went wrong (" + decode(data.message) + ")");
          addOutputEmptyLine();
          addOutputHeader("stderr");
          addOutputLine(stderr);
        }
      });
    }
  };

  return (
    <div class="min-h-screen bg-gray-100 dark:bg-gray-800">
      <header class="flex flex-col items-center justify-center text-gray-800 dark:text-white">
        <p class="py-10 font-thin text-5xl text-red-700 dark:text-red-400">
          Frontier - REPL
        </p>
        <p class="text-xl tracking-widest pb-10">
          based on <span class="text-red-500 dark:text-red-200">Monaco Editor</span> and <span class="text-red-500 dark:text-red-200">judge0</span>
        </p>
      </header>
      <div class="relative mb-4 px-2">
        <select id="languages" onchange={onLangChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block min-w-max p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option selected>Choose a programming language</option>
          <For each={LANGUAGES}>{(lang) =>
            <Language lang={lang} />
          }</For>
        </select>
        <button onMouseDown={onExecute} type="button" class="absolute right-0 top-0 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Execute!</button>
      </div>
      <div class="relative w-full px-2">
      <Monaco
          value={source()}
          valOut={setSource}
          lang={langCode()}
          theme="Nord"
          readonly={false}
          height="30rem"
          width="100%"
          otherCfg={{
            fontSize: 16,
            minimap: { enabled: false }
          }}
        />
      </div>
      <div class="relative px-2 py-4">
        <pre class="px-2 bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-red-100">
          <code>{output()}</code>
        </pre>
      </div>
    </div>
  );
};

export default REPL;
