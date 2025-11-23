
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { auth } from '../fireconfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => Alert.alert("Success", "Account Created!"))
      .catch((error) => Alert.alert("Error", error.message));
  };

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .catch((error) => Alert.alert("Login Failed", error.message));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Firebase Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Register" onPress={register} />
      <View style={{ height: 15 }} />
      <Button title="Login" onPress={login} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, justifyContent: 'center' },
  title: { fontSize: 32, textAlign: 'center', marginBottom: 50, fontWeight: 'bold' },
  input: { borderWidth: 1, padding: 15, marginBottom: 15, borderRadius: 10, fontSize: 16 }
});