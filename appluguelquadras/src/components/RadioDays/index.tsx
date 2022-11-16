import React, { useState } from "react";
import { View, TouchableOpacity, Text, useColorScheme } from "react-native";
import { TimeType } from "../../@types";

import styles from "./styles";
import stylesDark from "./stylesDark";

type Days = {
  day: string;
};

type Props = {
  array: Days[];
  valueProp: string;
  handleValue: Function;
};

const Radio = (props: Props) => {
  const theme = useColorScheme();
  const { valueProp, handleValue, array } = props;

  return (
    <View style={styles.formsOfPayment}>
      {array.map((item) => {
        const newValue = item.day;

        return (
          <View style={styles.radioGroup} key={item.day}>
            <View style={styles.infoRadio}>
              <Text
                style={
                  theme === "light" ? styles.itemValue : stylesDark.itemValue
                }
              >
                {item.day}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => handleValue(item.day)}
              key={item.day}
              activeOpacity={0.7}
            >
              <View style={[styles.radioContainer]}>
                <View
                  style={
                    valueProp === newValue
                      ? [styles.radioBorder, styles.radioBorderSelected]
                      : styles.radioBorder
                  }
                >
                  <View style={valueProp === newValue && styles.radioFill} />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

export default Radio;
