import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { ChakraProvider } from './providers/ChakraProvider';
import { store } from './redux/store';

const criticalComponents = import('./components/critical');
const App = lazy(() => import('./App').then((module) => criticalComponents.then(() => module)));

function LoadingSpinner(): JSX.Element {
  return (
    <div className="loading-spinner">
      <div style={{ width: '80%', maxWidth: '600px' }}>
        <div className="skeleton" style={{ width: '60%' }} />
        <div className="skeleton" style={{ width: '80%' }} />
        <div className="skeleton" style={{ width: '70%' }} />
      </div>
    </div>
  );
}

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <ChakraProvider>
        <Suspense fallback={<LoadingSpinner />}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Suspense>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </ChakraProvider>
    </Provider>
  </StrictMode>,
);
