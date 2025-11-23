import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles } from '../styles/styles';
import { Ionicons } from '@expo/vector-icons';
import { useAppContext } from '../context/AppContext';

const WelcomeScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [storedName, setStoredName] = useState('');
  const { setUsername: setContextUsername, setLoading } = useAppContext();

  // useEffect with empty dependency array - runs only once
  useEffect(() => {
    loadStoredUsername();
  }, []);

  // useEffect with dependency - runs when storedName changes
  useEffect(() => {
    if (storedName) {
      Alert.alert('Welcome back!', `Hello ${storedName}! Ready for some fresh juice? 🍹`);
    }
  }, [storedName]);

  const loadStoredUsername = async () => {
    try {
      const name = await AsyncStorage.getItem('username');
      if (name) {
        setStoredName(name);
        setUsername(name);
        setContextUsername(name);
      }
    } catch (error) {
      console.log('Error loading username:', error);
    }
  };

  const saveUsername = async () => {
    if (username.trim()) {
      try {
        await AsyncStorage.setItem('username', username);
        Alert.alert('Success!', 'Name saved successfully! 🎉');
        setStoredName(username);
        setContextUsername(username);
        Keyboard.dismiss();
      } catch (error) {
        Alert.alert('Error', 'Failed to save name');
      }
    } else {
      Alert.alert('Oops!', 'Please enter your name first!');
    }
  };

  const removeUsername = async () => {
    try {
      await AsyncStorage.removeItem('username');
      setUsername('');
      setStoredName('');
      setContextUsername('');
      Alert.alert('Success!', 'Name removed! 👋');
    } catch (error) {
      Alert.alert('Error', 'Failed to remove name');
    }
  };

  const navigateToHome = () => {
    if (!username.trim()) {
      Alert.alert('Wait!', 'Please enter your name before continuing!');
      return;
    }
    
    // Show loading and navigate
    setLoading(true);
    
    // Simulate loading time
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Home');
    }, 1500);
  };

  return (
    <ScrollView style={globalStyles.container} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
      {/* Welcome Header with Icon */}
      <View style={{ alignItems: 'center', marginBottom: 40 }}>
        <Ionicons name="cafe" size={60} color="#27ae60" style={{ marginBottom: 20 }} />
        <Text style={[globalStyles.title, { marginBottom: 10 }]}>Welcome to JuicyJoyride! 🍹</Text>
        <Text style={{ color: '#7f8c8d', textAlign: 'center', fontSize: 16 }}>
          Fresh juices made with love and natural ingredients
        </Text>
      </View>
      
      {/* Name Input Section */}
      <View style={{ marginBottom: 30 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <Ionicons name="person-circle" size={20} color="#3498db" style={{ marginRight: 8 }} />
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#2c3e50' }}>Your Name *</Text>
        </View>
        
        <TextInput
          style={globalStyles.input}
          placeholder="Enter your name to continue..."
          value={username}
          onChangeText={setUsername}
          placeholderTextColor="#bdc3c7"
          returnKeyType="done"
          onSubmitEditing={saveUsername}
        />
        
        {!username.trim() && (
          <Text style={{ color: '#e74c3c', fontSize: 12, marginTop: 5, marginLeft: 5 }}>
            * Name is required to continue
          </Text>
        )}
      </View>
      
      {/* Action Buttons */}
      <TouchableOpacity 
        style={[globalStyles.button, { backgroundColor: '#27ae60' }]} 
        onPress={saveUsername}
      >
        <Ionicons name="save" size={20} color="white" style={{ marginRight: 10 }} />
        <Text style={globalStyles.buttonText}>Save My Name</Text>
      </TouchableOpacity>

      {storedName ? (
        <TouchableOpacity 
          style={[globalStyles.button, { backgroundColor: '#e74c3c' }]} 
          onPress={removeUsername}
        >
          <Ionicons name="trash" size={20} color="white" style={{ marginRight: 10 }} />
          <Text style={globalStyles.buttonText}>Remove Name</Text>
        </TouchableOpacity>
      ) : null}

      <TouchableOpacity 
        style={[
          globalStyles.button, 
          { 
            backgroundColor: username.trim() ? '#3498db' : '#bdc3c7',
            opacity: username.trim() ? 1 : 0.6
          }
        ]} 
        onPress={navigateToHome}
        disabled={!username.trim()}
      >
        <Ionicons name="arrow-forward" size={20} color="white" style={{ marginRight: 10 }} />
        <Text style={globalStyles.buttonText}>
          {username.trim() ? 'Start Juicing! 🍋' : 'Enter Name to Continue'}
        </Text>
      </TouchableOpacity>

      {/* Welcome Message */}
      {storedName ? (
        <View style={{ alignItems: 'center', marginTop: 30, padding: 20, backgroundColor: '#ecf0f1', borderRadius: 15 }}>
          <Ionicons name="heart" size={24} color="#e74c3c" style={{ marginBottom: 10 }} />
          <Text style={{ fontSize: 18, fontWeight: '600', color: '#2c3e50', textAlign: 'center' }}>
            Hello, {storedName}! 👋
          </Text>
          <Text style={{ color: '#7f8c8d', textAlign: 'center', marginTop: 5 }}>
            Ready to explore our fresh juice collection?
          </Text>
        </View>
      ) : null}
    </ScrollView>
  );
};

export default WelcomeScreen;