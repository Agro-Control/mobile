import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { BaiJamjuree_700Bold } from "@expo-google-fonts/bai-jamjuree";
import { Stack } from "expo-router";
import { View, LogBox } from "react-native";
import { StatusBar } from "expo-status-bar";
import { RootSiblingParent } from "react-native-root-siblings";

LogBox.ignoreAllLogs();

export default function Layout() {
  const [isLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  });

  if (!isLoadedFonts) {
    // return <SplashScreen />;
    return null;
  }
  return (
    <RootSiblingParent>
      <View style={{ position: "relative", flex: 1 }}>
        <StatusBar style="dark" backgroundColor="#fff" translucent />

        <Stack
          screenOptions={{
            contentStyle: {
              backgroundColor: "#fff",
            },
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="pages/harvesterSelect"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="pages/harvesterHourMeter"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="pages/event"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="pages/endTurn"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </View>
    </RootSiblingParent>
  );
}
