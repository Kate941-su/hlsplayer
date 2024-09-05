import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RootStackparamlist } from '../Router'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActivityIndicator, Appbar } from 'react-native-paper';
import { IconButton } from '../components';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Audio } from 'expo-av';

type Props = NativeStackScreenProps<RootStackparamlist, 'PlayerScreen'>;

const PlayerScreen: React.FC<Props> = ({ navigation, route }) => {

  const [sound, setSound] = useState<Audio.Sound | undefined>(undefined);

  const { sumbnailURL, sourceURL, title, subtitle } = route.params

  const [isInitializing, setIsInitializing] = useState<boolean>(true);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const initialize = async (sourceURL: string) => {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync({ uri: sourceURL });
    setSound(sound);
  }

  const pauseSound = async () => {
    console.log('Pausing Sound');
    await sound.pauseAsync();
    setIsPlaying(false)
  }

  const playSound = async () => {
    console.log(`Loading Sound: ${sourceURL}`);
    const { sound } = await Audio.Sound.createAsync({ uri: sourceURL })
    Audio.Sound.createAsync({ uri: sourceURL }).catch((error) => {
      `${error}`
    });
    console.log(`${sound}`)
    setSound(sound);
    console.log('Playing Sound');
    await sound.playAsync();
    setIsPlaying(true)
  }

  useEffect(() => {
    return sound
      ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
      : undefined;
  }, [sound])


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
              source={{
                uri: sumbnailURL
              }
              }
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
            isInitializing ? <IconButton
              onPress={async () => {
                isPlaying ? await pauseSound() : await playSound()
              }}>
              <FontAwesome name={isPlaying ? "play" : "pause"} size={32} />
            </IconButton> :
              <View>
                <ActivityIndicator />
              </View>
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