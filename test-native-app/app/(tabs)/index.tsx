import {
  Image,
  StyleSheet,
  Platform,
  Text,
  View,
  TouchableOpacity,
  Appearance,
  ToastAndroid,
  Button,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useNsOverQuota } from "./Hooks/useTestHook";
import React, { useEffect, useState } from "react";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TextInput } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function HomeScreen() {
  const testfnc = require("../../node_modules/test_npm/index");
  console.log("RENDER : ", testfnc);

  const { data, SetIsPassedQryEnabled } = useNsOverQuota();
  useEffect(() => {
    SetIsPassedQryEnabled(true);
  }, []);

  const deviceTheme = Appearance.getColorScheme();
  const branchDesc = [...new Set(data && data.map((a) => a.branchDesc))];

  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const styles = StyleSheet.create({
    message: {
      textAlign: "center",
      paddingBottom: 10,
    },
    camera: {
      flex: 1,
      height: 500,
    },
    buttonContainer: {
      flex: 1,
      flexDirection: "row",
      backgroundColor: "transparent",
      margin: 64,
    },
    button: {
      flex: 1,
      alignSelf: "flex-end",
      alignItems: "center",
    },
    text: {
      fontSize: 24,
      fontWeight: "bold",
      color: "black",
    },
    headerImage: {
      color: "#808080",
      bottom: -90,
      left: -35,
      position: "absolute",
    },
  });

  const showToast = () => {
    ToastAndroid.show("A pikachu appeared nearby !", ToastAndroid.SHORT);
  };

  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      "All Your Base Are Belong To Us",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  const showToastWithGravityAndOffset = () => {
    ToastAndroid.showWithGravityAndOffset(
      "A wild toast appeared!",
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };

  const style = StyleSheet.create({
    navbar: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 20,
      backgroundColor: "#1E90FF",
    },
    link: {
      padding: 10,
    },
    linkText: {
      fontSize: 18,
      color: "#fff",
    },
  });

  return (
    <>
      <View style={style.navbar}>
        <Link href="/" style={style.link}>
          <Text style={style.linkText}>Home</Text>
        </Link>
        <Link href="../TabTwoScreen" style={style.link}>
          <Text style={style.linkText}>Explore</Text>
        </Link>
        {/* <Text style={style.linkText}>Services/API/Api</Text> */}
      </View>
      {/* <ParallaxScrollView
        headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
        headerImage={
          <Ionicons size={310} name="code-slash" style={styles.headerImage} />
        }
      >
        <View
          style={{
            backgroundColor: deviceTheme === "light" ? "white" : "black",
            height: "100%",
          }}
        >
          <View>
            <select>
              {branchDesc && branchDesc.map((a) => <option>{a}</option>)}
            </select>
            <CameraView style={styles.camera} facing={facing}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={toggleCameraFacing}
                >
                  <Text style={styles.text}>Flip Camera</Text>
                </TouchableOpacity>
              </View>
            </CameraView>

            <Button title="Toggle Toast" onPress={() => showToast()} />
            <Button
              title="Toggle Toast With Gravity"
              onPress={() => showToastWithGravity()}
            />
            <Button
              title="Toggle Toast With Gravity & Offset"
              onPress={() => showToastWithGravityAndOffset()}
            />
          </View>
        </View>
      </ParallaxScrollView> */}
    </>
  );
}
