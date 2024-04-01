import {ActivityIndicator,  View, Text, StyleSheet, Image, SafeAreaView, ScrollView, Alert } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { windowHeight } from '../utils/Dimension';
import DefaultProfileImage from '../assets/images/defaultProfile.png'
import firestore from '@react-native-firebase/firestore';
import { Colors } from '../utils/Colors';
import NumItemBox from '../components/NumItemBox';
import GeneralButton from '../components/GeneralButton';
import { AuthContext } from '../navigation/AuthProvider';

const StarScreen = ({navigation, route}) => {
    const {user} = useContext(AuthContext);
    const starid = route.params.id;
    const name = route.params.name;
    const info = route.params.info;
    const pins = route.params.pins;
    const [followers, setFollowers] = useState(route.params.followers);
    const [follow, setFollow] = useState(false);
    const [loading, setLoading] = useState(true);
    const [officialPins, setOfficial] = useState(null);
    const [followTime, setFollowTime] = useState(null);
    const [personalPins, setPersonal] = useState(null);


    const fetchFollowDetail = async() => {
        try{
            await firestore()
            .collection('users')
            .doc(user.uid)
            .get()
            .then(docSnapshot => {
                const {likedStars} = docSnapshot.data();
                var temp = likedStars.map(({ id }) => id);
                if(temp.includes(starid)){
                    setFollow(true);
                    var obj = likedStars.find(item => item.id === starid)
                    setFollowTime(obj['time']);
                    setOfficial(obj['official']);
                    setPersonal(obj['personal']);
                }else{
                    setFollow(false);
                }
                // setLikedStars(likedStars);
            });

            if(loading){
                setLoading(false);
            }
        } catch(e) {
          console.log(e);
        }
    }

    const updataFollowInfo = async(updateFollow) => {
        var newfollower = followers;
        try{
            if(updateFollow){
                newfollower += 1;
                await firestore()
                .collection('users')
                .doc(user.uid)
                .update({
                    likedStars: firestore.FieldValue.arrayUnion({id: starid, name: name, time: new Date(), official: 0, personal: 0}),
                });
            }else{
                newfollower -= 1;
                await firestore()
                .collection('users')
                .doc(user.uid)
                .update({
                    likedStars: firestore.FieldValue.arrayRemove({id: starid, name: name, time: followTime, official: officialPins, personal: personalPins})
                });
            }

            setFollowers(newfollower)
            await firestore()
            .collection('stars')
            .doc(starid)
            .update({
                followers: newfollower,
            });
            

            if(loading){
                setLoading(false);
            }
        } catch(e) {
          console.log(e);
        }
    }

    const updateSituation = async(updated) => {
        if(! updated){
            Alert.alert('Unfollow '+ name, 'All your memories with ' + name + ' will be reset', [
                {
                    text: 'Cancel',
                    onPress: () => {},
                    style: 'cancel',
                },
                {
                    text: 'OK', 
                    onPress: () => {
                        setFollow(updated);
                        updataFollowInfo(updated);
                    },
                },
            ]);
        }else{
            setFollow(updated);
            updataFollowInfo(updated);
        }
    }
    
    useEffect(() => {
        fetchFollowDetail();
    }, [])

    return (
        <SafeAreaView style={styles.safe}>
        {loading? (
            <View style={styles.load}>
                <ActivityIndicator size="large" />
            </View>
        ):(
            <ScrollView style={styles.safe}>
                <View style={styles.main}>
                    <View style={styles.container}>
                    <Image
                            style = {styles.starImg}
                            source = {{uri: Image.resolveAssetSource(DefaultProfileImage).uri}}
                        />
                        <Text style={styles.starname}>
                            {name}
                        </Text>
                        <View style={styles.rowContainer}>
                            <NumItemBox 
                                num = {pins}
                                itemName="官方紀錄點"
                            />
                            <NumItemBox 
                                num = {followers}
                                itemName="追蹤人數"
                            />
                        </View>
                        <GeneralButton
                            buttonTitle={follow? "Unfollow": "Follow"}
                            color={Colors.white}
                            backgroundColor={Colors.primaryColor}
                            aligned='center'
                            width='100%'
                            onPress={() => {
                                var updated = ! follow;
                                updateSituation(updated);
                            }}
                        />
                    </View>
                    <View style={styles.intro}>
                        <Text style={styles.title}>
                            介紹
                        </Text>
                        <Text style={styles.info}>
                            {info}
                        </Text>
                    </View>
                    <View style={styles.intro}>
                        <Text style={styles.title}>
                            近期活動
                        </Text>
                        <Text style={styles.info}>
                            待更新
                        </Text>
                    </View>
                </View>
            </ScrollView>
        )}
        </SafeAreaView>
    )
};

export default StarScreen;

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
    main:{
        marginTop: windowHeight/15,
        padding: 40,
    },
    container:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    starImg:{
        height: 150,
        width: 150,
        borderRadius: 75,
    },
    starname:{
        fontFamily: 'NotoSansTC-Regular',  
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
        color: Colors.black,
    },
    rowContainer:{
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    intro:{
        marginTop: 10, 
        marginBottom: 10, 
        justifyContent: 'center',
        alignItems: 'left',
    },
    title:{
        fontFamily: 'NotoSansTC-Regular', 
        fontSize: 18,
        fontWeight: 'bold', 
        color: Colors.black,
        marginBottom: 5,
    },
    info:{
        fontFamily: 'NotoSansTC-Regular', 
        fontSize: 16, 
        color: Colors.black,
    }
});