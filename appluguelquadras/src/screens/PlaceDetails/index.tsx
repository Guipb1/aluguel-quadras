import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  Modal,
  useColorScheme,
  ActivityIndicator,
} from "react-native";
import { TimeType } from "../../@types";

import { PlaceItemProps } from "../../components/PlaceItem";
import Radio from "../../components/Radio";
import RadioDays from "../../components/RadioDays";
import TimeChip from "../../components/TimeChip";

import { firestoreInstance } from "../../config/firebase";
import { RouteNames } from "../../constants/routeNames";

import useAuthContext from "../../hooks/useAuthContext";
import { PlaceStackParamList } from "../../routes/types";
import { Reserve } from "../../services/userService";
import styles from "./styles";
import { Colors } from "../../constants/colors";
import stylesDark from "./stylesDark";
import { deletePlace, handleReserve } from "../../services/placeService";

export type PlaceDetailProps = PlaceItemProps & {
  availableTimes: TimeType[];
};

const PlaceDetails: React.FC = () => {
  const theme = useColorScheme();
  const { params } = useRoute<RouteProp<PlaceStackParamList>>();
  const [schedule, setSchedule] = useState("");
  const [day, setDay] = useState("");
  const [arrayDays, setArrayDays] = useState([]);
  const { navigate, goBack } = useNavigation();
  const { user, setUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [register, setRegister] = useState(false);
  const [showDays, setShowDays] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [placeData, setPlaceData] = useState<PlaceDetailProps | undefined>(
    undefined
  );

  useEffect(() => {
    (async () => {
      const query = await getDoc(
        doc(firestoreInstance, "places", params.placeId)
      );
      const data = query.data() as PlaceDetailProps;
      setPlaceData(data);
      setLoading(true);
    })();
  }, []);

  const handleNavigateToProfileInfos = () => {
    navigate(RouteNames.PRIVATE.HOME.PROFILE_INFOS);
  };

  const handleBooking = async () => {
    try {
      setRegister(true);
      if (day === "" || schedule === "") {
        Alert.alert("Escolha um horário e/ou o dia");
        return;
      }
      const userUpdated = await handleReserve(
        day,
        schedule,
        user,
        params.placeId,
        placeData
      );

      setUser(userUpdated);
      setModalVisible(true);
    } catch (error: any) {
      console.log("error: ", error);
    } finally {
      setRegister(false);
    }
  };

  const handleDeletePlace = async () => {
    await deletePlace(params.placeId);
    goBack();
  };

  const handleValue = (value: string) => {
    setSchedule(value);
    const placesFiltered = placeData.availableTimes.filter(
      (availableTime) => availableTime.id === value
    );
    const filteredDays = placesFiltered.map(
      (placeFiltered) => placeFiltered.days
    );
    const [days] = filteredDays;
    const daysIsNotRented = days.filter((day) => !day.isRented);
    setArrayDays(daysIsNotRented);
    setShowDays(true);
  };

  const handleDay = (value: string) => {
    setDay(value);
  };

  return (
    <View style={theme === "light" ? styles.container : stylesDark.container}>
      <View style={styles.header}>
        <Image
          source={
            placeData?.imageUrl
              ? { uri: placeData?.imageUrl }
              : require("../../assets/placeholder-2.jpeg")
          }
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <ScrollView>
        <View style={styles.content}>
          <Text
            style={theme === "light" ? styles.titleText : stylesDark.titleText}
          >
            {placeData?.name}
          </Text>
          <Text
            style={
              theme === "light" ? styles.addressText : stylesDark.addressText
            }
          >
            {placeData?.address}
          </Text>
          <View style={styles.infoContainer}>
            <Text
              style={
                theme === "light"
                  ? styles.valueHourLabel
                  : stylesDark.valueHourLabel
              }
            >
              Valor hora
            </Text>
            <Text
              style={
                theme === "light"
                  ? styles.valueHourText
                  : stylesDark.valueHourText
              }
            >{` R$ ${placeData?.hourValue}`}</Text>
          </View>
          <View style={styles.timesContainer}>
            <Text
              style={
                theme === "light"
                  ? styles.timesTitleText
                  : stylesDark.timesTitleText
              }
            >
              {`Aberto de segunda a sexta \nnos seguintes horarios`}
            </Text>
            {placeData?.availableTimes.map((item) => (
              <View style={styles.separator}>
                <TimeChip
                  initialTime={item.initialTime}
                  finalTime={item.finalTime}
                  isOwner={false}
                />
              </View>
            ))}
          </View>
          {user?.type === "BASIC" ? (
            loading ? (
              <View style={styles.radios}>
                <Radio
                  handleValue={handleValue}
                  valueProp={schedule}
                  array={placeData?.availableTimes}
                />
                {showDays && (
                  <RadioDays
                    handleValue={handleDay}
                    valueProp={day}
                    array={arrayDays}
                  />
                )}
              </View>
            ) : (
              <Text>Carregando...</Text>
            )
          ) : null}
        </View>
        <View style={styles.footer}>
          {user?.id === placeData?.user ? (
            <TouchableOpacity
              onPress={handleDeletePlace}
              style={styles.deletePlaceButton}
            >
              <Text style={styles.deletePlaceButtonText}>Deletar quadra</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handleBooking}
              style={styles.bookingButton}
            >
              {register ? (
                <ActivityIndicator color={Colors.TEXT_SECONDARY} size={32} />
              ) : (
                <Text style={styles.bookingButtonText}>Fazer reserva</Text>
              )}
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
      <Modal animationType="slide" transparent visible={modalVisible}>
        <View
          style={theme === "light" ? styles.modalView : stylesDark.modalView}
        >
          <Text
            style={
              theme === "light" ? styles.textReserved : stylesDark.textReserved
            }
          >
            Quadra reservada com sucesso!
          </Text>
          <View style={theme === "light" ? styles.viewPix : stylesDark.viewPix}>
            <Image
              source={require("../../../assets/cr7.jpg")}
              style={
                theme === "light" ? styles.imageModal : stylesDark.imageModal
              }
              resizeMode="cover"
            />
          </View>
          <Text
            style={
              theme === "light" ? styles.textLeased : stylesDark.textLeased
            }
          >
            Quando confirmado pelo locador, você estará apto para utilizar a
            quadra {placeData?.name}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(!modalVisible);
              navigate(RouteNames.PRIVATE.HOME.ROOT);
            }}
            style={styles.bookingButton}
          >
            <Text style={styles.bookingButtonText}>Voltar para Home</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};
export default PlaceDetails;
