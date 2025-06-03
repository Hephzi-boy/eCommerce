import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react'; // Import useState
import { Image, ImageSourcePropType, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'; // Added Pressable
import Toast, { BaseToast, ToastConfig, ToastConfigParams } from 'react-native-toast-message'; // Import Toast
import { useCart } from './context/CartContext'; // Import useCart

// Helper to get image source based on identifier
const getProductImageSource = (identifier: string | undefined): ImageSourcePropType | null => {
  if (identifier === 'iphone.png') {
    return require('@/assets/images/iphone.png');
  }
  // Add more cases if you have other products with different images
  // e.g., if (identifier === 'laptop.jpg') return require('@/assets/images/laptop.jpg');
  return null; // Or a default placeholder image
};

// Custom Toast Configuration
const toastConfig: ToastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props: ToastConfigParams<any>) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'green', width: '90%', height: 70, alignItems: 'center', justifyContent: 'center' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: '600',
      }}
      text2Style={{
        fontSize: 14,
      }}
    />
  ),
  // Define a new 'cartToast' type
  cartToast: ({ text2, ...rest }: ToastConfigParams<{ text2: string }>) => (
    <View style={styles.toastContainer}>
      <Image source={require('@/assets/icons/done.png')} style={styles.toastImage} />
      <Text style={styles.toastText}>{text2}</Text>
    </View>
  ),
};

