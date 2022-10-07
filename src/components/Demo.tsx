import type { Component } from 'solid-js';

import logo from './logo.svg';
import styles from './Demo.module.css';

const Demo: Component = () => {
  return (
    <div class="text-center">
      <header class="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white">
        <img src={logo} class={styles.logo} alt="logo" />
        <p class="text-5xl text-red-400 font-thin py-10">
          Welcome to the REAL world!
        </p>
        <p class="text-2xl tracking-widest pb-10">
          Edit <code class="text-red-200">components/Demo.tsx</code> and save to reload.
        </p>
        <p><a class="text-2xl text-green-600 no-underline hover:text-green-400" href="https://github.com/solidjs/solid"
              target="_blank" rel="noopener noreferrer">
          Learn Solid ➲
        </a></p>
      </header>
    </div>
  );
};

export default Demo;
