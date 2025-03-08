import { StyleSheet, View, ImageBackground } from "react-native";
import { useFonts } from "expo-font";
import { SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import StartGameScreen from "./Screens/StartGameScreen";
import GameScreen from "./Screens/GameScreen";
import { useState } from "react";
import GameOverScreen from "./Screens/GameOverScreen";
import AppLoading from "expo-app-loading";
export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [isGameOver, setIsGameOver] = useState(false);
  const [guessedRounds, setGuessedRounds] = useState(0);

  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
  if (!fontsLoaded) {
    <AppLoading />;
  }

  function startNewGame() {
    setIsGameOver(false);
    setUserNumber(null);
    setGuessedRounds(0);
  }

  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
  }
  function GameOver(roundsNumber) {
    setIsGameOver(true);
    setGuessedRounds(roundsNumber);
  }
  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} GameOver={GameOver} />;
  }
  if (isGameOver) {
    screen = (
      <GameOverScreen
        userNumber={userNumber}
        roundsNumber={guessedRounds}
        onNewGame={startNewGame}
      />
    );
  }
  return (
    <LinearGradient colors={["#4e0329", "#ddb52f"]} style={styles.container}>
      <ImageBackground
        source={require("./assets/images/background.png")}
        style={styles.container}
        resizeMode="cover"
        imageStyle={styles.imageContainer}
      >
        <SafeAreaView style={styles.container}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    opacity: 0.15,
  },
});
