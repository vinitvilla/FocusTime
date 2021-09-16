import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { fontSizes } from '../utils/sizes';
import { colors } from '../utils/colors';
import { spacing } from '../utils/sizes';

const minutesToMillis = (min) => min * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({ minutes = 0.1, isPaused, onProgress, onEnd }) => {
  const interval = React.useRef(null);
  const countDown = () => {
    setMillies((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        return time;
      }
      const timeLeft = time - 1000;
      return timeLeft;
    });
  };

  useEffect(() => {
    setMillies(minutesToMillis(minutes));
  }, [minutes]);

  useEffect(() => {
    onProgress(millis / minutesToMillis(minutes));
    if (millis == 0) {
      onEnd();
    }
  }, [millis]);

  useEffect(() => {
    if (isPaused) {
      clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(countDown, 1000);
    return () => clearInterval(interval.current);
  }, [isPaused]);

  const [millis, setMillies] = useState(minutesToMillis(minutes));

  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;

  return (
    <Text style={styles.text}>
      {formatTime(minute)} : {formatTime(seconds)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xl,
    fontWeight: 'bold',
    color: colors.white,
    padding: spacing.lg,
    backgroundColor: 'rgba(94, 132, 226, 0.3)',
  },
});
