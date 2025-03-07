import { Image, StyleSheet, Text, View } from "react-native";
import PrimaryButton from "../Components/PrimaryButton";
import Title from "../Components/Title";
import Colors from "../utils/colors";
function GameOverScreen({ roundsNumber, userNumber, onNewGame }) {
  return (
    <View style={styles.rootContainer}>
      <Title>GAME OVER!</Title>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../assets/images/success.png")}
        />
      </View>
      <Text style={styles.summaryText}>
        Your Phone Needed{" "}
        <Text style={styles.highlightText}>{roundsNumber} </Text>
        Rounds To Guess <Text style={styles.highlightText}>
          {userNumber}{" "}
        </Text>{" "}
        Number
      </Text>
      <PrimaryButton onPress={onNewGame}>Start New Game</PrimaryButton>
    </View>
  );
}
export default GameOverScreen;

const styles = StyleSheet.create({
  rootContainer: {
    marginTop: 50,
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  imageContainer: {
    height: 300,
    width: 300,
    overflow: "hidden",
    borderRadius: 150,
    alignItems: "center",
    marginVertical: 30,
    borderColor: Colors.primary600,
    borderWidth: 2,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  summaryText: {
    fontFamily: "open-sans",
    fontSize: 24,
    textAlign: "center",
    marginVertical: 20,
  },
  highlightText: {
    fontFamily: "open-sans-bold",
    color: Colors.primary600,
  },
});
