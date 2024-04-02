import { View, Text, SafeAreaView, StyleSheet, Image, ScrollView, ActivityIndicator, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import PinCard from '../components/PinCard'
import firestore from '@react-native-firebase/firestore'
import { AuthContext } from '../navigation/AuthProvider'

const PersonalPostScreen = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const [pins, setPins] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const fetchPins = async() => {
    const list = [];
    try{
      await firestore().collection('pins')
      .where('userID', '==', user.uid)
      .orderBy('postTime', 'desc')
      .get()
      .then((query) => {
        query.forEach((doc) => {
          const{caption, addr, postTime, star, img} = doc.data();
          list.push({
            id: doc.id,
            postTime,
            caption,
            addr,
            star, 
            img
          })
        })
      })

      setPins(list);

      if(loading){
        setLoading(false);
      }
    }catch(e){
      console.log(e);
    }
  }

  useEffect(() => {
    fetchPins();
  }, [navigation, loading])


  return (
    <SafeAreaView style={styles.safe}>
    {loading? (
      <View style={styles.load}>
        <ActivityIndicator size="large" />
      </View>
    ):(
      <View style={styles.container}>
        <FlatList
          data={pins}
          renderItem={({item}) => (
            <PinCard
              event=""
              star={item.star}
              addr={item.addr}
              time={item.postTime}
              img={item.img}
              info={item.caption}
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
  )
}

export default PersonalPostScreen

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
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }
})