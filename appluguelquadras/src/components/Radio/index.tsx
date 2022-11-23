import React, { useState } from "react";
import { View, TouchableOpacity, Text, useColorScheme } from "react-native";
import { TimeType } from "../../@types";

import styles from "./styles";
import stylesDark from "./stylesDark";

import "../../utils/i18n/i18n";
import { useTranslation } from "react-i18next";

type Props = {
  array: any[];
  valueProp: string;
  handleValue: Function;
};

const Radio = (props: Props) => {
  const { t } = useTranslation();
  const theme = useColorScheme();
  const { valueProp, handleValue, array } = props;

  return (
    <View style={styles.formsOfPayment}>
      {array.map((item) => {
        const newValue = item.id;

        return (
          <View style={styles.radioGroup} key={item.id}>
            <View style={styles.infoRadio}>
              <Text
                style={
                  theme === "light" ? styles.itemValue : stylesDark.itemValue
                }
              >
                {Number(item.id) + 1}. {t("PLACES.TIME")}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => handleValue(item.id)}
              key={item.id}
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
