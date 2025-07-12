import { View, Text } from "react-native";
import { Stack } from "expo-router";

function BookEntryLayout() {
  return (
    <Stack>
      <Stack.Screen name="AddLibrary" options={{ headerShown: false }} />
      <Stack.Screen name="AddWhishlist" options={{ headerShown: false }} />
    </Stack>
  );
}

export default BookEntryLayout;
