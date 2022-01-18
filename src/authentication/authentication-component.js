import {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React from 'react';

import PatternImage from '../assets/pattern1.png';

const {width, height} = Dimensions.get('window');

const Input = ({label, value, onChangeText, secureTextEntry}) => (
  <View style={InputStyles.container}>
    <Text style={InputStyles.label}>{label}</Text>
    <TextInput
      style={InputStyles.textInput}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
    />
  </View>
);

const InputStyles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#000',
    fontWeight: '600',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#717171',
    borderRadius: 5,
    width: '100%',
    paddingHorizontal: 10,
  },
});

const AuthenticationComponent = ({onLogin}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeEmail = value => setEmail(value);
  const handleChangePassword = value => setPassword(value);

  return (
    <View style={AuthenticationStyles.container}>
      <ImageBackground
        source={PatternImage}
        resizeMode="cover"
        style={AuthenticationStyles.imageBackground}
      >
        <View style={AuthenticationStyles.inputContainer}>
          <Text style={AuthenticationStyles.title}>Sign In</Text>
          <Text style={AuthenticationStyles.subtitle}>
            Long time no see! Let's Sign in to get started!
          </Text>
          <Input
            label="Email Address"
            value={email}
            onChangeText={handleChangeEmail}
            secureTextEntry={false}
          />
          <Input
            label="Password"
            value={password}
            onChangeText={handleChangePassword}
            secureTextEntry={true}
          />
          <TouchableOpacity
            onPress={() => onLogin()}
            style={AuthenticationStyles.buttonContained}
          >
            <Text style={AuthenticationStyles.containedButtonText}>
              Sign In
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={AuthenticationStyles.button}>
            <Text style={AuthenticationStyles.buttonText}>Forgot Password</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default AuthenticationComponent;

const AuthenticationStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  inputContainer: {
    backgroundColor: '#fff',
    height: height * 0.65,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    marginBottom: 10,
    fontSize: 24,
    marginBottom: 10,
    fontWeight: '700',
    color: '#000',
  },
  subtitle: {
    fontSize: 18,
    maxWidth: '70%',
    color: '#000',
    marginBottom: 10,
    opacity: 0.4,
  },
  containedButtonText: {
    color: '#fff',
  },
  buttonContained: {
    marginTop: 30,
    width: '100%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    borderRadius: 5,
    backgroundColor: '#2429CF',
  },
  button: {
    marginTop: 10,
    width: '100%',
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#2429CF',
  },
  buttonText: {
    color: '#2429CF',
  },
});
