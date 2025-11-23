import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from '../screens/HomeScreen';

// Mock the context
jest.mock('../context/AppContext', () => ({
  useAppContext: () => ({
    addToCart: jest.fn(),
    userPreferences: { username: 'Test User' }
  })
}));

// Mock navigation
const mockNavigation = { navigate: jest.fn() };

describe('HomeScreen', () => {
  it('renders correctly', () => {
    const { getByText } = render(<HomeScreen navigation={mockNavigation} />);
    
    expect(getByText('Fresh Juices 🍋')).toBeTruthy();
    expect(getByText('🌿 Green Juices')).toBeTruthy();
    expect(getByText('🍊 Detox Juices')).toBeTruthy();
  });
});