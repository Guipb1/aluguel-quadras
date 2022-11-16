import React, { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import Icon from "@expo/vector-icons/FontAwesome5";

import { TimeType } from "../../@types";

import styles from "./styles";
import { Colors } from "../../constants/colors";

export type TimeChipProps = TimeType & {
  isOwner?: boolean;
  onRemove?: () => void;
  onChangeInitialTime?: (date: any) => void;
  onChangeFinalTime?: (date: any) => void;
};

const TimeChip: React.FC<TimeChipProps> = ({
  id,
  isOwner,
  initialTime,
  finalTime,
  onRemove,
  onChangeInitialTime,
  onChangeFinalTime,
}) => {
  const [initialTimePickerVisible, setInitialTimePickerVisible] =
    useState(false);
  const [finalTimePickerVisible, setFinalTimePickerVisible] = useState(false);

  const hideDatePicker = () => {
    setInitialTimePickerVisible(false);
    setFinalTimePickerVisible(false);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.leftContent}>
          <TouchableOpacity
            style={styles.timeContainer}
            onPress={() => setInitialTimePickerVisible(true)}
            disabled={!isOwner}
          >
            <Text style={styles.label}>Inicio</Text>
            <Text style={styles.text}>{initialTime}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.timeContainer}
            onPress={() => setFinalTimePickerVisible(true)}
            disabled={!isOwner}
          >
            <Text style={styles.label}>Termino</Text>
            <Text style={styles.text}>{finalTime}</Text>
          </TouchableOpacity>
        </View>
        {isOwner && (
          <TouchableOpacity style={styles.buttonRemove} onPress={onRemove}>
            <Icon name="trash" size={20} color={Colors.TEXT_PRIMARY} />
          </TouchableOpacity>
        )}
      </View>

      <DateTimePickerModal
        isVisible={initialTimePickerVisible}
        mode="time"
        onConfirm={(date) => {
          onChangeInitialTime(date);
          hideDatePicker();
        }}
        onCancel={hideDatePicker}
        minuteInterval={30}
        cancelTextIOS="Cancelar"
        confirmTextIOS="Confirmar"
      />
      <DateTimePickerModal
        isVisible={finalTimePickerVisible}
        mode="time"
        onConfirm={(date) => {
          onChangeFinalTime(date);
          hideDatePicker();
        }}
        onCancel={hideDatePicker}
        minuteInterval={30}
        cancelTextIOS="Cancelar"
        confirmTextIOS="Confirmar"
      />
    </>
  );
};

export default TimeChip;
