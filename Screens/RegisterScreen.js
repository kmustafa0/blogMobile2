import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";

const API_URL = "https://blog.mustafakole.dev/api"; // API adresinizi buraya girin

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    if (!name || !lastname || !phone || !email || !username || !password) {
      Alert.alert("Hata", "Boş alan bırakılamaz");
      return;
    }

    fetch(`${API_URL}/register.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `name=${encodeURIComponent(name)}&lastname=${encodeURIComponent(
        lastname
      )}&phone=${encodeURIComponent(phone)}&email=${encodeURIComponent(
        email
      )}&username=${encodeURIComponent(username)}&password=${encodeURIComponent(
        password
      )}`,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          Alert.alert("Başarılı", "Kayıt başarılı");
          navigation.navigate("Login");
        } else {
          Alert.alert("Hata", "Kayıt başarısız");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={[styles.container, { backgroundColor: "#DFEDEE" }]}>
      <Text style={styles.label}>Ad:</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Soyad:</Text>
      <TextInput
        style={styles.input}
        value={lastname}
        onChangeText={setLastname}
      />

      <Text style={styles.label}>Telefon:</Text>
      <TextInput style={styles.input} value={phone} onChangeText={setPhone} />

      <Text style={styles.label}>E-posta:</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />

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
        title="Kayıt Ol"
        onPress={handleRegister}
        color="#a2a2a2"
        style={styles.button}
      />
      <Button
        title="Giriş Yap"
        onPress={() => navigation.navigate("Login")}
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
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  button: {
    marginBottom: 8,
    borderRadius: 8,
  },
});

export default RegisterScreen;
