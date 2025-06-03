import { useRouter } from 'expo-router'; // Import useRouter
import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Index() {
  const router = useRouter(); // Initialize the router
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header Section */}
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

        {/* Search Bar Section */}
        <View style={styles.searchBarContainer}>
          <Image source={require('@/assets/icons/search.png')} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#888" // Light gray for placeholder
          />
        </View>

        {/* Technology Section */}
        <View style={styles.technologySectionContainer}>
          <View style={styles.technologyHeader}>
            {/* Ensure you have leftArrow.png in '@/assets/icons/' */}
            <Image
              source={require('@/assets/icons/leftArrow.png')}
              style={styles.arrowIcon} />
            <Text style={styles.technologyTitle}>Technology</Text>
          </View>
          <Text style={styles.technologySubtitle}>
            Smartphones, Laptops & Accessories
          </Text>
        </View>

        {/* Product Grid Section */}
        <View style={styles.productGridContainer}>
          {/* Box 1: iPhone */}
          <TouchableOpacity
            onPress={() => router.push({
              pathname: '/productDetails',
              params: {
                productName: 'Apple iPhone 16',
                productVariant: '128GB | Teal',
                productPrice: '$700.00',
                productImageIdentifier: 'iphone.png', // We'll use this to load the correct image
                descriptionPoint1: "This pre-owned product is not Apple certified, but has been professionally inspected, tested and cleaned by Amazon-qualified suppliers.",
                descriptionPoint2: "There will be no visible cosmetic imperfections when held at an arm’s length. There will be no visible cosmetic imperfections when held at an arm’s length."
              }
            })}
            style={styles.productTouchable}>
            <View style={styles.productBox}>
              <Image source={require('@/assets/images/iphone.png')} style={styles.productImage} />
              <Text style={styles.productName}>Apple iPhone 16</Text>
              <Text style={styles.productDetailsText}>128GB | Teal</Text>
              <Text style={styles.productPrice}>$700.00</Text>
            </View>
          </TouchableOpacity>

          {/* Box 2: MacBook Air */}
          <TouchableOpacity onPress={() => router.push('/productDetails')} style={styles.productTouchable}>
            <View style={styles.productBox}>
              <Image source={require('@/assets/images/laptop.jpg')} style={styles.productImage} />
              <Text style={styles.productName}>M4 Macbook Air 13"</Text>
              <Text style={styles.productDetailsText}>256GB | Sky blue</Text>
              <Text style={styles.productPrice}>$1000.00</Text>
            </View>
          </TouchableOpacity>

          {/* Box 3: Google Pixel */}
          <TouchableOpacity onPress={() => router.push('/productDetails')} style={styles.productTouchable}>
            <View style={styles.productBox}>
              <Image source={require('@/assets/images/googlePixel.png')} style={styles.productImage} />
              <Text style={styles.productName}>Google Pixel 9A</Text>
              <Text style={styles.productDetailsText}>128GB | Iris</Text>
              <Text style={styles.productPrice}>$499.00</Text>
            </View>
          </TouchableOpacity>

          {/* Box 4: Airpods */}
          <TouchableOpacity onPress={() => router.push('/productDetails')} style={styles.productTouchable}>
            <View style={styles.productBox}>
              <Image source={require('@/assets/images/airpods.jpg')} style={styles.productImage} />
              <Text style={styles.productName}>Apple Airpods 4</Text>
              <Text style={styles.productDetailsText}>Active Noise Cancelatio...</Text>
              <Text style={styles.productPrice}>$129.00</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff', // Or your app's background color
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 50, // Increased top padding to push content down
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
    color: 'blue', // White text
    fontWeight: 'bold',
  },
  addressContainer: {
    flexDirection: 'column', // Ensures "DELIVERY ADDRESS" and "Umuezike Road..." are stacked vertically
    marginLeft: 6, // Space next to the logo button
    alignItems: 'flex-start', // Aligns the stacked text lines to the left
  },
  deliveryAddressLabel: {
    fontSize: 12,
    color: 'gray', // Or your desired color
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 5,
  },
  addressText: {
    fontSize: 14, // Or your desired size
    color: '#000',
    fontWeight: "bold",
    marginRight: 20, // Or your desired color
  },
  notificationIcon: {
    width: 28,
    height: 28,
    marginLeft: 10, // Space next to the address
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // White background for the search bar
    borderWidth: 1,          // Add a border
    borderColor: 'grey',  // Black color for the border
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10, // Adjust for desired height of search bar
    marginTop: 10, // Space between header and search bar
    // marginBottom: 20, // Optional: if you want space below the search bar before other content
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    // tintColor: '#555' // Optional: if your search.png is a single color and you want to tint it
  },
  searchInput: {
    flex: 1, // Takes up remaining space in the search bar
    fontSize: 16,
    color: '#333', // Darker text color for input
    // React Native TextInput doesn't have a default height, paddingVertical on container helps
    // or you can set a specific height here if needed.
  },
  technologySectionContainer: {
    marginTop: 20, // Space above this new section
    // marginBottom: 20, // Optional: if you want space below this section
  },
  technologyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowIcon: {
    marginRight: 8, // Space between arrow and "Technology" text
    width: 24,      // Set the width for your image
    height: 24,     // Set the height for your image
  },
  technologyTitle: {
    fontSize: 28, // Adjust size as needed
    fontWeight: 'bold',
    color: '#000000', // Black color
  },
  technologySubtitle: {
    fontFamily: 'IBMPlexMono-Medium', // Using the custom font
    fontSize: 25, // Adjust size as needed
    color: 'black', // Dark gray, adjust as needed
    marginTop: 10, // Gap of 10 from the "Technology" line
    // If you want the subtitle to be directly under the "Technology" text (aligned with it),
    // you might need to adjust marginLeft or wrap "Technology" and subtitle in another View.
    // For now, it will be under the entire "technologyHeader" row.
  },
  productGridContainer: {
    flexDirection: 'row', // Arrange boxes in a row
    flexWrap: 'wrap',     // Allow boxes to wrap to the next line
    justifyContent: 'space-between', // Distribute space between boxes in a row
    marginTop: 20,        // Space above the product grid
  },
  productTouchable: { // Style for the TouchableOpacity wrapper
    width: '48%', // Each touchable takes up slightly less than half the width
    marginBottom: 15, // Space below each touchable (maintains row gap)
  },
  productBox: {
    // width: '100%', // Box takes full width of its TouchableOpacity parent
    backgroundColor: '#FFFFFF', // White background for the box
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0', // Light gray border
    padding: 12, // Increased padding a bit for better spacing
    alignItems: 'flex-start', // Center content like image and text horizontally
  },
  productImage: {
    width: '100%', // Make image take full width of its container (productBox padding respected)
    height: 130,   // Adjusted height for potentially larger product images
    resizeMode: 'contain', // Ensure the whole image is visible
    marginBottom: 10, // Increased space below image
  },
  productName: {
    fontSize: 15, // Slightly larger for product name
    fontWeight: '600', // Semi-bold
    textAlign: 'left',
    color: 'grey', // Darker color
    marginBottom: 1,
  },
  productDetailsText: {
    fontSize: 13,
    color: 'grey', // Medium gray
    textAlign: 'left',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  productPrice: {
    fontSize: 23, // Larger for price
    fontWeight: 'bold', // "very thick and bold"
    color: '#000000', // Black
    textAlign: 'left',
  },
});
