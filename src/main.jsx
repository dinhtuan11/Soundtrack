import ReactDOM from 'react-dom/client'
import i18n from './i18n';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { I18nextProvider } from 'react-i18next';
import './App.css'
import store, { persistor } from './redux/store';
import { injectStore } from './utils/axios';
import { ThemeProvider } from "@material-tailwind/react";
import { MaterialTailwindControllerProvider } from './components/context';
import { injectStoreAdmin } from './utils/axiosAdmin';
import LoadingPage from './pages/exeption/LoadingPage';
import 'react-toastify/dist/ReactToastify.css';
import ToastComponent from './components/toastComponent/ToastComponent';
import "react-datepicker/dist/react-datepicker.css";
export const queryClient = new QueryClient();
injectStore(store)
injectStoreAdmin(store)
ReactDOM.createRoot(document.getElementById('root')).render(
  <I18nextProvider i18n={i18n}>
    <ToastComponent/>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <QueryClientProvider client={queryClient}>
        <MaterialTailwindControllerProvider>
        <ThemeProvider>
          <LoadingPage/>
          <RouterProvider router={router} />
        </ThemeProvider>
        </MaterialTailwindControllerProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </I18nextProvider>
)
