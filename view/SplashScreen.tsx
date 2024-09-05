import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackparamlist } from '../Router';

type Props = NativeStackScreenProps<RootStackparamlist, 'MainScreen'>;

const SplashScreen: React.FC<Props> = ({ navigation, route }) => {

  useEffect(() => {
    const configureAudio = async () => {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          interruptionModeIOS: InterruptionModeIOS.MixWithOthers,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
          playThroughEarpieceAndroid: false,
          staysActiveInBackground: true,// This parametor is a factor of playing background
        });
        console.log('[SplashScreen] Finish Initializing gracefully');
      } catch (error) {
        console.log('[SplashScreen] Error setting audio mode:', error);
      }
    };

    configureAudio().then(() => {
      navigation.navigate('MainScreen')
    })

  }, [])

  return (
    <View style={styles.container}>
      <Text>Splash</Text>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})