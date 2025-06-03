import { Ionicons } from '@expo/vector-icons'; // Ensure @expo/vector-icons is installed
import { Tabs } from 'expo-router';
import React from 'react';
import { Image, ImageSourcePropType, View } from 'react-native';

import { useCart } from '@/app/context/CartContext'; // Import useCart
/**
 * A helper component to render tab icons with consistent styling.
 * The `name` prop comes from the Ionicons set.
 * The `color` prop is provided by the Tab Navigator.
 */
const TabBarIcon = ({ name, color }: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) => {
  // You can adjust the icon size and style as needed.
  return <Ionicons name={name} size={24} color={color} style={{ marginBottom: -3 }} />;
};

/**
 * This is the main layout component for the (tabs) group.
 * It defines the tab navigator and its screens.
 */
const TabLayout = () => {
  const { hasItems: cartHasItems } = useCart(); // Get cart status
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#30BEFD', // A common blue color for active tabs
        tabBarInactiveTintColor: 'gray',   // A common gray for inactive tabs
        headerShown: false, // Hide the header globally for all tab screens
        // You can add more tab bar styling here if needed:
        // tabBarStyle: {
        //   backgroundColor: '#FFFFFF',
        //   height: 60,
        // },
      }}
    >
      <Tabs.Screen
        name="index" // This corresponds to `app/(root)/(tabs)/index.tsx`
        options={{
          title: 'Home',
          tabBarIcon: ({ focused, color }) => {
            const iconSource = require('@/assets/icons/home.png') as ImageSourcePropType;
            if (focused) {
              return (
                <View style={{
                  backgroundColor: color, // Active tint color
                  width: 55,
                  height: 29,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 1,
                }}>
                  <Image
                    source={iconSource}
                    style={{
                      width: 24,
                      height: 24,
                      tintColor: 'white', // Make the image white
                    }}
                  />
                </View>
              );
            }
            return (
              <Image
                source={iconSource}
                style={{
                  width: 24,
                  height: 24,
                  marginBottom: -3,
                  tintColor: color, // Inactive tint color (gray)
                }}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="cart" // This corresponds to `app/(root)/(tabs)/cart.tsx`
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => { // `color` is active/inactive tint from screenOptions
            if (focused) {
              return (
                <View
                  style={{
                    backgroundColor: color, // This will be tabBarActiveTintColor ('#007AFF')
                    width: 55,            // Diameter for the circular background
                    height: 29,           // Diameter for the circular background
                    borderRadius: 20,     // Half of width/height to make it a circle
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 1,     // Maintain vertical alignment
                  }}
                > 
                  {/* If cart has items and is focused, you might want to show Cart2.png or keep the Ionicons cart */}
                  {/* For simplicity, keeping Ionicons cart when focused, but you can change this */}
                  {/* Example: cartHasItems ? <Image source={require('@/assets/icons/Cart2.png')} style={{ width: 24, height: 24, tintColor: 'white' }} /> : <Ionicons name="cart" size={24} color="white" /> */}

                  <Ionicons
                    name="cart" // Filled cart icon for focused state
                    size={24}
                    color="white" // Icon color is white
                  />
                </View>
              );
            }
            // For inactive state, use the original TabBarIcon component
            // `color` will be tabBarInactiveTintColor ('gray')
            if (cartHasItems) {
              // Ensure Cart2.png exists in @/assets/icons/
              return <Image source={require('@/assets/icons/Cart2.png')} style={{ width: 50, height: 50, tintColor: color, marginBottom: -3 }} />;
            }
            return <TabBarIcon name="cart-outline" color={color} />; // Default empty cart icon
          },
        }}
      />
      <Tabs.Screen
        name="favourites" // Corrected to match `favourites.tsx`
        options={{
          title: 'Favourites',
          tabBarIcon: ({ focused, color }) => {
            const iconSource = require('@/assets/icons/heart.png') as ImageSourcePropType;
            if (focused) {
              return (
                <View style={{
                  backgroundColor: color, // Active tint color
                  width: 55,
                  height: 29,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 1,
                }}>
                  <Image
                    source={iconSource}
                    style={{
                      width: 24,
                      height: 24,
                      tintColor: 'white', // Make the image white
                    }}
                  />
                </View>
              );
            }
            return (
              <Image
                source={iconSource}
                style={{
                  width: 24,
                  height: 24,
                  marginBottom: -3,
                  tintColor: color, // Inactive tint color (gray)
                }}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="profile" // This corresponds to `app/(root)/(tabs)/profile.tsx`
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused, color }) => {
            const iconSource = require('@/assets/icons/profile.png') as ImageSourcePropType;
            if (focused) {
              return (
                <View style={{
                  backgroundColor: color, // Active tint color
                  width: 55,
                  height: 29,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 1,
                }}>
                  <Image
                    source={iconSource}
                    style={{
                      width: 24,
                      height: 24,
                      tintColor: 'white', // Make the image white
                    }}
                  />
                </View>
              );
            }
            return (
              <Image
                source={iconSource}
                style={{
                  width: 24,
                  height: 24,
                  marginBottom: -3,
                  tintColor: color, // Inactive tint color (gray)
                }}
              />
            );
          },
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
