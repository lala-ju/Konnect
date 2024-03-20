import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

import Onboarding from 'react-native-onboarding-swiper';
import { Colors } from '../utils/Colors';
import Onboarding1 from '../assets/images/star.png';
import Onboarding2 from '../assets/images/star.png';
import Onboarding3 from '../assets/images/star.png';

const Dots = ({selected}) => {
    let backgroundColor;

    backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';

    return (
        <View 
            style={{
                width:6,
                height: 6,
                marginHorizontal: 3,
                backgroundColor
            }}
        />
    );
}

const Skip = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Skip</Text>
    </TouchableOpacity>
);

const Next = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Next</Text>
    </TouchableOpacity>
);

const Done = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Done</Text>
    </TouchableOpacity>
);

const OnboardingScreen = ({navigation}) => {
    return (
        <SafeAreaView style={styles.safe}>
        <Onboarding
        SkipButtonComponent={Skip}
        NextButtonComponent={Next}
        DoneButtonComponent={Done}
        DotComponent={Dots}
        onSkip={() => navigation.replace("Login")}
        onDone={() => navigation.navigate("Login")}
        pages={[
          {
            backgroundColor: Colors.lightgrey,
            image: <Image source={Onboarding1} />,
            title: 'Connect to the World',
            subtitle: 'A New Way To Connect With The World',
          },
          {
            backgroundColor: Colors.green,
            image: <Image source={Onboarding2} />,
            title: 'Share Your Favorites',
            subtitle: 'Share Your Thoughts With Similar Kind of People',
          },
          {
            backgroundColor: Colors.lightgrey,
            image: <Image source={Onboarding3} />,
            title: 'Become The Star',
            subtitle: "Let The Spot Light Capture You",
          },
        ]}
      />
      </SafeAreaView>
    );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
    safe:{
        flex: 1,
      },
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
});