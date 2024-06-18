import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

import logo from "../../src/assets/logo-column.png";

import { handleHarvester } from "../../src/utils/handleHarvester";

import { styles } from "../styles";

const harvesterSelect = () => {
  const [harvesterId, setHarvesterId] = useState("");
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Image source={logo} style={{ height: 98, width: 270 }}  />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="ID da colhedora"
          keyboardType="number-pad"
          style={styles.input}
          onChangeText={(text) => {
            setHarvesterId(text);
          }}
        ></TextInput>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.button}
          onPress={() => {
            handleHarvester(harvesterId);
          }}
        >
          <Text style={styles.buttonText}>Selecionar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default harvesterSelect;
