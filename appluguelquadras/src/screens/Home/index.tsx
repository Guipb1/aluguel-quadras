import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";

import ScreenHeader from "../../components/ScreenHeader";

import useAuthContext from "../../hooks/useAuthContext";
import styles from "./styles";

const Home: React.FC = () => {
  const { logout, user } = useAuthContext();

  const DATA = [
    {
      uid: "0",
      imageUrl:
        "http://www.sjc.sp.gov.br/media/13250/img_9980.jpg?anchor=center&mode=crop&width=940&height=627&rnd=131671591690000000",
      title: "Quadra 1",
    },
    {
      uid: "1",
      imageUrl:
        "http://www.sjc.sp.gov.br/media/13250/img_9980.jpg?anchor=center&mode=crop&width=940&height=627&rnd=131671591690000000",
      title: "Quadra 2",
    },
    {
      uid: "2",
      imageUrl:
        "http://www.sjc.sp.gov.br/media/13250/img_9980.jpg?anchor=center&mode=crop&width=940&height=627&rnd=131671591690000000",
      title: "Quadra 3",
    },
    {
      uid: "4",
      imageUrl:
        "http://www.sjc.sp.gov.br/media/13250/img_9980.jpg?anchor=center&mode=crop&width=940&height=627&rnd=131671591690000000",
      title: "Quadra 1",
    },
    {
      uid: "5",
      imageUrl:
        "http://www.sjc.sp.gov.br/media/13250/img_9980.jpg?anchor=center&mode=crop&width=940&height=627&rnd=131671591690000000",
      title: "Quadra 2",
    },
    {
      uid: "6",
      imageUrl:
        "http://www.sjc.sp.gov.br/media/13250/img_9980.jpg?anchor=center&mode=crop&width=940&height=627&rnd=131671591690000000",
      title: "Quadra 3",
    },
  ];

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      Alert.alert("Não foi possivel sair");
    }
  };

  return (
    <View style={styles.container}>
      <ScreenHeader username={user?.name} />
      <View style={styles.content}>
        <TouchableOpacity onPress={handleLogout}>
          <Text>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Home;
