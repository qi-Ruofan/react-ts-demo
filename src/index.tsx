import React,{Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/reset.scss';
import './assets/styles/common.scss';
import './assets/styles/iconfont.scss';
import reportWebVitals from './reportWebVitals';

// 路由
import { RouterProvider } from 'react-router-dom'
import router from './router';

// store
import { Provider } from 'react-redux'
import store from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* Suspense配合懒加载 */}
    <Suspense>
      <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    </Suspense>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
