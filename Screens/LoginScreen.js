import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";

const API_URL = "https://blog.mustafakole.dev/api"; // API adresinizi buraya girin

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    fetch(`${API_URL}/login.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `username=${encodeURIComponent(
        username
      )}&password=${encodeURIComponent(password)}`,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          navigation.replace("Home");
        } else {
          Alert.alert("Hata", "Giriş başarısız");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleRegister = () => {
    navigation.navigate("Register");
  };

  const handleLoginAsGuest = () => {
    navigation.replace("Home");
  };

  return (
    <View style={[styles.container, { backgroundColor: "#DFEDEE" }]}>
      <Text style={styles.label}>Kullanıcı Adı:</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />

      <Text style={styles.label}>Şifre:</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button
        title="Giriş Yap"
        onPress={handleLogin}
        color="#a2a2a2"
        style={styles.button}
      />
      <Button
        title="Kayıt Ol"
        onPress={handleRegister}
        color="#a2a2a2"
        style={styles.button}
      />
      <Button
        title="Misafir Girişi"
        onPress={handleLoginAsGuest}
        color="#a2a2a2"
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "purple",
    borderWidth: 2,
    marginBottom: 18,
    paddingHorizontal: 8,
  },
  button: {
    marginBottom: 8,
    borderRadius: 8,
  },
});

export default LoginScreen;
