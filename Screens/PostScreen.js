import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

const API_URL = "https://blog.mustafakole.dev/api"; // API adresinizi buraya girin

const PostScreen = ({ route }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const { postId } = route.params;

    const fetchPost = async () => {
      try {
        const response = await fetch(`${API_URL}/posts.php?postId=${postId}`);
        const data = await response.json();
        if (data.status === "success") {
          setPost(data.data);
        } else {
          //console.error(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await fetch(
          `${API_URL}/comments.php?postId=${postId}`
        );
        const data = await response.json();
        if (data.status === "success") {
          setComments(data.data);
        } else {
          //console.error(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchUserData = async () => {
      try {
        const response = await fetch(`${API_URL}/users.php`);
        const data = await response.json();
        if (data.status === "success") {
          const user = data.data;
          setUserId(user.userId);
          setEmail(user.email);
          setUsername(user.username);
        } else {
          //console.error(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPost();
    fetchComments();
    fetchUserData();
  }, []);

  const handleCommentSubmit = async () => {
    try {
      const { postId } = route.params;

      const response = await fetch(`${API_URL}/add_comments.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId,
          userId,
          email,
          comment: commentContent,
          username,
        }),
      });

      const data = await response.json();

      if (data.status === "success") {
        // Yorum başarıyla eklendi, yorumları yeniden getir
        fetchComments();
        setCommentContent(""); // Yorum gönderildikten sonra input alanını temizle
      } else {
        // Yorum eklenirken bir hata oluştu
        console.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

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

      <Text style={styles.addCommentTitle}>Yorum Ekle:</Text>
      <TextInput
        style={styles.commentInput}
        multiline
        placeholder="Yorumunuzu buraya yazın"
        value={commentContent}
        onChangeText={setCommentContent}
      />
      <Button title="Yorum Gönder" onPress={handleCommentSubmit} />
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
  addCommentTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 16,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
    minHeight: 100,
  },
});

export default PostScreen;
