import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { CartProvider } from "./context/CartContext"; // Import CartProvider
import "./globals.css";



export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "IBMPlexMono-Medium": require("../assets/fonts/IBMPlexMono-Medium.ttf"),
    "IBMPlexSans-VariableFont_wdth,wght": require("../assets/fonts/IBMPlexSans-VariableFont_wdth,wght.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
    if (!fontsLoaded) {
    return null;
  }
  
  return (
    <CartProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </CartProvider>
  );
}
