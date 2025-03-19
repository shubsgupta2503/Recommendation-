import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center", backgroundColor: "#f8f9fa" },
  title: { fontSize: 28, fontWeight: "bold", color: "#28a745", textAlign: "center", marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#ddd", padding: 10, marginBottom: 10, borderRadius: 5 },
  button: { backgroundColor: "#28a745", padding: 15, borderRadius: 5, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold" },
  linkText: { color: "#007bff", textAlign: "center", marginTop: 10 },
  resultCard: { padding: 15, backgroundColor: "#fff", marginTop: 10, borderRadius: 5, elevation: 3 },
  product: { fontWeight: "bold", fontSize: 16 },
  platform: { color: "#6c757d" },
  price: { color: "#28a745", fontWeight: "bold", fontSize: 18 },
  description: { color: "#6c757d", marginTop: 10 },
});

export default styles;