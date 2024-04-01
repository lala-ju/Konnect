import {ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Colors } from '../utils/Colors';
import AchievementCard from '../components/AchievementCard';
import { AuthContext } from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';

const AchievementScreen = ({navigation}) => {
  const {user} = useContext(AuthContext);

  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchlikedStar = async () => {
    try {
      await firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then(doc => {
        const { likedStars } = doc.data();
        setLikes(likedStars);
        //console.log(likedStars[0].time)
      });

      if (loading) {
        setLoading(false);
      }
    } catch(e){
      console.log(e)
    }
  };

  const days = (start) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const cur = new Date()
    const timeDifference = Math.abs(cur.getTime() - start.getTime());
    return Math.ceil(timeDifference / oneDay);
  }

  useEffect(() => {
    fetchlikedStar();
  }, [])

  if(loading){
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.load}>
          <ActivityIndicator size="large" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
    {ids.length === 0 ? (
      <View style={styles.load}>
        <Text style={styles.notice}>
          Explore some stars to view achievements !
        </Text>
      </View>
    ):(
      <View style={styles.container}>
        <FlatList
          data={likes}
          renderItem={({ item }) => (
            <AchievementCard
              starname={item.name}
              days={days(item.time.toDate())} 
              img=""
              onPress={() => navigation.navigate(
                'AchieveStar', 
                {
                  name: item.name,
                  official: item.official,
                  personal: item.personal,
                  days: days(item.time.toDate()),
                }
                )
              }
            />
          )}
          keyExtractor={item => item.id}
          ListHeaderComponent={null}
          ListFooterComponent={null}
          showsVerticalScrollIndicator={false}
        />
      </View>
    )}
    </SafeAreaView>
  );
};

export default AchievementScreen;

const styles  = StyleSheet.create({
  safe:{
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
    alignItems: 'left',
    padding: 20,
  },
  notice: {
    fontFamily: 'NotoSansTC-Regular',
    fontSize: 20,
    color: Colors.darkgrey,
  },
})