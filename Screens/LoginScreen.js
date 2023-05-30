import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";

const API_URL = "https://blog.mustafakole.dev/api";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const enteredUsername = username;
    const loggedIn = true;

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
          navigation.replace("Home", { username: enteredUsername, loggedIn }); // Kullanıcı adı ve loggedIn değerini parametre olarak iletiyoruz
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
    navigation.replace("Home", { username: "", loggedIn: false });
  };

  return (
    <View style={[styles.container, { backgroundColor: "#ddffee" }]}>
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

      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button
            title="Giriş Yap"
            onPress={handleLogin}
            style={styles.button}
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button
            title="Kayıt Ol"
            onPress={handleRegister}
            style={styles.button}
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button
            title="Misafir Girişi"
            onPress={handleLoginAsGuest}
            style={styles.button}
          />
        </View>
      </View>
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
    borderColor: "blue",
    borderWidth: 1,
    marginBottom: 18,
    paddingHorizontal: 8,
  },
  button: {
    marginBottom: 8,
    borderRadius: 8,
  },
  buttonContainer: {
    marginBottom: 8,
    width: "50%",
    marginStart: "25%",
    borderWidth: 1,
    borderColor: "white",
  },
  buttonWrapper: {
    width: "100%",
  },
});

export default LoginScreen;
