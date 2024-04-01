import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import StarCard from '../components/StarCard'
import firestore from '@react-native-firebase/firestore';
import { FlatList } from 'react-native';
import { Colors } from '../utils/Colors'

const FollowedStarScreen = ({ navigation, route }) => {
  const user = route.params.uid;
  var ids = []
  const [stars, setStars] = useState([]);
  const [back, setBack] = useState(true);
  const [starnum, setStarNum] = useState(0);
  const [loading, setLoading] = useState(true);

  const updateids = async () => {
    try {
      await firestore()
        .collection('users')
        .doc(user)
        .get()
        .then(doc => {
          const { likedStars } = doc.data();
          ids = likedStars.map(({ id }) => id);
        });

      if (loading) {
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  }

  const fetchStar = async () => {
    const list = [];
    try {
      await firestore()
        .collection('stars')
        .get()
        .then(querySnapshot => {
          // console.log('Total stars: ', querySnapshot.size);
          querySnapshot.forEach(documentSnapshot => {
            if (ids.includes(documentSnapshot.id)) {
              const { name, pins, followers, info } = documentSnapshot.data();
              list.push({
                id: documentSnapshot.id,
                name,
                pins,
                followers,
                info,
              })
            }
          });
        });

      setStars(list);
      setStarNum(list.length);
      if (loading) {
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    updateids();
    fetchStar();
    navigation.addListener("focus", () => setBack(!back));
  }, [back])

  useEffect(() => {
    fetchStar();
  }, [])

  if (loading) {
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
      {starnum === 0 ? (
        <View style={styles.load}>
          <Text style={styles.notice}>
            Explore some stars !
          </Text>
        </View>
      ) : (
        <View style={styles.container}>
          <FlatList
            data={stars}
            renderItem={({ item }) => (
              <StarCard
                starname={item.name}
                img=""
                onPress={() =>
                  navigation.navigate(
                    'StarDetail',
                    {
                      id: item.id,
                      name: item.name,
                      info: item.info,
                      pins: item.pins,
                      followers: item.followers,
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

export default FollowedStarScreen;

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
    alignItems: 'left',
    padding: 20,
  },
  notice: {
    fontFamily: 'NotoSansTC-Regular',
    fontSize: 20,
    color: Colors.darkgrey,
    marginLeft: 20,
  },
})