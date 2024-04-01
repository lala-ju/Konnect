import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { windowHeight, windowWidth } from '../utils/Dimension';

const GeneralButton = ({
  buttonTitle,
  color,
  backgroundColor,
  aligned,
  width,
  ...rest
}) => {
  let bgColor = backgroundColor;
  let percent = width;
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, { backgroundColor: bgColor , width: percent}]}
      {...rest}>
      <View style={[styles.btnTxtWrapper, { alignItems: aligned }]}>
        <Text style={[styles.buttonText, { color: color }]}>{buttonTitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default GeneralButton;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    height: windowHeight / 15,
    padding: 10,
    flexDirection: 'row',
    borderRadius: 10,
  },
  btnTxtWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});