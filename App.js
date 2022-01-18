import {Text} from 'react-native';
import React, {useState} from 'react';
import AuthenticationComponent from './src/authentication/authentication-component';
import Dashaboard from './src/dashboard/dashboard-component';

const App = () => {
  const [step, setStep] = useState(1);

  const Login = () => setStep(2)


  if (step === 1) {
    return <AuthenticationComponent onLogin={Login} />;
  } else {
    return <Dashaboard />;
  }
};

export default App;
