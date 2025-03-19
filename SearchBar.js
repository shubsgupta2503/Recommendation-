import React from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import styles from "../styles";

const SearchBar = ({ value, onChangeText, onSearch }) => {
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Search for groceries..."
        value={value}
        onChangeText={onChangeText}
      />
      <TouchableOpacity style={styles.button} onPress={onSearch}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;