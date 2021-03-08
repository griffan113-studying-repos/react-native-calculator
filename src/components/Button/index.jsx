import React from "react";
import { Text, TouchableHighlight, TouchableOpacity } from "react-native";
import { buttonStyles } from "./styles";

const Button = ({ label, onClick, double, triple, operation }) => {
  const stylesButton = [buttonStyles.button];

  if (double) stylesButton.push(buttonStyles.buttonDouble);
  if (triple) stylesButton.push(buttonStyles.buttonTriple);
  if (operation) stylesButton.push(buttonStyles.operationButton);

  return (
    <TouchableOpacity onPress={() => onClick(label)}>
      <Text style={stylesButton}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Button;
