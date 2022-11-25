import type { Component } from 'solid-js';

const Destiny = (props: { href: string, label: string }) => {
  return (
    <li class="py-2">
      <a class="text-3xl text-green-600 hover:text-green-400" href={props.href}>
        {props.label}
      </a>
    </li>
  )
}

const App: Component = () => {
  return (
    <div class="text-center">
      <header class="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white">
        <p class="text-5xl text-red-400 font-thin py-10">
          Welcome to the REAL world!
        </p>
        <p class="text-3xl tracking-widest pb-20">
          Choose your <span class="text-red-200">destiny</span>
        </p>
        <ul>
          <Destiny href="pages/demo.html" label="Demo"/>
          <Destiny href="pages/calendar.html" label="Calendar"/>
          <Destiny href="pages/repl.html" label="REPL" />
        </ul>
      </header>
    </div>
  );
};

export default App;
