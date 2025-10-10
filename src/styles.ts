import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartCircle: {
    zIndex: 1,
    margin: 0,
    borderRadius: '50%',
    pointerEvents: 'none',
  },
});
