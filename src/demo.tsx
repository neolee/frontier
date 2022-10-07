/* @refresh reload */
import { render } from 'solid-js/web';
import "tailwindcss/tailwind.css";

import './common.css';
import Demo from './components/Demo';

render(() => <Demo />, document.getElementById('root') as HTMLElement);
