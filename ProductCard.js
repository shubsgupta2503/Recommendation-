import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../styles";

const ProductCard = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.resultCard} onPress={onPress}>
      <Text style={styles.product}>{item.name}</Text>
      <Text style={styles.platform}>{item.platform}</Text>
      <Text style={styles.price}>{item.price}</Text>
    </TouchableOpacity>
  );
};

export default ProductCard;