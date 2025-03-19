import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Alert } from "react-native";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard";
import styles from "../styles";

const HomeScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPrices = async () => {
    if (!search.trim()) {
      Alert.alert("Error", "Please enter a search term");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/search?query=${search}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      Alert.alert("Error", "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SmartCart</Text>
      <SearchBar value={search} onChangeText={setSearch} onSearch={fetchPrices} />
      {loading ? (
        <ActivityIndicator size="large" color="#28a745" />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <ProductCard item={item} onPress={() => navigation.navigate("ProductDetails", { product: item })} />
          )}
        />
      )}
    </View>
  );
};

export default HomeScreen;