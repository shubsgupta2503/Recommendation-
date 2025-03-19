import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import styles from "../styles";

const ProductDetailsScreen = ({ route }) => {
  const { product } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.platform}>{product.platform}</Text>
      <Text style={styles.price}>{product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <TouchableOpacity style={styles.button} onPress={() => Alert.alert("Added to Wishlist")}>
        <Text style={styles.buttonText}>Add to Wishlist</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductDetailsScreen;