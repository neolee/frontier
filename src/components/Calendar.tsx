import type { Component, JSX } from 'solid-js';
import { createSignal, createEffect, createResource, onMount } from 'solid-js';
import 'flowbite';
import { Datepicker } from 'flowbite-datepicker';
import moment from 'moment';
import 'moment/dist/locale/zh-cn';
import copy from 'copy-to-clipboard';

interface HolidayInfo {
  date: string;
  name: string;
  is_off: boolean;
};

const fetchCalendar = async (query: string) =>
  (await fetch(`https://horizon.paradigmx.net/calendar/monthly/${query}`)).json();

const Calendar: Component = () => {
  const [date, setDate] = createSignal<string>(moment().format('YYYY-MM-DD'));
  createEffect(() => {
    console.log('date is ', date());
  });

  const [query, setQuery] = createSignal<string>();
  const [calendar] = createResource(query, fetchCalendar);

  onMount(() => {
    const datepicker = document.getElementById('datepicker') as HTMLInputElement;
    new Datepicker(datepicker, {
      autohide: true,
      todayBtn: true,
      todayBtnMode: 1,
      todayHighlight: true,
      format: 'yyyy-mm-dd',
      orientation: 'bottom left',
    });
    datepicker.addEventListener('changeDate', () => {
      setDate(datepicker.value);
    });
  });

  const onGo: JSX.EventHandler<HTMLButtonElement, MouseEvent> = () => {
    const query = moment(date()).format('YYYYMMDD');
    setQuery(query);
  };

  const onCopy: JSX.EventHandler<HTMLButtonElement, MouseEvent> = () => {
    const display = document.getElementById('display') as HTMLElement;
    copy(display.innerText);
  };

  const renderCalendar = (data: Array<HolidayInfo>) => {
    if (!data) return '';

    moment.locale('zh-cn');

    var lines = Array<string>();

    lines.push('# ' + moment(date()).format('YYYY年MMM'));
    lines.push('');

    data.forEach(function (info: HolidayInfo) {
      const { date, name, is_off } = info;
      const d = moment(date);

      var desc = '';
      if (is_off)
        desc += '休息日（' + name + '）'
      else {
        desc += '工作日'
        if (name)
          desc += '（补' + name + '调休）';
      };

      const task = is_off ? '_休息一下吧_' : '- [ ] TODO';

      lines.push('## ' + d.format('MMMD日 dddd') + ' ' + desc);
      lines.push(task);
      lines.push('');
    });

    return lines.join('\n');
  };

  return (
    <div class="min-h-screen bg-gray-900">
      <header class="flex flex-col items-center justify-center text-white">
        <p class="text-5xl text-red-400 font-thin py-10">
          Frontier - Calendar
        </p>
        <p class="text-3xl tracking-widest pb-10">
          with <span class="text-red-200">holiday</span> info
        </p>
      </header>
      <div class="relative px-2">
        <div class="flex absolute inset-y-0 left-2 items-center pl-3 pointer-events-none">
          <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
        </div>
        <input id="datepicker" type="text" value={date()} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date" />
        <button onMouseDown={onGo} type="button" class="text-white absolute right-5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Go!</button>
      </div>
      <div class="relative px-2 py-4">
        <pre id="display" class="bg-gray-600 text-red-100 space-y-5">{renderCalendar(calendar())}</pre>
        <button onMouseDown={onCopy} type="button" hidden={(!calendar())} class="text-white absolute right-3 top-7 bg-gray-800 border border-gray-300 focus:outline-none hover:text-gray-800 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-6 py-2 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Copy</button>
      </div>
    </div>
  );
};

export default Calendar;
