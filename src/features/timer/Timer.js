import React, { useState } from 'react';
import { View, Text, StyleSheet, Vibration, Platform } from 'react-native';
import { ProgressBar } from 'react-native-paper';

import { useKeepAwake } from 'expo-keep-awake';

import { colors } from '../../utils/colors';
import { spacing } from '../../utils/sizes';
import { Countdown } from '../../components/Countdown';
import { RoundedButton } from '../../components/RoundedButton';

import { Timing } from './Timing';

const DEFAULT_TIME = 0.05;

export const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
  useKeepAwake();

  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  const onProgress = (progress) => {
    setProgress(progress);
  };

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 10000);
    } else {
      Vibration.vibrate('10s');
    }
  };

  const onEnd = () => {
    vibrate();
    changeTime(DEFAULT_TIME);
    onTimerEnd();
  };

  const changeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={onProgress}
          onEnd={onEnd}
        />
      </View>
      <View style={{ paddingTop: spacing.xxl }}>
        <Text style={styles.title}>Focussing on:</Text>
        <Text style={styles.task}>{focusSubject} </Text>
      </View>
      <View style={{ paddingTop: spacing.sm }}>
        <ProgressBar
          progress={progress}
          color="#4267B2"
          style={{ height: 10 }}
        />
      </View>
      <View style={styles.buttonwrapper}>
        <Timing onChangeTime={changeTime} />
      </View>
      <View style={styles.buttonwrapper}>
        <RoundedButton
          title={isStarted ? 'Pause' : 'Start'}
          onPress={() => setIsStarted(!isStarted)}
        />
      </View>
      <View style={styles.clearsubject}>
        <RoundedButton
          title="-"
          size={50}
          onPress={() => clearSubject()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: colors.white,
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  countdown: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonwrapper: {
    flex: 0.2,
    padding: spacing.md,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearsubject: {
    paddingBottom: 25,
    paddingLeft: 25
  }
});
