import { ActivityIndicator, SafeAreaView, StyleSheet, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import StarCard from '../components/StarCard'
import firestore from '@react-native-firebase/firestore';
import { FlatList } from 'react-native';
import { Colors } from '../utils/Colors';
import filter from 'lodash.filter';

const ExploreScreen = ({navigation}) => {
  const [stars, setStars] = useState(null);
  const [loading, setLoading] = useState(true);
  const [back, setBack] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [fullStars, setFull] = useState([]);

  const fetchStar = async() => {
    const list = [];
    try{
      await firestore()
      .collection('stars')
      .get()
      .then(querySnapshot => {
        // console.log('Total stars: ', querySnapshot.size);
        querySnapshot.forEach(documentSnapshot => {
          const {name, pins, followers, info, img} = documentSnapshot.data();
          list.push({
            id: documentSnapshot.id,
            name,
            pins, 
            followers,
            info,
            img,
          })
        });
      });

      setStars(list);
      setFull(list);
      if(loading){
        setLoading(false);
      }
    } catch(e) {
      console.log("error" + e);
    }
  }

  const search = (key) => {
    setSearchValue(key);
    if(key === ''){
      setStars(fullStars);
    }else{
      const formattedKey = key.toLowerCase();
      const filtered = filter(fullStars, (star) => {
        return contains(star, formattedKey);
      });
      setStars(filtered);
    }
  }

  const contains = (star, query) => {
    var checked = star.name.toLowerCase();
    if (checked.includes(query)){
      return true;
    }else{
      return false;
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
        <TextInput 
          placeholder='搜尋創作歌手或樂團'
          clearButtonMode='always'
          style={styles.search}
          autoCapitalize='none'
          autoCorrect={false}
          value={searchValue}
          onChangeText={(query) => search(query)}
        />
        <FlatList
          data={stars}
          renderItem={({item}) => (
            <StarCard
              starname={item.name}
              img={item.img}
              onPress={() => 
                navigation.navigate(
                  'StarDetail',  
                  {
                    id: item.id,
                    name: item.name,
                    info: item.info,
                    pins: item.pins,
                    followers: item.followers,
                    img: item.img,
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
  },
  search:{
    borderColor: Colors.darkgrey,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.background,
  },
})