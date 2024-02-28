import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useContext } from 'react';
import { Colors } from '../utils/Colors';
import { AuthContext } from '../navigation/AuthProvider';
import FormButton from '../components/FormButton';


const AccountScreen = () => {
  const {logout} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.info}>Username</Text>
        <Text style={styles.info}>Email</Text>
        <Text style={styles.info}>Followed Stars</Text>
        <Text style={styles.info}>Posts</Text>
      </View>
      <FormButton
        buttonTitle="Sign Out"
        onPress={() => {
          logout();
        }}
      />
    </View>
  ); 
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  subContainer:{
    justifyContent: 'center',
    alignItems: 'left',
    padding: 20,
  },
  info: {
    textAlign: 'left',
    fontSize: 20,
    color: Colors.primaryColor,
    fontWeight: '500',
    marginTop: 30,
  },
  logout: {
    fontSize: 18,
    color: Colors.white,
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: Colors.primaryColor,
    padding: 20,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
});

export default AccountScreen;