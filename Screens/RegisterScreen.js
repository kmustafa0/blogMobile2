import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";

const API_URL = "https://blog.mustafakole.dev/api"; // API adresinizi buraya girin

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    // Boş veri kontrolü
    if (!name || !lastname || !phone || !email || !username || !password) {
      Alert.alert("Hata", "Boş alan bırakılamaz");
      return;
    }

    // Kullanıcı kaydetme isteğini API'ye gönderme
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
          // Kayıt başarılı, kullanıcıyı giriş sayfasına yönlendirme
          Alert.alert("Başarılı", "Kayıt başarılı");
        } else {
          // Kayıt başarısız, hata mesajını gösterme
          Alert.alert("Hata", "Kayıt başarısız");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
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

      <Button title="Kayıt Ol" onPress={handleRegister} />
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
});

export default RegisterScreen;
