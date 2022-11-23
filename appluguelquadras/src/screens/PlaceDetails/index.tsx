import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
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
import moment from "moment";
import "../../utils/i18n/i18n";
import { useTranslation } from "react-i18next";

export type PlaceDetailProps = PlaceItemProps & {
  availableTimes: TimeType[];
};

const PlaceDetails: React.FC = () => {
  const { t } = useTranslation();
  const theme = useColorScheme();
  const { params } = useRoute<RouteProp<PlaceStackParamList>>();
  const [schedule, setSchedule] = useState("");
  const [selectedTime, setSelectedTime] = useState<TimeType>();
  const [dayOfWeek, setDayOfWeek] = useState("");
  const { navigate, goBack } = useNavigation();
  const { user, setUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [register, setRegister] = useState(false);
  const [reserveByFirebase, setReserveByFirebase] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [placeData, setPlaceData] = useState<PlaceDetailProps | undefined>(
    undefined
  );
  const [initialTimePickerVisible, setInitialTimePickerVisible] =
    useState(false);

  const hideDatePicker = () => {
    setInitialTimePickerVisible(false);
  };

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

  const getAllReserves = async () => {
    try {
      const allReserves = query(collection(firestoreInstance, "reserves"));

      const listner = onSnapshot(allReserves, (snapshot) => {
        const array: any[] = [];
        snapshot.forEach((doc) => {
          if (
            doc.data().placeId === params.placeId &&
            doc.data().schedule === schedule &&
            doc.data().dayOfWeek === dayOfWeek
          ) {
            array.push(doc.data());
          }
        });

        setReserveByFirebase(array);
      });

      return listner;
    } catch (error: any) {
      console.log("Error listner: ", error);
    }
  };

  useEffect(() => {
    getAllReserves();
  }, [schedule, dayOfWeek]);

  const handleBooking = async () => {
    try {
      setRegister(true);
      if (schedule === "" || dayOfWeek === "") {
        Alert.alert(t("PLACES.EMPTY_FIELDS"));
        return;
      }
      if (reserveByFirebase.length > 0) {
        Alert.alert(t("PLACES.ALREADY_RENTED"));
        return;
      } else {
        await handleReserve(
          schedule,
          user,
          params.placeId,
          placeData,
          dayOfWeek,
          selectedTime
        );

        setModalVisible(true);
      }
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

  const handleDate = (date: Date) => {
    const dateFormatted = moment(date);
    setDayOfWeek(dateFormatted.format("D/MM/YYYY"));
  };

  const handleValue = (value: string) => {
    setSchedule(value);
    setSelectedTime(placeData?.availableTimes[Number(value)]);
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
              {t("PLACES.HOURLY_RATE")}
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
              {t("PLACES.OPEN")}
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
              <>
                <View style={styles.radios}>
                  <Radio
                    handleValue={handleValue}
                    valueProp={schedule}
                    array={placeData?.availableTimes}
                  />
                  <TouchableOpacity
                    style={styles.buttonDay}
                    onPress={() => setInitialTimePickerVisible(true)}
                  >
                    <Text style={styles.bookingButtonText}>
                      {dayOfWeek === "" ? t("PLACES.CHOOSE_DAY") : dayOfWeek}
                    </Text>
                  </TouchableOpacity>
                </View>
                <DateTimePickerModal
                  isDarkModeEnabled
                  isVisible={initialTimePickerVisible}
                  mode="date"
                  onConfirm={(date) => {
                    handleDate(date);
                    hideDatePicker();
                  }}
                  onCancel={hideDatePicker}
                  cancelTextIOS={t("PLACES.CANCEL")}
                  confirmTextIOS={t("PLACES.CONFIRM")}
                  minimumDate={new Date()}
                />
              </>
            ) : (
              <Text>{t("PLACES.LOADING")}</Text>
            )
          ) : null}
        </View>
        <View style={styles.footer}>
          {user?.id === placeData?.user ? (
            <TouchableOpacity
              onPress={handleDeletePlace}
              style={styles.deletePlaceButton}
            >
              <Text style={styles.deletePlaceButtonText}>
                {t("PLACES.DELETE")}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handleBooking}
              style={styles.bookingButton}
            >
              {register ? (
                <ActivityIndicator color={Colors.TEXT_SECONDARY} size={32} />
              ) : (
                <Text style={styles.bookingButtonText}>
                  {t("PLACES.MAKE_RESERVATION")}
                </Text>
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
            {t("PLACES.SUCCESS")}
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
            {t("PLACES.AWAIT_CONFIRMATION")} {placeData?.name}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(!modalVisible);
              navigate(RouteNames.PRIVATE.HOME.ROOT);
            }}
            style={styles.bookingButton}
          >
            <Text style={styles.bookingButtonText}>{t("PLACES.GO_BACK")}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};
export default PlaceDetails;
