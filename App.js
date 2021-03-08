import React, { Component } from "react";
import { StyleSheet, View, Platform, Dimensions } from "react-native";

import Button from "./src/components/Button";
import Display from "./src/components/Display";

const initialState = {
  displayValue: "0",
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
};

export default class App extends Component {
  state = { ...initialState };

  addDigit(digit) {
    //Não deixa o usuário digitar dois pontos
    if (digit === "." && this.state.displayValue.includes(".")) return;
    else {
      //Limpa o display se o dígito atual for 0 ou se a variável estiver setada
      const clearDisplay =
        this.state.displayValue === "0" || this.state.clearDisplay;

      //O atua valor é igual ao valor que está no display
      const currentValue = clearDisplay ? "" : this.state.displayValue;

      const displayValue = currentValue + digit;
      this.setState({ displayValue, clearDisplay: false });

      if (digit !== ".") {
        const newValue = parseFloat(displayValue);
        const values = [this.state.values];
        values[this.state.current] = newValue;
        this.setState({ values });
      }
    }
  }

  clearMemory() {
    this.setState({ ...initialState });
  }

  setOperation(operation) {
    if (this.state.current === 0) {
      this.setState({ operation, current: 1, clearDisplay: true });
    } else {
      const equals = operation === "=";
      const values = [...this.state.values];
      //Eval = Avalia a expressão e executa como um código JavaScript
      try {
        values[0] = eval(`${values[0]} ${this.state.operation} ${values[1]}`);
      } catch (e) {
        values[0] = this.state.values[0];
      }

      values[1] = 0;
      this.setState({
        displayValue: values[0],
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: true,
        values,
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Display value={this.state.displayValue} />
        <View style={styles.buttons}>
          <Button label="AC" triple onClick={this.clearMemory.bind(this)} />
          <Button label="/" operation onClick={this.setOperation.bind(this)} />
          <Button label="7" onClick={this.addDigit.bind(this)} />
          <Button label="8" onClick={this.addDigit.bind(this)} />
          <Button label="9" onClick={this.addDigit.bind(this)} />
          <Button label="*" operation onClick={this.setOperation.bind(this)} />
          <Button label="4" onClick={this.addDigit.bind(this)} />
          <Button label="5" onClick={this.addDigit.bind(this)} />
          <Button label="6" onClick={this.addDigit.bind(this)} />
          <Button label="-" operation onClick={this.setOperation.bind(this)} />
          <Button label="1" onClick={this.addDigit.bind(this)} />
          <Button label="2" onClick={this.addDigit.bind(this)} />
          <Button label="3" onClick={this.addDigit.bind(this)} />
          <Button label="+" operation onClick={this.setOperation.bind(this)} />
          <Button label="0" double onClick={this.addDigit.bind(this)} />
          <Button label="." onClick={this.addDigit.bind(this)} />
          <Button label="=" operation onClick={this.setOperation.bind(this)} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  droidSafeArea: {
    paddingTop:
      Platform.OS === "android" ? Dimensions.get("window").height * 0.06 : 0,
  },

  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
