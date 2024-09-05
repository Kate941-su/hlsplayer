import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RootStackparamlist } from '../Router'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActivityIndicator, Appbar } from 'react-native-paper';
import { IconButton } from '../components';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Audio, AVPlaybackStatus } from 'expo-av';

type Props = NativeStackScreenProps<RootStackparamlist, 'PlayerScreen'>;

const PlayerScreen: React.FC<Props> = ({ navigation, route }) => {

  const [sound, setSound] = useState<Audio.Sound | undefined>(undefined);

  const { sumbnailURL, sourceURL, title, subtitle } = route.params

  const [isInitializing, setIsInitializing] = useState<boolean>(true);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const [playbackStatus, setPlaybackStatus] = useState<AVPlaybackStatus | undefined>()

  const demoURL = 'http://streams.radio.co/s0aa1e6f4a/listen'

  const initialize = async (sourceURL: string) => {
    console.log(`Initializing: ${sourceURL}`);
    try {
      const { sound } = await Audio.Sound.createAsync({ uri: sourceURL }, { shouldPlay: true })
      const status = await sound.playAsync();
      setPlaybackStatus(status)
      setSound(sound)
      setIsInitializing(false)
      setIsPlaying(true)
    } catch (err) {
      console.log(`error: ${err}`)
    }
  }

  const pauseSound = async () => {
    console.log('Pausing Sound');
    try {
      const status = await sound.pauseAsync();
      setSound(sound)
      setPlaybackStatus(status)
      setIsPlaying(false)
    } catch (err) {
      console.log(`error: ${err}`)
    }
  }

  const playSound = async () => {
    try {
      const status = await sound.playAsync();
      setPlaybackStatus(status)
      setIsPlaying(true)
      console.log('Play Sound');
    } catch (err) {
      console.log(`error: ${err}`)
    }
  }

  useEffect(() => {
    initialize(demoURL)
    return sound
      ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
      : undefined;
  }, [])


  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.Action icon="arrow-left" onPress={() => {
          navigation.navigate('MainScreen')
        }} />
        {/* <Appbar.Content title={route.params.title}></Appbar.Content> */}
      </Appbar.Header>
      <View style={styles.bodyContainer}>
        <View style={styles.imageContainer}>
          <View style={styles.imageBox}>
            <Image
              style={styles.image}
              source={{ uri: sumbnailURL }}
            />
          </View>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {title}
          </Text>
          <Text>
            {subtitle}
          </Text>
        </View>
        <View style={styles.panelContainer}>
          <IconButton
            onPress={() => { }}>
            <FontAwesome name={"star-o"} size={32} />
          </IconButton>
          <View style={{ padding: 32 }} ></View>
          {
            isInitializing ?
              <View>
                <ActivityIndicator />
              </View> :
              <IconButton
                onPress={async () => {
                  isPlaying ? await pauseSound() : await playSound()
                }}>
                <FontAwesome name={isPlaying ? "pause" : "play"} size={32} />
              </IconButton>
          }
          <View style={{ padding: 32 }} ></View>
          <IconButton
            onPress={() => { }}>
            <FontAwesome name={"share-alt"} size={32} />
          </IconButton>
        </View>
      </View>
    </View>
  )
}

export default PlayerScreen

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#00ffff',
    flex: 1
  },
  appbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
  },
  bodyContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBox: {
    borderRadius: 16,
    width: 300,
    height: 300,
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  titleContainer: {
    flex: 0,
    textAlign: 'left',
    height: '10%'
  },
  title: {
    fontSize: 24
  },
  panelContainer: {
    paddingTop: 24,
    height: '25%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
})