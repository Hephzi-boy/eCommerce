import { useCart } from '@/app/context/CartContext'; // Import useCart
import { useRouter } from 'expo-router'; // Import useRouter if you want to make the arrow functional
import React from 'react';
import { Image, ImageSourcePropType, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Toast, { ToastConfig, ToastConfigParams } from 'react-native-toast-message'; // Import Toast

// Helper to get image source based on identifier (can be moved to a shared utils file)
const getProductImageSource = (identifier: string | undefined): ImageSourcePropType | null => {
  if (identifier === 'iphone.png') {
    return require('@/assets/images/iphone.png');
  }
  // Add more cases if you have other products with different images
  return null; // Or a default placeholder image
};

// Custom Toast Configuration for Cart Page
const toastConfig: ToastConfig = {
  // Define a 'cartToast' type (can be reused or renamed if specific to checkout)
  cartToast: ({ text2 }: ToastConfigParams<{ text2: string }>) => (
    <View style={styles.toastContainer}>
      <Image source={require('@/assets/icons/done.png')} style={styles.toastImage} />
      <Text style={styles.toastText}>{text2}</Text>
    </View>
  ),
};

const cart = () => {
  const router = useRouter(); // For potential back navigation
  const { items, updateItemQuantity, removeItem } = useCart();

  const SHIPPING_COST = 10.00;

  const subtotal = items.reduce((acc, item) => {
    // Ensure price is a number, removing '$' and converting
    const priceValue = parseFloat(item.price.replace('$', ''));
    return acc + (priceValue * item.quantity);
  }, 0);

  const total = subtotal + SHIPPING_COST;

  const handleCheckout = () => {
    console.log('Checkout pressed');
    // Here you would typically navigate to a checkout screen or process payment
    Toast.show({
      type: 'cartToast', // Use the same custom toast type
      text2: 'Checkout complete', // New text for checkout
      position: 'bottom',
      visibilityTime: 3000,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header Section - Copied from productDetails.tsx / index.tsx */}
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.logoButton}>
            <Text style={styles.logoButtonText}>Full Logo</Text>
          </TouchableOpacity>

          <View style={styles.addressContainer}>
            <Text style={styles.deliveryAddressLabel}>DELIVERY ADDRESS</Text>
            <Text style={styles.addressText}>Umuezike Road, Oyo State</Text>
          </View>

          {/* Ensure you have notification.png in '@/assets/icons/' */}
          <Image
            source={require('@/assets/icons/notification.png')}
            style={styles.notificationIcon}
          />
        </View>

        {/* Your Cart Title Section */}
        <View style={styles.yourCartHeader}>
          <TouchableOpacity onPress={() => router.canGoBack() ? router.back() : router.push('/')} style={styles.backButtonTouchable}>
            <Image
              source={require('@/assets/icons/leftArrow.png')} // Ensure this path is correct
              style={styles.yourCartArrowIcon}
            />
          </TouchableOpacity>
          <Text style={styles.yourCartTitle}>Your Cart</Text>
        </View>

        {items.length === 0 ? (
          <Text style={styles.emptyCartText}>Your cart is empty.</Text>
        ) : (
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {items.map(item => (
              <View key={item.id} style={styles.cartItemContainer}>
                <Image source={getProductImageSource(item.imageIdentifier)} style={styles.cartItemImage} resizeMode="contain" />
                <View style={styles.cartItemDetails}>
                  <Text style={styles.cartItemName}>{item.name} {item.variant}</Text>
                  <Text style={styles.cartItemPrice}>{item.price}</Text>
                  <Text style={styles.cartItemStockStatus}>In stock</Text>
                  <View style={styles.quantityControls}>
                    <TouchableOpacity onPress={() => updateItemQuantity(item.id, item.quantity - 1)} style={[styles.quantityButton, { backgroundColor: '#cccccc' }]}>
                      <Image source={require('@/assets/icons/minus.png')} style={styles.controlIcon} />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity onPress={() => updateItemQuantity(item.id, item.quantity + 1)} style={styles.quantityButton}>
                      <Image source={require('@/assets/icons/add.png')} style={styles.controlIcon} />
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.deleteButton}>
                  <Image source={require('@/assets/icons/deleteIcon.png')} style={styles.deleteIcon} />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        )}

        {items.length > 0 && (
          <View style={styles.orderInfoContainer}>
            <Text style={styles.orderInfoTitle}>Order Info</Text>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Subtotal</Text>
              <Text style={styles.infoValue}>${subtotal.toFixed(2)}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Shipping</Text>
              <Text style={styles.infoValue}>${SHIPPING_COST.toFixed(2)}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabelTotal}>Total</Text>
              <Text style={styles.infoValueTotal}>${total.toFixed(2)}</Text>
            </View>

            <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
              <Image source={require('@/assets/images/checkout.png')} style={styles.checkoutImage} resizeMode="contain" />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <Toast config={toastConfig} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8f8', // Light background for cart page
  },
  scrollViewContent: {
    paddingBottom: 20, // Add padding to the bottom of the scroll view if order info is outside
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 50, // Consistent with other pages, adjust if needed
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20, // Space below the header
  },
  logoButton: {
    backgroundColor: '#30BEFD', // Blue color
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 5,
  },
  logoButtonText: {
    color: 'white', 
    fontWeight: 'bold',
  },
  addressContainer: {
    flexDirection: 'column',
    marginLeft: 6,
    alignItems: 'flex-start',
  },
  deliveryAddressLabel: {
    fontSize: 12,
    color: 'grey', // Consistent with productDetails.tsx
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 5,
  },
  addressText: {
    fontSize: 14,
    color: '#000',
    fontWeight: "bold",
    marginRight: 20,
  },
  notificationIcon: {
    width: 28,
    height: 28,
    marginLeft: 10,
  },
  backButtonTouchable: {
    padding: 5, // Easier to tap
  },
  yourCartHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15, // Space below the main header
    marginBottom: 20, // Space before cart items content
  },
  yourCartArrowIcon: {
    width: 24, // Adjust size as needed
    height: 24, // Adjust size as needed
    marginRight: 10, // Space between arrow and "Your Cart" text
  },
  yourCartTitle: {
    fontSize: 22, // Adjust size as needed
    fontWeight: 'bold',
    color: '#000', // Or your desired text color
  },
  emptyCartText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
    color: 'grey',
  },
  cartItemContainer: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0', // Changed to a light grey
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    alignItems: 'flex-start', // Align items to the top
  },
  cartItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  cartItemDetails: {
    flex: 1, // Take remaining space
    justifyContent: 'space-between',
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  cartItemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  cartItemStockStatus: {
    fontSize: 14,
    color: 'green',
    marginBottom: 10,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 30,                 // Added for circular shape
    height: 30,                // Added for circular shape
    borderRadius: 15,          // Makes it a circle
    backgroundColor: 'white', // Background color for the circle
    justifyContent: 'center',  // Center icon horizontally
    alignItems: 'center',      // Center icon vertically
  },
  controlIcon: {
    width: 24, // Adjust size as needed
    height: 24, // Adjust size as needed
    // If your icons are template images and need a specific color:
    // tintColor: '#333', // Example: dark grey icon color
    // If they are already colored, tintColor might not be needed or could conflict.
    // For minus.png and add.png, ensure they have good contrast with '#e0e0e0'
    // or adjust their source images.
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 15,
    color: '#333',
  },
  deleteButton: {
    width: 30,                 // Added for circular shape
    height: 30,                // Added for circular shape
    borderRadius: 15,          // Makes it a circle
    backgroundColor: 'white', // Background color for the circle (can be different, e.g., a light red)
    justifyContent: 'center',  // Center icon horizontally
    alignItems: 'center',      // Center icon vertically
    marginLeft: 'auto', // Push to the far right
    alignSelf: 'flex-end', // Align to the top of its space
  },
  deleteIcon: {
    width: 24, // Adjust size as needed
    height: 24, // Adjust size as needed
    // Ensure this icon has good contrast with '#e0e0e0'
    // You might want to change tintColor to something darker if needed, e.g., '#333'
    tintColor: '#555', // Adjusted for better visibility on grey circle
  },
  // Order Info Styles
  orderInfoContainer: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  orderInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold', // Made bold and thick
    color: '#333',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    color: '#555',
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  infoLabelTotal: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  infoValueTotal: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  checkoutButton: {
    marginTop: 20,
    alignItems: 'center', // Center the image if it's narrower than screen
    marginBottom: 20, // Space at the very bottom
  },
  checkoutImage: {
    width: '100%', // Make image responsive
    height: 50,    // Adjust height as per your image aspect ratio
    // If your checkout.png is not full width, you might want to set a fixed width
    // width: 300, 
  },
  // Styles for Custom Toast (copied from productDetails.tsx for consistency)
  toastContainer: {
    height: 60,
    width: '85%',
    backgroundColor: '#fff', 
    borderRadius: 10,
    flexDirection: 'row',
    borderLeftWidth: 5,      
    borderLeftColor: 'green', 
    alignItems: 'center',
    paddingHorizontal: 15,
    elevation: 5, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  toastImage: {
    width: 24, 
    height: 24, 
    marginRight: 10,
  },
  toastText: {
    color: '#000', 
    fontSize: 15,
    fontWeight: '500',
  },
});

export default cart;