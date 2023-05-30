import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const API_URL = "https://blog.mustafakole.dev/api"; // API adresinizi buraya girin

const PostScreen = ({ route }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const { postId } = route.params;

    fetch(`${API_URL}/posts.php?postId=${postId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setPost(data.data);
        } else {
          //console.error(data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });

    fetch(`${API_URL}/comments.php?postId=${postId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setComments(data.data);
        } else {
          //console.error(data.message);
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

      <Text style={styles.commentsTitle}>Yorumlar:</Text>
      {comments.length === 0 ? (
        <Text style={styles.noCommentsText}>
          Bu gönderi için henüz yorum atılmamış.
        </Text>
      ) : (
        comments.map((comment) => (
          <View key={comment.comment_id} style={styles.commentContainer}>
            <Text style={styles.commentAuthor}>{comment.author}</Text>
            <Text style={styles.commentContent}>{comment.content}</Text>
            <Text style={styles.commentDate}>{comment.created_at}</Text>
          </View>
        ))
      )}
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
    marginBottom: 16,
  },
  commentsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  noCommentsText: {
    fontStyle: "italic",
    marginBottom: 8,
  },
  commentContainer: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  commentAuthor: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  commentContent: {
    marginBottom: 4,
  },
  commentDate: {
    color: "gray",
  },
});

export default PostScreen;
