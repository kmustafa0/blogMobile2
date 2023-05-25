import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const API_URL = "https://blog.mustafakole.dev/api"; // API adresinizi buraya girin

const PostScreen = ({ route }) => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    const { postId } = route.params;

    fetch(`${API_URL}/posts.php?postId=${postId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setPost(data.data);
        } else {
          console.error(data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!post) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post.post_title}</Text>
      <View style={styles.separator} />
      <Text style={styles.content}>{post.post_content}</Text>
      <Text style={styles.date}>{post.created_at}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  title: {
    fontSize: 18,
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

export default PostScreen;
