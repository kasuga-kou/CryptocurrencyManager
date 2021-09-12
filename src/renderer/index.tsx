import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { buildLocalStore } from './redux/store';

import Index from './page/index';

ReactDOM.render(
  <section>
    <Provider store={buildLocalStore()}>
      <Index />
    </Provider>
  </section>,
  document.querySelector('#app')
);
