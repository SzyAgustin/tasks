import React from 'react';
import PrincipalApp from './components/PrincipalApp';
import { AppProvider } from './context/AppContext';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function App() {
  return (
    <AppProvider>
      <PrincipalApp />
    </AppProvider>
  );
}

export default App;
