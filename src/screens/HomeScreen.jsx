import { View, Text, SafeAreaView, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import NewsCard from '../components/NewsCard';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../navigation/AuthProvider';


const HomeScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext)
  const [news, setNews] = useState([]);
  const [liked, setLiked] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchlikedStar = async () => {
    try {
      await firestore().collection('users').doc(user.uid).get()
        .then((documentSnapshot) => {
          const { likedStars } = documentSnapshot.data();
          setLiked(likedStars.map(({ name }) => name));
        })
    } catch (e) {
      console.log(e);
    }
  }

  const fetchNews = async () => {
    const list = [];
    try {
      await firestore()
        .collection('news')
        .orderBy('postTime', 'desc')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(documentSnapshot => {
            const { star, starImg, title, postTime, info, playTime, img, place } = documentSnapshot.data();
            if (liked.includes(star)) {
              list.push({
                id: documentSnapshot.id,
                star,
                starImg,
                title,
                postTime,
                info,
                playTime,
                img,
                place
              })
            }
          });
        });

      setNews(list);
      if (loading) {
        setLoading(false);
      }
    } catch (e) {
      console.log("error" + e);
    }
  }

  useEffect(() => {
    fetchlikedStar();
  }, [navigation])

  useEffect(() => {
    fetchNews();
  }, [liked])

  return (
    <SafeAreaView style={styles.safe}>
      {loading ? (
        <View style={styles.load}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View style={styles.container}>
          <FlatList
            data={news}
            renderItem={({ item }) => (
              <NewsCard
                star={item.star}
                starImg={item.starImg}
                postTime={item.postTime}
                playTime={item.playTime}
                title={item.title}
                img={item.img}
                onPress={() => navigation.navigate(
                  'info', 
                  {
                    star: item.star,
                    starImg: item.starImg,
                    postTime: item.postTime,
                    playTime: item.playTime,
                    title: item.title,
                    info: item.info,
                    img: item.img,
                    place: item.place
                  }
                )}
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

export default HomeScreen;

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
    padding: 20,
  },
})