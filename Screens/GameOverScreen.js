import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import PrimaryButton from "../Components/PrimaryButton";
import Title from "../Components/Title";
import Colors from "../utils/colors";
function GameOverScreen({ roundsNumber, userNumber, onNewGame }) {
  const { width, height } = useWindowDimensions();
  let imageSize = 300;
  if (width < 400) {
    imageSize = 150;
  }
  if (height < 400) {
    imageSize = 80;
  }
  const imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  };
  console.log(imageSize);

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.rootContainer}>
        <Title>GAME OVER!</Title>
        <View style={[styles.imageContainer, imageStyle]}>
          <Image
            style={styles.image}
            source={require("../assets/images/success.png")}
          />
        </View>
        <Text style={styles.summaryText}>
          Your Phone Needed{" "}
          <Text style={styles.highlightText}>{roundsNumber} </Text>
          Rounds To Guess Number
          <Text style={styles.highlightText}>{userNumber} </Text>{" "}
        </Text>
        <PrimaryButton onPress={onNewGame}>Start New Game</PrimaryButton>
      </View>
    </ScrollView>
  );
}
export default GameOverScreen;

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  rootContainer: {
    marginTop: 50,
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  imageContainer: {
    overflow: "hidden",
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
