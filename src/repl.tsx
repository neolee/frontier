/* @refresh reload */
import { render } from 'solid-js/web';
import "tailwindcss/tailwind.css";

import './common.css';
import REPL from './components/Repl';

render(() => <REPL />, document.getElementById('root') as HTMLElement);
