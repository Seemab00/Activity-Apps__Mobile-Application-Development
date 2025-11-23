import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { GlobalStyles } from '../styles/GlobalStyles';
import { Ionicons, MaterialIcons, FontAwesome, Feather } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('home');

  // Sample data
  const cakes = [
    {
      id: '1',
      name: 'Chocolate Fantasy',
      type: 'Cake',
      price: '$24.99',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    },
    {
      id: '2',
      name: 'Red Velvet',
      type: 'Cake',
      price: '$22.99',
      image: 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    },
    {
      id: '3',
      name: 'Strawberry Delight',
      type: 'Cake',
      price: '$26.99',
      image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    },
  ];

  const cupcakes = [
    {
      id: '1',
      name: 'Vanilla Dream',
      type: 'Cupcake',
      price: '$3.99',
      image: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    },
    {
      id: '2',
      name: 'Chocolate Chip',
      type: 'Cupcake',
      price: '$4.49',
      image: 'https://images.unsplash.com/photo-1603532648955-039310d9ed75?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    },
    {
      id: '3',
      name: 'Lemon Zest',
      type: 'Cupcake',
      price: '$3.79',
      image: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    },
  ];

  const ProductCard = ({ product }) => (
    <View style={GlobalStyles.productCard}>
      <Image
        source={{ uri: product.image }}
        style={{
          width: '100%',
          height: 120,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        }}
        resizeMode="cover"
      />
      <View style={{ padding: 8 }}>
        <Text style={GlobalStyles.productName}>{product.name}</Text>
        <Text style={GlobalStyles.productType}>{product.type}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 5,
          }}
        >
          <Text style={GlobalStyles.productPrice}>{product.price}</Text>
          <TouchableOpacity style={GlobalStyles.iconButton}>
            <Ionicons name="bag-add" size={18} color="#bd194fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const CategorySection = ({ title, data }) => (
    <View>
      <Text style={GlobalStyles.sectionTitle}>{title}</Text>
      <View style={{ height: 235 }}>
        <FlatList
          horizontal
          data={data}
          renderItem={({ item }) => <ProductCard product={item} />}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          Ionicons name="chevron-forward" size={24} color="#bd194fff" 
          contentContainerStyle={{ paddingHorizontal: 20 }}
        />
        <View
          style={{
            position: 'absolute',
            right: 8,
            top: '50%',
            marginTop: -12,
          }}
        >
          <Ionicons name="chevron-forward" size={24} color="#bd194fff" />
        </View>
      </View>
    </View>
  );

  // Bottom navigation items
  const bottomTabs = [
    { id: 'home', name: 'Home', icon: 'home' },
    { id: 'cart', name: 'Cart', icon: 'shopping-cart' },
    { id: 'orders', name: 'My Order', icon: 'receipt' },
    { id: 'offers', name: 'Offer', icon: 'gift' },
    { id: 'settings', name: 'Setting', icon: 'settings' },
  ];

  const handleTabPress = (tabId) => {
    setActiveTab(tabId);
    // You can add navigation logic here when you create other screens
    // For now, it will just change the active tab state
  };

  return (
    <View style={GlobalStyles.container}>
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 15,
          paddingTop: 35,
          backgroundColor: '#FFFFFF',
          elevation: 2,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        }}
      >
        <Text style={GlobalStyles.appNameText}>Bakery App</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity style={{ marginHorizontal: 12 }}>
            <Ionicons name="notifications-outline" size={24} color="#bd194fff" />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginHorizontal: 12 }}>
            <FontAwesome name="user-circle" size={24} color="#bd194fff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={{ flex: 1 }}>
        {/* Search Bar */}
        <View style={[GlobalStyles.searchBar, { flexDirection: 'row', alignItems: 'center' }]}>
          <Feather name="search" size={20} color="#999" style={{ marginRight: 10 }} />
          <TextInput
            placeholder="Search for cakes, cupcakes..."
            placeholderTextColor="#999"
            style={{ flex: 1, fontSize: 16 }}
          />
        </View>

        {/* Cakes Category */}
        <CategorySection title="Cakes" data={cakes} />

        {/* Cupcakes Category */}
        <CategorySection title="Cupcakes" data={cupcakes} />

        {/* Add some bottom padding for the navigation */}
        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingVertical: 12,
          backgroundColor: '#bd194fff',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        {bottomTabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={{
              alignItems: 'center',
              padding: 8,
            }}
            onPress={() => handleTabPress(tab.id)}
          >
            <Feather 
              name={tab.icon} 
              size={24} 
              color={activeTab === tab.id ? '#FFFFFF' : '#F8BBD9'} 
            />
            <Text 
              style={{ 
                fontSize: 10, 
                marginTop: 4,
                color: activeTab === tab.id ? '#FFFFFF' : '#F8BBD9',
                fontWeight: activeTab === tab.id ? 'bold' : 'normal'
              }}
            >
              {tab.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default HomeScreen;