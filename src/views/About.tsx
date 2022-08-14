import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

function About() {
  return (
    <View style={StyleSheet.absoluteFill}>
      <Text style={styles.about}>
        Для создания приложения были использованы: TypeScript, MobX
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  about: {
    marginTop: 40,
    textAlign: 'center',
  },
});

export default About;
