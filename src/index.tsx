/* @refresh reload */
import { render } from 'solid-js/web';
import "tailwindcss"

import './common.css';
import App from './components/App';

render(() => <App />, document.getElementById('root') as HTMLElement);
