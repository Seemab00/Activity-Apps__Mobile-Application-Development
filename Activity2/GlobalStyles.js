import { StyleSheet } from 'react-native';

export const GlobalStyles = StyleSheet.create({
  // Colors
  primaryColor: '#fff', // Baby pink
  contrastColor: '#bd194fff', // Contrast color
  backgroundColor: '#FFFFFF',
  textColor: '#333333',
  lightText: '#666666',
  
  // Layout
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Typography
  titleText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#bd194fff',
    textAlign: 'center',
  },
  appNameText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#bd194fff',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#bd194fff',
    marginVertical: 10,
    marginHorizontal: 16,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
  },
  productType: {
    fontSize: 12,
    color: '#666666',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#bd194fff',
  },
  
  // Buttons
  primaryButton: {
    backgroundColor: '#bd194fff',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  iconButton: {
    backgroundColor: '#F8BBD9',
    borderRadius: 20,
    padding: 8,
  },
  
  // Cards
  productCard: {
    width: 160,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  
  // Search Bar
  searchBar: {
    height: 50,
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
    paddingHorizontal: 20,
    margin: 16,
  },
  
  // Bottom Navigation
  bottomNav: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
});