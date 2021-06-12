import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RecoilRoot } from 'recoil';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Container } from '@material-ui/core';

import Blog from './Components/Blog/Blog';


ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <React.Suspense fallback={<div>Loading...</div>}>
        <CssBaseline>
          <Container fixed>
            <Blog />
          </Container>
        </CssBaseline>
      </React.Suspense>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
