import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView, Animated, ActivityIndicator } from 'react-native';
import { useAppContext } from '../context/AppContext';
import { globalStyles } from '../styles/styles';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';
import { Alert } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const { addToCart, clearCart, cart, cartCount, userPreferences, isLoading, setLoading } = useAppContext();
  const [fadeAnim] = useState(new Animated.Value(0));
  const [itemsLoaded, setItemsLoaded] = useState(false);

  // Simulate loading items when screen first appears
  useEffect(() => {
    if (!itemsLoaded) {
      setLoading(true);
      const timer = setTimeout(() => {
        setItemsLoaded(true);
        setLoading(false);
        // Animate the cart banner
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [itemsLoaded]);

  // Enhanced juice data with images and descriptions
  const juiceData = {
    greenJuices: [
      { 
        id: '1', 
        name: 'Green Energy', 
        price: '$5.99', 
        color: '#2ecc71',
        image: 'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2020/08/Green-Juice-main.jpg',
        description: 'Spinach, Apple, Lemon',
        icon: 'leaf'
      },
      { 
        id: '2', 
        name: 'Spinach Power', 
        price: '$6.49', 
        color: '#27ae60',
        image: 'https://yummyindiankitchen.com/wp-content/uploads/2024/05/spinach-juice-recipe-fresh-and-homemade.jpg',
        description: 'Spinach, Pineapple, Mint',
        icon: 'fitness'
      },
      { 
        id: '3', 
        name: 'Kale Blast', 
        price: '$5.79', 
        color: '#229954',
        image: 'https://sarabackmo.com/wp-content/uploads//2019/06/mg_8978_lo-750x1000.jpg',
        description: 'Kale, Green Apple, Lime',
        icon: 'flash'
      },
      { 
        id: '4', 
        name: 'Avocado Dream', 
        price: '$7.99', 
        color: '#16a085',
        image: 'https://shawsimpleswaps.com/wp-content/uploads/2020/03/Green-Smoothie-For-Kids-10.jpg',
        description: 'Avocado, Spinach, Honey',
        icon: 'heart'
      },
      { 
        id: '5', 
        name: 'Cucumber Cool', 
        price: '$4.99', 
        color: '#1abc9c',
        image: 'https://img.freepik.com/premium-photo/glass-cucumber-juice-wooden-table-green-background_392895-468306.jpg?semt=ais_hybrid&w=740&q=80',
        description: 'Cucumber, Mint, Lime',
        icon: 'snow'
      },
    ],
    detoxJuices: [
      { 
        id: '6', 
        name: 'Lemon Cleanse', 
        price: '$5.49', 
        color: '#f39c12',
        image: 'https://www.thecookierookie.com/wp-content/uploads/2017/01/detox-lemonade-5-of-11.jpg',
        description: 'Lemon, Ginger, Cayenne',
        icon: 'sunny'
      },
      { 
        id: '7', 
        name: 'Ginger Detox', 
        price: '$6.99', 
        color: '#d35400',
        image: 'https://www.shutterstock.com/image-photo/power-drink-citrus-juice-ginger-260nw-1710246832.jpg',
        description: 'Ginger, Turmeric, Orange',
        icon: 'flame'
      },
      { 
        id: '8', 
        name: 'Beet Boost', 
        price: '$6.29', 
        color: '#e74c3c',
        image: 'https://continentalhospitals.com/images/blogs/54dfccc9dffcbf096e44b29faa18d1fa.jpg',
        description: 'Beetroot, Carrot, Apple',
        icon: 'barbell'
      },
      { 
        id: '9', 
        name: 'Carrot Glow', 
        price: '$5.89', 
        color: '#e67e22',
        image: 'https://cdn.prod.website-files.com/63ed08484c069d0492f5b0bc/6541535ff1e82cea0dbe2cb4_woman-holding-glass-of-carrot-orange-and-ginger-juice.jpeg',
        description: 'Carrot, Orange, Turmeric',
        icon: 'sparkles'
      },
      { 
        id: '10', 
        name: 'Turmeric Gold', 
        price: '$7.49', 
        color: '#f1c40f',
        image: 'https://tribest.com/cdn/shop/articles/Turmeric-Juice.jpg?v=1629157097',
        description: 'Turmeric, Pineapple, Coconut',
        icon: 'star'
      },
    ]
  };

  const handleAddToCart = (item) => {
    addToCart(item);
    // Show animation when adding to cart
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0.8,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleClearCart = () => {
    clearCart();
    Alert.alert('Cart Cleared!', 'All items have been removed from your cart.');
  };

  const renderJuiceItem = ({ item }) => (
    <TouchableOpacity 
      style={globalStyles.juiceCard}
      onPress={() => handleAddToCart(item)}
    >
      <View style={[globalStyles.juiceImageContainer, { backgroundColor: item.color }]}>
        <Image
          style={globalStyles.juiceImage}
          source={{ uri: item.image }}
          resizeMode="cover"
        />
      </View>
      <Ionicons 
        name={item.icon} 
        size={20} 
        color={item.color} 
        style={{ marginBottom: 5 }}
      />
      <Text style={globalStyles.juiceName}>{item.name}</Text>
      <Text style={globalStyles.juicePrice}>{item.price}</Text>
      <Text style={globalStyles.juiceDescription}>{item.description}</Text>
      
      {/* Add to cart icon */}
      <View style={{ position: 'absolute', top: 10, right: 10 }}>
        <Ionicons name="cart" size={16} color="#7f8c8d" />
      </View>
    </TouchableOpacity>
  );

  const HorizontalJuiceList = ({ title, data, iconName, iconColor }) => (
    <View style={globalStyles.scrollContainer}>
      <View style={globalStyles.categoryHeader}>
        <View style={[globalStyles.iconContainer, { backgroundColor: iconColor }]}>
          <Ionicons name={iconName} size={20} color="white" />
        </View>
        <Text style={globalStyles.categoryTitle}>{title}</Text>
      </View>
      
      <FlatList
        horizontal
        data={data}
        renderItem={renderJuiceItem}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={globalStyles.horizontalScroll}
      />
      
      {/* Elegant chevron icon */}
      <View style={globalStyles.chevronIcon}>
        <Ionicons name="chevron-forward" size={24} color="#3498db" />
      </View>
    </View>
  );

  if (isLoading || !itemsLoaded) {
    return (
      <View style={[globalStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={{ marginTop: 20, fontSize: 18, color: '#2c3e50' }}>
          Loading fresh juices... 🍋
        </Text>
        <Text style={{ marginTop: 10, color: '#7f8c8d' }}>
          Please wait while we prepare the best for you!
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Cart Banner */}
      {cartCount > 0 && (
        <Animated.View 
          style={{
            backgroundColor: '#3498db',
            padding: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            opacity: fadeAnim,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="cart" size={20} color="white" style={{ marginRight: 10 }} />
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
              Total Items in Cart: {cartCount}
            </Text>
          </View>
          
          <TouchableOpacity 
            onPress={handleClearCart}
            style={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              paddingHorizontal: 15,
              paddingVertical: 8,
              borderRadius: 20,
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <Ionicons name="trash" size={16} color="white" style={{ marginRight: 5 }} />
            <Text style={{ color: 'white', fontSize: 14 }}>Clear All</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      <ScrollView style={globalStyles.container} showsVerticalScrollIndicator={false}>
        {/* Header with welcome message */}
        <View style={{ alignItems: 'center', marginBottom: 20, marginTop: 10 }}>
          <Text style={globalStyles.title}>
            Fresh Juices 🍋
          </Text>
          {userPreferences.username ? (
            <Text style={{ color: '#7f8c8d', fontSize: 16, textAlign: 'center' }}>
              Welcome, {userPreferences.username}! 👋{'\n'}
              <Text style={{ fontSize: 14 }}>We're glad to have you back!</Text>
            </Text>
          ) : null}
        </View>

        {/* Green Juices Section */}
        <HorizontalJuiceList 
          title="Green Juices" 
          data={juiceData.greenJuices}
          iconName="leaf"
          iconColor="#27ae60"
        />
        
        {/* Detox Juices Section */}
        <HorizontalJuiceList 
          title="Detox Juices" 
          data={juiceData.detoxJuices}
          iconName="flame"
          iconColor="#e74c3c"
        />

        {/* Navigation Buttons */}
        <View style={{ marginTop: 20, marginBottom: 30 }}>
          <TouchableOpacity 
            style={globalStyles.button}
            onPress={() => navigation.navigate('Welcome')}
          >
            <Ionicons name="person" size={20} color="white" style={{ marginRight: 10 }} />
            <Text style={globalStyles.buttonText}>Back to Welcome</Text>
          </TouchableOpacity>

          {cartCount > 0 && (
            <TouchableOpacity 
              style={[globalStyles.button, { backgroundColor: '#9b59b6' }]}
              onPress={() => alert(`You have ${cartCount} items in your cart! 🛒\n\nTotal: $${(cartCount * 5.99).toFixed(2)}`)}
            >
              <Ionicons name="cart" size={20} color="white" style={{ marginRight: 10 }} />
              <Text style={globalStyles.buttonText}>View Cart ({cartCount})</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;