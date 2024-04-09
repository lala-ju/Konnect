import { View, Text, StyleSheet, Image, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Colors } from '../utils/Colors';
import { AuthContext } from '../navigation/AuthProvider';
import GeneralButton from '../components/GeneralButton';
import DefaultProfileImage from '../assets/images/defaultProfile.png'
import firestore from '@react-native-firebase/firestore';

const AccountScreen = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [back, setBack] = useState(true);

  const getUser = async () => {
    try {
      await firestore().collection('users').doc(user.uid).get()
        .then((documentSnapshot) => {
          if (documentSnapshot.exists) {
            setUserData(documentSnapshot.data());
          }
        });

      if (loading) {
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getUser();
    navigation.addListener("focus", () => setBack(!back));
  }, [back]);

  return (
    <SafeAreaView style={styles.safe}>
      {loading ? (
        <View style={styles.load}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View style={styles.container}>
          <Image
            style={styles.userImg}
            source={{ uri: userData ? userData.userImg || Image.resolveAssetSource(DefaultProfileImage).uri : Image.resolveAssetSource(DefaultProfileImage).uri }}
          />
          <Text style={styles.userName}>
            {userData ? userData.username || user.uid : user.uid}
          </Text>
          <Text style={styles.bio}>
            {userData ? userData.bio || 'bio' : 'bio'}
          </Text>
          <View>
            <GeneralButton
              buttonTitle="Followed Stars"
              color={Colors.darkgrey}
              backgroundColor={Colors.lightgrey}
              aligned='center'
              width='100%'
              onPress={() => {
                navigation.navigate('Followed', { uid: user.uid, liked: userData.likedStars });
              }}
            />
          </View>
          <View>
            <GeneralButton
              buttonTitle="Your Pins"
              color={Colors.darkgrey}
              backgroundColor={Colors.lightgrey}
              aligned='center'
              width='100%'
              onPress={() => {
                navigation.navigate('Posts', { uid: user.uid });
              }}
            />
          </View>
          <View>
            <GeneralButton
              buttonTitle="Edit Profile"
              color={Colors.darkgrey}
              backgroundColor={Colors.lightgrey}
              aligned='center'
              width='100%'
              onPress={() => {
                navigation.navigate('EditProfile', { data: userData });
              }}
            />
          </View>
          <View>
            <GeneralButton
              buttonTitle="Settings"
              color={Colors.darkgrey}
              backgroundColor={Colors.lightgrey}
              aligned='center'
              width='100%'
              onPress={() => {
                navigation.navigate('Setting');
              }}
            />
          </View>
          <View>
            <GeneralButton
              buttonTitle="Logout"
              color={Colors.white}
              backgroundColor={Colors.primaryColor}
              aligned='center'
              width='100%'
              onPress={() => {
                Alert.alert('Logout', 'You have to login again later', [
                  {
                    text: 'Cancel',
                    onPress: () => { },
                    style: 'cancel',
                  },
                  {
                    text: 'OK',
                    onPress: () => {
                      logout()
                    },
                  },
                ]);
              }}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  load: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  bio: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.darkgrey,
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default AccountScreen;