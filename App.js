import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import styles from './style/style';
import Header from './components/Header';
import Gameboard from './components/Gameboard';
import Footer from './components/Footer';
import { useFonts } from 'expo-font';

export default function App() {
  const [loaded] = useFonts({
    SilkscreenBold: require('./assets/fonts/Silkscreen-Bold.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Header />
      <Gameboard />
      <Footer />
    </View>
  );
}
