import React from 'react';
import PrincipalApp from './components/PrincipalApp';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <PrincipalApp />
    </AppProvider>
  );
}

export default App;