const productDetails = () => {
  const router = useRouter(); // Initialize the router
  const params = useLocalSearchParams();
  const [isFavourited, setIsFavourited] = useState(false); // State for favourite status
  const [isItemAddedToCart, setIsItemAddedToCart] = useState(false); // State for cart status
  const { addItem } = useCart(); // Get addItem from CartContext

  const toggleFavourite = () => {
    setIsFavourited(!isFavourited);
  };

  const { productName, productVariant, productPrice, productImageIdentifier, descriptionPoint1, descriptionPoint2 } = params;

  const handleAddToCart = () => {
    setIsItemAddedToCart(true);
    if (productName && productVariant && productPrice && productImageIdentifier) {
      addItem({
        id: productImageIdentifier as string, // Use identifier as ID
        name: productName as string,
        variant: productVariant as string,
        price: productPrice as string,
        imageIdentifier: productImageIdentifier as string,
      });
      console.log(`${productName} added to cart!`);
    }

    Toast.show({
      type: 'cartToast', // Use our custom toast type
      text2: 'Item added to cart!',
      position: 'bottom', // Or 'top'
      visibilityTime: 3000, // Duration in ms
    });
  };
  const imageSource = getProductImageSource(productImageIdentifier as string);
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header Section - Copied from index.tsx */}
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

        {/* Go Back Button Section */}
        <TouchableOpacity onPress={() => router.back()} style={styles.goBackButton}>
          <Image
            source={require('@/assets/icons/leftArrow.png')} // Ensure this path is correct
            style={styles.goBackArrow}
          />
          <Text style={styles.goBackText}>Go back</Text>
        </TouchableOpacity>

        <ScrollView showsVerticalScrollIndicator={false}>
          {imageSource && (
            <View style={styles.productDetailImageContainer}>
              <Image
                source={imageSource}
                style={styles.productDetailImage}
                resizeMode="contain"
              />
              <Pressable
                onPress={toggleFavourite}
                style={styles.favouriteIconTouchableOnDetail} // Style for the touchable area
              >
                {({ pressed }) => ( // Children as a function to get pressed state
                  <Image
                    source={
                      isFavourited
                        ? require('@/assets/icons/Vector.png')  // Show Vector.png when favourited
                        : require('@/assets/icons/heart.png')    // Show heart.png when not favourited
                    }
                    style={[
                      styles.favouriteIconOnDetail,
                      { tintColor: isFavourited ? 'red' : '#888' }, // Red when favourited, gray otherwise
                      pressed && { transform: [{ scale: 0.8 }] }    // Scale down when pressed
                    ]}
                  />
                )}
              </Pressable>
            </View>
          )}
            
          <Text style={styles.productDetailNameVariant}>
            {productName} {productVariant}
          </Text>
          <Text style={styles.productDetailPrice}>{productPrice}</Text>

          <Text style={styles.aboutTitle}>About this item</Text>
          <View style={styles.bulletPointContainer}>
            {/* Bullet Point 1 */}
            <View style={styles.bulletPointItem}>
              <Text style={styles.bulletChar}>•</Text>
              <Text style={styles.bulletTextContent}>{descriptionPoint1}</Text>
            </View>
            {/* Bullet Point 2 */}
            <View style={styles.bulletPointItem}>
              <Text style={styles.bulletChar}>•</Text>
              <Text style={styles.bulletTextContent}>{descriptionPoint2}</Text>
            </View>
            {/* Add more bullet points if needed */}
          </View>

          {/* Ensure you have addToCart.png and addedToCart.png in '@/assets/images/' */}
          <TouchableOpacity onPress={handleAddToCart} style={styles.addToCartButtonContainer} disabled={isItemAddedToCart}>
            <Image
              source={isItemAddedToCart 
                        ? require('@/assets/images/addedToCart.png') // Assume this image exists
                        : require('@/assets/images/addToCart.png')}
              style={styles.addToCartImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </ScrollView>
      </View>
      {/* Add Toast component here. For global use, place this in your root _layout.tsx or App.tsx */}
      {/* Make sure it's not inside a ScrollView if you want it to overlay properly */}
      <Toast config={toastConfig} />
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff', // Or your app's background color
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 50, // Commented out: SafeAreaView and header margins should handle top spacing
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
    color: 'blue', 
    fontWeight: 'bold',
  },
  addressContainer: {
    flexDirection: 'column',
    marginLeft: 6,
    alignItems: 'flex-start',
  },
  deliveryAddressLabel: {
    fontSize: 12,
    color: 'grey',
    fontWeight: 'bold',
    marginLeft: 20, // This was in index.tsx, check if still desired
    marginBottom: 5,
  },
  addressText: {
    fontSize: 14,
    color: '#000',
    fontWeight: "bold",
    marginRight: 20, // This was in index.tsx, check if still desired
  },
  notificationIcon: {
    width: 28,
    height: 28,
    marginLeft: 10,
  },
  goBackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15, // Space below the header
    marginBottom: 15, // Space before the main content
    // paddingVertical: 8, // Optional: if you want more touchable area
  },
  goBackArrow: {
    width: 20, // Adjust size as needed
    height: 20, // Adjust size as needed
    marginRight: 8, // Space between arrow and text
    // tintColor: '#000', // Optional: if your arrow is a template image and needs tinting
  },
  goBackText: {
    fontSize: 16,
    color: '#000', // Or your desired text color
    fontWeight: '500',
  },
  productDetailImageContainer: {
    position: 'relative', // Needed for absolute positioning of the favourite icon
    marginBottom: 20,
    alignItems: 'center', // Center the image if its width is less than 100%
  },
  productDetailImage: {
    width: '100%',
    height: 350, // Increased height for a larger image
    resizeMode: 'contain',
     marginBottom: 10, 
  },
  favouriteIconTouchableOnDetail: {
    position: 'absolute',
    top: 8,    // Slightly closer to the top edge
    right: 8,  // Slightly closer to the right edge
    padding: 5, // Easier to tap
    // marginBottom: 1, // Not needed if icon itself has margin
    // alignSelf: 'flex-end', // Not strictly needed with absolute positioning top/right
  },
  favouriteIconOnDetail: {
    width: 22,
    height: 22,
    resizeMode: 'contain', // Ensure the entire icon is visible within the bounds
    // marginBottom: 1, // If needed for spacing within the touchable
    // alignSelf: 'flex-end' // Not needed here
  },
  productDetailNameVariant: {
    fontSize: 20,
    fontWeight: '500', // Slightly bolder
    color: '#333',    // Darker gray
    textAlign: 'left',
    marginBottom: 8,
    marginTop: 1,
  },
  productDetailPrice: {
    fontSize: 40,
    fontWeight: 'bold', // "bold and thick"
    color: '#000', // Black
    textAlign: 'left',
    marginBottom: 25,
    marginTop: 1,
  },
  aboutTitle: {
    fontSize: 15,
    fontWeight: '400', // Bolder
    color: 'grey',    // Darker gray
    marginBottom: 10,
  },
  bulletPointContainer: {
    marginBottom: 25,
  },
  bulletPointItem: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start', 
  },
  bulletChar: {
    fontSize: 15, 
    color: '#555',
    marginRight: 8, 
    lineHeight: 22, 
  },
  bulletTextContent: {
    fontSize: 15,
    color: 'grey', // Medium gray for bullet text
    textAlign: 'left',
    lineHeight: 22, // For better readability of bullet points
    flex: 1, // Allows text to wrap
  },
  addToCartButtonContainer: {
    alignItems: 'flex-start', // Align the button image to the left
    marginBottom: 30, // Space at the bottom
  },
  addToCartImage: {
    width: 400, // Adjust as per your addToCart.png dimensions
    height: 50,  // Adjust as per your addToCart.png dimensions
  },
  // Styles for Custom Toast
  toastContainer: {
    height: 60,
    width: '85%',
    backgroundColor: '#fff', // Changed to white background
    borderRadius: 10,
    flexDirection: 'row',
    borderLeftWidth: 5,      // Added for the thick green line
    borderLeftColor: 'green', // Added for the thick green line
    alignItems: 'center',
    paddingHorizontal: 15,
    elevation: 5, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  toastImage: {
    width: 24, // Adjust size as needed for toast.png
    height: 24, // Adjust size as needed for toast.png
    marginRight: 10,
  },
  toastText: {
    color: '#000', // Changed to black for white background
    fontSize: 15,
    fontWeight: '500',
  },
});

export default productDetails;
