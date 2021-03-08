import React from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";

const Display = ({ value }) => {
  return (
    <View style={styles.display} numberOfLines={1}>
      <Text style={styles.displayValue}>{value}</Text>
    </View>
  );
};

export default Display;
