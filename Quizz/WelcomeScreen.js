import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView
} from 'react-native';

const WelcomeScreen = ({ route, navigation }) => {
  const { username } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Celebration Emoji */}
        <Text style={styles.celebrationEmoji}>🎉</Text>
        
        {/* Welcome Message */}
        <Text style={styles.welcomeTitle}>Welcome!</Text>
        <Text style={styles.usernameText}>{username} 🌸</Text>
        
        {/* Personalized Message */}
        <Text style={styles.message}>
          So glad to see you back!{'\n'}
          Hope you're having an amazing day! ✨
        </Text>

        {/* Back Button */}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back to Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7FF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  celebrationEmoji: {
    fontSize: 70,
    marginBottom: 20,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E90FF',
    marginBottom: 10,
    textAlign: 'center',
  },
  usernameText: {
    fontSize: 26,
    color: '#FF69B4', // Pink color for username
    fontWeight: '600',
    marginBottom: 30,
    textAlign: 'center',
  },
  message: {
    fontSize: 18,
    color: '#87CEEB',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 50,
  },
  backButton: {
    backgroundColor: '#1E90FF',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#87CEEB',
    shadowColor: '#1E90FF',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;