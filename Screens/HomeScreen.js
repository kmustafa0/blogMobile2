import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";

const API_URL = "https://blog.mustafakole.dev/api";

const HomeScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);
  const { username, loggedIn } = route.params;
  console.log(route.params);

  const welcomeMessage = loggedIn ? `${username}` : "Misafir";
  useEffect(() => {
    fetch(`${API_URL}/posts.php`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setPosts(data.data);
        } else {
          console.error(data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handlePostPress = (postId) => {
    navigation.navigate("Post", { postId });
  };

  const handleExit = () => {
    navigation.navigate("Login");
  };
  const renderPost = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.postContainer}
        onPress={() => handlePostPress(item.post_id)}
      >
        <View>
          <Text style={styles.title}>{item.post_title}</Text>
          <View style={styles.separator} />
          <Text style={styles.content}>
            {item.post_content.substring(0, 100)}...
          </Text>
          <Text style={styles.date}>{item.created_at}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button
            title="Çıkış yap"
            onPress={handleExit}
            style={styles.button}
          />
        </View>
      </View>
      <Text> {welcomeMessage} </Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.post_id.toString()}
        renderItem={renderPost}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  postContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    marginBottom: 8,
  },
  content: {
    marginBottom: 8,
  },
  date: {
    color: "gray",
  },
});

export default HomeScreen;
