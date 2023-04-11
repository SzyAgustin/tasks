import React from 'react';
import PrincipalApp from './components/PrincipalApp';
import { AppProvider } from './context/AppContext';
import Modal from 'react-modal';
import { UserProvider } from './context/UserContext';

Modal.setAppElement('#root');

function App() {
  return (
    <AppProvider>
      <UserProvider>
        <PrincipalApp />
      </UserProvider>
    </AppProvider>
  );
}

export default App;
