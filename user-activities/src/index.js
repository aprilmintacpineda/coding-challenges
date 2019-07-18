import 'date-polyfill';
import 'normalize.css';
import './polyfills';
import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { initializeStore } from 'fluxible-js';
import * as serviceWorker from './serviceWorker';
import App from './App';

function getInitialStore () {
  return {
    boards: [],
    Popup: null
  };
}

initializeStore({
  initialStore: getInitialStore(),
  persist: {
    syncStorage: window.localStorage,
    restore: savedStore => ({
      boards: savedStore.boards
    })
  }
});

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
