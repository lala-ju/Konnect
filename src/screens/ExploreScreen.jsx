import { ActivityIndicator, SafeAreaView, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import StarCard from '../components/StarCard'
import firestore from '@react-native-firebase/firestore';
import { FlatList } from 'react-native';

const ExploreScreen = ({navigation}) => {
  const [stars, setStars] = useState(null);
  const [loading, setLoading] = useState(true);
  const [back, setBack] = useState(true);

  const fetchStar = async() => {
    const list = [];
    try{
      await firestore()
      .collection('stars')
      .get()
      .then(querySnapshot => {
        // console.log('Total stars: ', querySnapshot.size);
        querySnapshot.forEach(documentSnapshot => {
          const {name, pins, followers, info} = documentSnapshot.data();
          list.push({
            id: documentSnapshot.id,
            name,
            pins, 
            followers,
            info,
          })
        });
      });

      setStars(list);
      if(loading){
        setLoading(false);
      }
    } catch(e) {
      console.log("error" + e);
    }
  }

  useEffect(() => {
    fetchStar();
    navigation.addListener("focus", () => setBack(!back));
  }, [back])

  return (
    <SafeAreaView style={styles.safe}>
      {loading? (
        <View style={styles.load}>
          <ActivityIndicator size="large" />
        </View>
      ):(
        <View style={styles.container}>
        <FlatList
          data={stars}
          renderItem={({item}) => (
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

export default ExploreScreen;

const styles = StyleSheet.create({
  safe:{
    flex: 1,
  },
  load:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container:{
    flex: 1,
    alignItems: 'left',
    padding: 20,
  }
})