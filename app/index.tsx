import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import TrackPlayer from "react-native-track-player";
import { playbackService, setupPlayer, addTrack } from "../musicPlayerServices";
import type { PropsWithChildren } from "react";
import MusicPlayer from "@/screens/MusicPlayer";

TrackPlayer.registerPlaybackService(() => playbackService);

export default function index() {
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  async function setup() {
    let isSetup = await setupPlayer();
    if (isSetup) {
      await addTrack();
    }
    setIsPlayerReady(isSetup);
  }
  useEffect(() => {
    setup();
  }, []);
  if (!isPlayerReady) {
    return (
      <SafeAreaView>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }
  return (
    <View style={styles.container}>
        <StatusBar barStyle={"light-content"} />
        <MusicPlayer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
