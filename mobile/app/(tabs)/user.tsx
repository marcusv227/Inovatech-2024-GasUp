import React, { useState } from 'react';
import { View } from 'react-native';
import ProfileData from '../profileData';
import SignIn from '../signIn';
import SignUp from '../signUp';

export default function user() {
  const [screen, setScreen] = useState('logo');

  const renderScreen = () => {
    switch (screen) {
      case 'logo':
        return (
          <ProfileData        
            onLoginPress={ () => setScreen('login') }
            onRegisterPress={ () => setScreen('register') }
          />
        );
      case 'login':
        return <SignUp setScreen={setScreen}  />;
      case 'register':
        return <SignIn setScreen={setScreen}  />;
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {renderScreen()}
    </View>
  );
}
