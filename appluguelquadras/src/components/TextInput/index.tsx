import React from "react";
import {
  View,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from "react-native";
import { Colors } from "../../constants/colors";
import styles from "./styles";

export type TextInputProps = RNTextInputProps & {
  title: string;
};

const TextInput: React.FC<TextInputProps> = ({ title, ...props }) => {
  return (
    <View style={styles.container}>
      <RNTextInput
        style={styles.input}
        placeholder={title || props.placeholder}
        autoCompleteType="off"
        autoCapitalize="none"
        placeholderTextColor={Colors.TEXT_PRIMARY}
        {...props}
      />
    </View>
  );
};

export default TextInput;
