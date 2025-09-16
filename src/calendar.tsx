/* @refresh reload */
import { render } from 'solid-js/web';
import "tailwindcss"

import './common.css';
import Calendar from './components/Calendar';

render(() => <Calendar />, document.getElementById('root') as HTMLElement);
