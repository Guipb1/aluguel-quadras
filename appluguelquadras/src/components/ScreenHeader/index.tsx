import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import styles from "./styles";

export type ScreenHeaderProps = {
  username: string;
};

const ScreenHeader: React.FC<ScreenHeaderProps> = ({ username }) => {
  const [formattedUsername, setFormattedUsername] = useState("");
  useEffect(() => {
    if (username) {
      const formattedUsername = username.replace(" ", "+");
      setFormattedUsername(formattedUsername);
    }
  }, [username]);

  const apiUrl = `https://ui-avatars.com/api/?name=${formattedUsername}&rounded=true&background=ddd&bold=true&color=444`;

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.titleText}>{`Olá, ${username}`}</Text>
      </View>
      <View>
        <Image
          style={styles.avatar}
          source={{
            uri: apiUrl,
          }}
        />
      </View>
    </View>
  );
};

export default ScreenHeader;
