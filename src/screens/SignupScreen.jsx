import React, {useContext, useState} from 'react';
import {View, Text, TouchableOpacity, Platform, StyleSheet, Alert} from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import {AuthContext} from '../navigation/AuthProvider';
import { Colors } from '../utils/Colors';

const SignupScreen = ({navigation}) => {
  const [name, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const {register} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create an account</Text>

      <FormInput
        labelValue={name}
        onChangeText={(username) => setUsername(username)}
        placeholderText="Username"
        iconType="pencil-outline"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholderText="Email"
        iconType="email-outline"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="Password (at least 6 characters or digits)"
        iconType="lock-outline"
        secureTextEntry={true}
      />

      <FormInput
        labelValue={confirmPassword}
        onChangeText={(userPassword) => setConfirmPassword(userPassword)}
        placeholderText="Confirm Password"
        iconType="lock-outline"
        secureTextEntry={true}
      />

      <FormButton
        buttonTitle="Sign Up"
        onPress={() => {
          if(name && email && password && confirmPassword){
            if(password != confirmPassword){
              Alert.alert("The confirm password doesn't match");
            } else{
              register(email, password);
            }
          }else{
            Alert.alert('Please fill in all the details.');
          }
        }}
      />

      <View>
        <SocialButton
          buttonTitle="Sign Up with Google"
          btnType="google"
          color={Colors.googleRed}
          backgroundColor={Colors.googleBackground}
          onPress={() => {}}
        />
      </View>

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.navButtonText}>Have an account? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: Colors.lightgrey,
  },
  navButton: {
    marginTop: 15,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.primaryColor,
    fontFamily: 'Lato-Regular',
  },
});