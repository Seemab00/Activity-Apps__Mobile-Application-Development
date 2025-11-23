import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [fetchKey, setFetchKey] = useState('');
  const [fetchedValue, setFetchedValue] = useState('');
  const [removeKey, setRemoveKey] = useState('');
  const [message, setMessage] = useState('');

  // 1. Store Data Functionality
  const storeData = async () => {
    try {
      if (!key.trim()) {
        setMessage('Please enter a key');
        return;
      }
      await AsyncStorage.setItem(key, value);
      setMessage(`✅ Data stored successfully! Key: "${key}"`);
      setKey('');
      setValue('');
    } catch (error) {
      setMessage('❌ Error storing data: ' + error.message);
    }
  };

  // 2. Fetch Data Functionality
  const fetchData = async () => {
    try {
      if (!fetchKey.trim()) {
        setMessage('Please enter a key to fetch');
        return;
      }
      const data = await AsyncStorage.getItem(fetchKey);
      if (data !== null) {
        setFetchedValue(data);
        setMessage(`✅ Data fetched successfully!`);
      } else {
        setFetchedValue('');
        setMessage('❌ No data found for this key');
      }
    } catch (error) {
      setMessage('❌ Error fetching data: ' + error.message);
    }
  };

  // 3. Remove Data Functionality
  const removeData = async () => {
    try {
      if (!removeKey.trim()) {
        setMessage('Please enter a key to remove');
        return;
      }
      await AsyncStorage.removeItem(removeKey);
      setMessage(`✅ Data removed successfully! Key: "${removeKey}"`);
      setRemoveKey('');
      
      // Clear fetched value if we removed the same key
      if (removeKey === fetchKey) {
        setFetchedValue('');
      }
    } catch (error) {
      setMessage('❌ Error removing data: ' + error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>AsyncStorage Demo</Text>
      
      {/* Store Data Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Store Data</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter key (e.g., userToken, theme, language)"
          value={key}
          onChangeText={setKey}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter value"
          value={value}
          onChangeText={setValue}
        />
        <Button title="Store Data" onPress={storeData} />
      </View>

      {/* Fetch Data Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Fetch Data</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter key to fetch"
          value={fetchKey}
          onChangeText={setFetchKey}
        />
        <Button title="Fetch Data" onPress={fetchData} />
        {fetchedValue ? (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>Fetched Value:</Text>
            <Text style={styles.fetchedValue}>{fetchedValue}</Text>
          </View>
        ) : null}
      </View>

      {/* Remove Data Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Remove Data</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter key to remove"
          value={removeKey}
          onChangeText={setRemoveKey}
        />
        <Button title="Remove Data" onPress={removeData} color="#ff4444" />
      </View>

      {/* Message Display */}
      {message ? (
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>{message}</Text>
        </View>
      ) : null}

      {/* Test Keys Suggestion */}
      <View style={styles.suggestionSection}>
        <Text style={styles.suggestionTitle}>Test with these keys:</Text>
        <Text style={styles.suggestion}>• userToken</Text>
        <Text style={styles.suggestion}>• theme</Text>
        <Text style={styles.suggestion}>• language</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  section: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#444',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  resultContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#e8f5e8',
    borderRadius: 5,
  },
  resultText: {
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  fetchedValue: {
    marginTop: 5,
    fontSize: 16,
    color: '#1b5e20',
  },
  messageContainer: {
    padding: 15,
    backgroundColor: '#e3f2fd',
    borderRadius: 5,
    marginBottom: 15,
  },
  messageText: {
    fontSize: 14,
    color: '#1565c0',
    textAlign: 'center',
  },
  suggestionSection: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  suggestionTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#666',
  },
  suggestion: {
    color: '#666',
    marginLeft: 10,
  },
});