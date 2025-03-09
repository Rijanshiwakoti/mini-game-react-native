import { Text, View, StyleSheet } from "react-native";
import Colors from "../../utils/colors";

function GuesslogItems({ roundsNumber, guess }) {
  return (
    <View style={styles.itemList}>
      <Text style={styles.itemText}>#{roundsNumber}</Text>
      <Text style={styles.itemText}>Opponent's Guess : {guess}</Text>
    </View>
  );
}

export default GuesslogItems;

const styles = StyleSheet.create({
  itemList: {
    borderColor: Colors.primary700,
    borderWidth: 2,
    borderRadius: 40,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    backgroundColor: Colors.accent500,
  },
  itemText: {
    fontFamily: "open-sans",
  },
});
