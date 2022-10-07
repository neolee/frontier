import type { Component } from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';

const App: Component = () => {
  return (
    <div class="text-center">
      <header class="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white">
        <img src={logo} class={styles.logo} alt="logo" />
        <p class="text-5xl font-thin py-10">
          Welcome to the REAL world!
        </p>
        <p class="text-3xl text-red-400 tracking-widest pb-10">
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p><a class="text-2xl text-purple-600" href="https://github.com/solidjs/solid"
              target="_blank" rel="noopener noreferrer">
          Learn Solid
        </a></p>
      </header>
    </div>
  );
};

export default App;
