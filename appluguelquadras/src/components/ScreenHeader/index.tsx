import React, { useEffect, useState } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";

import styles from "./styles";
import stylesDark from "./stylesDark";

export type ScreenHeaderProps = {
  username: string;
  onPress?: () => void;
  imageOnly?: boolean;
};

const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  username,
  onPress = () => {},
  imageOnly,
}) => {
  const theme = useColorScheme();
  const [formattedUsername, setFormattedUsername] = useState("");
  useEffect(() => {
    if (username) {
      const formattedUsername = username.replace(" ", "+");
      setFormattedUsername(formattedUsername);
    }
  }, [username]);

  const apiUrl = `https://ui-avatars.com/api/?name=${formattedUsername}&rounded=true&background=ddd&bold=true&color=444`;

  return (
    <TouchableOpacity
      style={[
        theme === "light" ? styles.container : stylesDark.container,
        imageOnly ? { justifyContent: "center" } : {},
      ]}
      onPress={onPress}
    >
      {!imageOnly && (
        <View>
          <Text
            style={theme === "light" ? styles.titleText : stylesDark.titleText}
          >{`Olá, ${username}`}</Text>
        </View>
      )}
      <View>
        <Image
          style={[
            styles.avatar,
            imageOnly ? { width: 72, height: 72, borderRadius: 40 } : {},
          ]}
          source={{
            uri: apiUrl,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ScreenHeader;
