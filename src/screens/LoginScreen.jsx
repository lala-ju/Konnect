import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import {AuthContext} from '../navigation/AuthProvider';
import { Colors } from '../utils/Colors';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const {googleLogin} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/Logo.png')}
        style={styles.logo}
      />
      <Text style={styles.text}>Konnect App</Text>

      {/* <FormInput
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
        placeholderText="Password"
        iconType="lock-outline"
        secureTextEntry={true}
      /> */}

      {/* <FormButton
        buttonTitle="Sign In"
        onPress={() => {
          if(email && password){
            login(email, password);
          }else{
            Alert.alert('Please fill in email and password.')
          }
        }}
      /> */}

      {/* <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
        <Text style={styles.navButtonText}>Forgot Password?</Text>
      </TouchableOpacity> */}

      <View>
        <SocialButton
          buttonTitle="Sign In with Google"
          btnType="google"
          color={Colors.googleRed}
          backgroundColor={Colors.googleBackground}
          onPress={() => googleLogin()}
        />
      </View>

      {/* <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.navButtonText}>
          Don't have an acount? Create here
        </Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: 'cover',
  },
  text: {
    fontSize: 28,
    marginBottom: 10,
    color: Colors.black,
  },
  // navButton: {
  //   marginTop: 15,
  // },
  // forgotButton: {
  //   marginVertical: 35,
  // },
  // navButtonText: {
  //   fontSize: 18,
  //   fontWeight: '500',
  //   color: Colors.primaryColor,
  //   fontFamily: 'Lato-Regular',
  // },
});