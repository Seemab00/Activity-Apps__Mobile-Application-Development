import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { GlobalStyles } from '../styles/GlobalStyles';

const { width, height } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: GlobalStyles.primaryColor }}>
      {/* Upper Image Section */}
      <View style={{ height: height * 0.6 }}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=1089&q=80',
          }}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        />
      </View>
      
      {/* Curved Container */}
      <View
        style={{
          flex: 1,
          backgroundColor: '#FFFFFF',
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          marginTop: -40,
          paddingHorizontal: 32,
          paddingTop: 40,
        }}
      >
        <Text style={GlobalStyles.titleText}>Bakery App</Text>
        
        <Text
          style={{
            fontSize: 16,
            color: GlobalStyles.lightText,
            textAlign: 'center',
            fontStyle: 'italic',
            marginTop: 20,
            lineHeight: 22,
          }}
        >
          "Life is sweet, make it sweeter with our delicious treats!"
        </Text>
        
        <TouchableOpacity
          style={[GlobalStyles.primaryButton, { marginTop: 40 }]}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={GlobalStyles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WelcomeScreen;