
import { BrowserRouter } from 'react-router-dom';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthContextProvider } from './contexts/AuthContext';
import './index.css'

import { AppProvider } from './contexts/AppContext.jsx';

// Import our custom CSS
import './assets/scss/styles.scss';

// Import all of Bootstrap's JS
import 'bootstrap/dist/js/bootstrap.bundle';
import { CartProvider } from 'react-use-cart';


ReactDOM.createRoot(document.getElementById('root')).render(
  <>

  <CartProvider>

   <AppProvider>

  <AuthContextProvider>
  <BrowserRouter>
  
    <App />
  
  </BrowserRouter>
  </AuthContextProvider>

  </CartProvider>

  </AppProvider>

  </>
)
