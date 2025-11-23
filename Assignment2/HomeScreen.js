
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, FlatList, StyleSheet } from 'react-native';
import { auth, db } from '../fireconfig';
import { collection, addDoc, query, where, onSnapshot } from 'firebase/firestore';

export default function HomeScreen({ user }) {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "notes"), where("uid", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const myNotes = [];
      snapshot.forEach((doc) => {
        myNotes.push({ id: doc.id, ...doc.data() });
      });
      setNotes(myNotes);
    });
    return unsubscribe;
  }, [user]);

  const saveNote = async () => {
    if (note.trim() === '') {
      Alert.alert("Empty", "Please write something");
      return;
    }
    try {
      await addDoc(collection(db, "notes"), {
        text: note,
        uid: user.uid,
        createdAt: new Date()
      });
      setNote('');
      Alert.alert("Saved!", "Your note is saved in Firebase");
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome: {user.email}</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your note"
        value={note}
        onChangeText={setNote}
      />

      <Button title="Save to Firebase" onPress={saveNote} />

      <Text style={styles.saved}>Your Saved Notes:</Text>

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.noteBox}>
            <Text style={styles.noteText}>{item.text}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No notes yet</Text>}
      />

      <View style={{ marginTop: 30 }}>
        <Button title="Logout" onPress={() => auth.signOut()} color="#d32f2f" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  welcome: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, padding: 15, marginVertical: 15, borderRadius: 10, backgroundColor: 'white' },
  saved: { marginTop: 25, fontSize: 18, fontWeight: 'bold' },
  noteBox: { backgroundColor: 'white', padding: 15, marginVertical: 8, borderRadius: 10, elevation: 2 },
  noteText: { fontSize: 16 }
});