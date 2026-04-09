import { View, Text, StyleSheet } from "react-native";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sauvia</Text>
      <Text style={styles.subtitle}>CRM para Nutricionistas</Text>
      {/* Auth form will be implemented here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e4fff9",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#006b2c",
  },
  subtitle: {
    fontSize: 16,
    color: "#3f6b62",
    marginTop: 8,
  },
});
