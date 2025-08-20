import React, { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'aos/dist/aos.css';

import { router } from './Routes/router.jsx';
import AOS from 'aos';
import AuthProviders from './Providers/AuthProviders.jsx';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@emotion/react';
import darkFancyTheme from './config/theme.js';

const App = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <ThemeProvider theme={darkFancyTheme}>
      <AuthProviders>
      <div className="">
        <Toaster/>
        <RouterProvider router={router} />
      </div>
    </AuthProviders>
    </ThemeProvider>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
