import type { Component } from 'solid-js';

const Calendar: Component = () => {
  return (
    <div class="text-center">
      <header class="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white">
        <p class="text-5xl text-red-400 font-thin py-10">
          Frontier - Calendar
        </p>
        <p class="text-3xl tracking-widest pb-20">
          Monthly calendar with <span class="text-red-200">China holiday</span> info
        </p>
      </header>
    </div>
  );
};

export default Calendar;
