import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Alert,
  FlatList,
} from "react-native";
import NumberContainer from "../Components/game/NumberContainer";
import Title from "../Components/Title";
import PrimaryButton from "../Components/PrimaryButton";
import InstructionText from "../Components/game/InstructionText";
import Card from "../Components/UI/Card";
import { Ionicons } from "@expo/vector-icons";
import GuesslogItems from "../Components/game/GuesslogItems";

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else return rndNum;
}
let min = 1;
let max = 100;

function GameScreen({ userNumber, GameOver }) {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessedRounds, setGuessedRounds] = useState([initialGuess]);
  const { width, height } = useWindowDimensions();

  function reGuessNumber(destination) {
    if (
      (destination === "lower" && currentGuess < userNumber) ||
      (destination === "higher" && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }
    if (destination == "lower") {
      max = currentGuess;
    }
    if (destination == "higher") {
      min = currentGuess;
    }
    const reguessed = generateRandomBetween(min, max, currentGuess);
    setCurrentGuess(reguessed);
    setGuessedRounds((prevGuessRounds) => [reguessed, ...prevGuessRounds]);
  }

  useEffect(() => {
    if (currentGuess === userNumber) {
      GameOver(guessedRounds.length);
    }
  }, [currentGuess, GameOver, userNumber]);
  useEffect(() => {
    min = 1;
    max = 100;
  }, []);

  let content = (
    <>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>
          Higher or Lower
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={reGuessNumber.bind(this, "lower")}>
              <Ionicons name="remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={reGuessNumber.bind(this, "higher")}>
              <Ionicons name="add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </>
  );

  if (width > 500) {
    content = (
      <>
        <View style={styles.buttonsContainerWide}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={reGuessNumber.bind(this, "lower")}>
              <Ionicons name="remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <NumberContainer>{currentGuess}</NumberContainer>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={reGuessNumber.bind(this, "higher")}>
              <Ionicons name="add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </>
    );
  }
  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      {content}
      <FlatList
        style={{ width: "95%" }}
        data={guessedRounds}
        renderItem={(itemData) => (
          <GuesslogItems
            guess={itemData.item}
            roundsNumber={guessedRounds.length - itemData.index}
          />
        )}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    alignItems: "center",
  },
  instructionText: {
    marginBottom: 16,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  buttonsContainerWide: {
    flexDirection: "row",
    alignItems: "center",
  },
});
