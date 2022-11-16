import { useNavigation } from "@react-navigation/native";
import { AirbnbRating } from "react-native-ratings";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Modal,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SliderItem from "../../components/RenderItem";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Colors } from "../../constants/colors";

import ScreenHeader from "../../components/ScreenHeader";
import { firestoreInstance } from "../../config/firebase";
import { RouteNames } from "../../constants/routeNames";

import useAuthContext from "../../hooks/useAuthContext";
import styles from "./styles";
import stylesDark from "./stylesDark";
import { Days, Rent } from "../../@types";
import { PlaceDetailProps } from "../PlaceDetails";
import BetterPlaces from "../../components/BetterPlaces";
import {
  allowPlaceUpdate,
  getRateService,
  sendAvaliation,
} from "../../services/placeService";

const Home: React.FC = () => {
  const theme = useColorScheme();
  const { navigate } = useNavigation();
  const { user } = useAuthContext();
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  const [item, setItem] = useState<Rent>();
  const [placesPending, setPlacesPending] = useState<any[]>();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmPlace, setConfirmPlace] = useState(false);
  const [isSendAvaliation, setIsSendAvaliation] = useState(false);
  const [ratePlace, setRatePlace] = useState(0);
  const [myRate, setMyRate] = useState(0);
  const [betterPlaces, setBetterPlaces] = useState([]);

  const handleNavigateToProfileInfos = () => {
    navigate(RouteNames.PRIVATE.HOME.PROFILE_INFOS);
  };

  const handleNavigateToSendComprovant = () => {
    navigate(RouteNames.PRIVATE.HOME.SEND_COMPROVANT, {
      item,
    });
  };

  const handleNavigateToPay = () => {
    navigate(RouteNames.PRIVATE.HOME.PAY, {
      item,
    });
  };

  const getRate = async () => {
    try {
      let media = 0;
      const data = await getRateService(item);
      if (data.rating) {
        if (data.rating?.length > 0) {
          data.rating?.forEach((rate) => {
            media = media + rate.rate;
          });
        }
      }
      setRatePlace(media / data.rating?.length);
    } catch (error: any) {
      console.log("Error get rate: ", error);
    }
  };

  useEffect(() => {
    getRate();
  }, [item]);

  const getPendingsPlaces = async () => {
    const places = query(collection(firestoreInstance, "reserves"));
    const listner = onSnapshot(places, (snapshot) => {
      const placesPending = [];
      snapshot.forEach((doc) => {
        if (doc.data().locatorId === user?.id) {
          const placePending = {
            ...doc.data(),
            reserveId: doc.id,
          };
          if (doc.data().day?.status === "PENDENTE") {
            placesPending.push(placePending);
          }
        }
      });
      setPlacesPending(placesPending);
    });

    return listner;
  };

  const getPlaces = async () => {
    const allPlaces = query(collection(firestoreInstance, "places"));
    const listner = onSnapshot(allPlaces, (snapshot) => {
      let betterPlacesSnapshot = [];

      snapshot.forEach((doc) => {
        let sum = doc.data().rating.reduce((accumulator: number, item) => {
          return accumulator + item.rate;
        }, 0);

        const rate = {
          rate: (sum === 0 ? 0 : sum / doc.data().rating.length).toFixed(1),
          place: doc.data().name,
          imageUrl: doc.data()?.imageUrl,
        };
        betterPlacesSnapshot.push(rate);
      });

      setBetterPlaces(betterPlacesSnapshot);
    });

    return listner;
  };

  useEffect(() => {
    getPlaces();
    if (user?.type === "LOCATOR") {
      getPendingsPlaces();
    } else if (user?.type === "BASIC") {
      setLoading(true);
      const allPlaces = query(collection(firestoreInstance, "places"));
      const listner = onSnapshot(allPlaces, (snapshot) => {
        const arrayPending: Rent[] = [];
        const arrayApproved: Rent[] = [];
        snapshot.forEach((doc) => {
          doc.data().availableTimes?.forEach((availableTime) => {
            availableTime.days?.forEach((day: Days) => {
              if (day.userId) {
                if (day.userId === user?.id) {
                  if (day.status === "PENDENTE") {
                    arrayPending.push({
                      placeId: doc.id,
                      address: doc.data().address,
                      hourValue: doc.data().hourValue,
                      name: doc.data().name,
                      locatorId: doc.data().user,
                      initialTime: availableTime.initialTime,
                      finalTime: availableTime.finalTime,
                      availableTimeId: availableTime.id,
                      day: day,
                      imageUrl: doc.data().imageUrl,
                    });
                  } else if (day.status === "APROVADO") {
                    arrayApproved.push({
                      placeId: doc.id,
                      address: doc.data().address,
                      hourValue: doc.data().hourValue,
                      name: doc.data().name,
                      locatorId: doc.data().user,
                      initialTime: availableTime.initialTime,
                      finalTime: availableTime.finalTime,
                      availableTimeId: availableTime.id,
                      day: day,
                      imageUrl: doc.data().imageUrl,
                    });
                  }
                }
                snapshot;
              }
            });
          });
        });

        setPending(arrayPending);
        setApproved(arrayApproved);
        setLoading(false);
      });

      return listner;
    }
  }, []);

  const allowPlace = async () => {
    setConfirmPlace(true);
    try {
      await allowPlaceUpdate(item);
    } catch (error: any) {
      console.log("Error allow place: ", error);
    } finally {
      setConfirmPlace(false);
    }
  };

  const setRate = async () => {
    setIsSendAvaliation(true);
    await sendAvaliation(item, myRate);
    Alert.alert("Avaliação enviada com sucesso!");
    setIsSendAvaliation(false);
  };

  const ratingCompleted = (rating: number) => {
    setMyRate(rating);
  };

  const renderBetterPlaces = () => {
    if (betterPlaces.length > 0) {
      betterPlaces.sort((a, b) => parseFloat(b.rate) - parseFloat(a.rate));
    }
    const slice = betterPlaces.slice(0, 3);

    return (
      <View style={[styles.marginHorizontal, styles.marginVertical]}>
        <Text style={styles.textBetterPlaces}>Melhores quadras</Text>
        <FlatList
          keyExtractor={(item, index) => String(index)}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={slice}
          renderItem={({ item }) => <BetterPlaces data={item} />}
        />
      </View>
    );
  };

  return (
    <ScrollView
      style={theme === "light" ? styles.container : stylesDark.container}
    >
      <ScreenHeader
        username={user?.name}
        onPress={handleNavigateToProfileInfos}
      />
      {loading ? (
        <Text>Carregando...</Text>
      ) : user?.type === "BASIC" ? (
        <>
          {user?.reserve ? (
            <>
              <View style={[styles.marginHorizontal, styles.marginVertical]}>
                <Text style={styles.textPending}>Quadras pendentes</Text>
                <FlatList
                  keyExtractor={(item, index) => String(index)}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={pending}
                  renderItem={({ item }) => (
                    <SliderItem
                      data={item}
                      setModalVisible={setModalVisible}
                      modalVisible={modalVisible}
                      setItem={setItem}
                    />
                  )}
                />
              </View>
              <View style={[[styles.marginHorizontal, styles.marginVertical]]}>
                <Text style={styles.textApproved}>Quadras aprovadas</Text>
                <FlatList
                  keyExtractor={(item, index) => String(index)}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={approved}
                  renderItem={({ item }) => (
                    <SliderItem
                      data={item}
                      setModalVisible={setModalVisible}
                      modalVisible={modalVisible}
                      setItem={setItem}
                    />
                  )}
                />
              </View>
            </>
          ) : (
            <View style={styles.viewImageWithoutReserve}>
              <View style={styles.viewTextImageWithoutReserve}>
                <Text
                  style={
                    theme === "light"
                      ? styles.textImageWithoutReserve
                      : stylesDark.textImageWithoutReserve
                  }
                >
                  Opa, parece que você ainda não alugou nenhuma quadra
                </Text>
                <Text
                  style={
                    theme === "light"
                      ? styles.textImageWithoutReserve
                      : stylesDark.textImageWithoutReserve
                  }
                >
                  Alugue uma quadra agora mesmo!
                </Text>
              </View>
              <Image
                source={require("../../../assets/r10.jpg")}
                style={styles.imageWithoutReserve}
                resizeMode="cover"
              />
            </View>
          )}
        </>
      ) : (
        <>
          <View style={[[styles.marginHorizontal, styles.marginVertical]]}>
            <Text style={styles.textApproved}>Comprovantes de pagamentos</Text>
            <FlatList
              keyExtractor={(item, index) => String(index)}
              horizontal
              showsHorizontalScrollIndicator={false}
              data={placesPending}
              renderItem={({ item }) => (
                <SliderItem
                  data={item}
                  setModalVisible={setModalVisible}
                  modalVisible={modalVisible}
                  setItem={setItem}
                />
              )}
            />
          </View>
        </>
      )}
      {renderBetterPlaces()}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        {user?.type === "BASIC" ? (
          <View
            style={
              theme === "light"
                ? styles.itemContainer
                : stylesDark.itemContainer
            }
          >
            <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible)}
              style={styles.closeButton}
            >
              <Icon
                name="close"
                size={32}
                color={theme === "light" ? Colors.TEXT_PRIMARY : Colors.PAPER}
              />
            </TouchableOpacity>
            <View style={theme === "light" ? styles.header : stylesDark.header}>
              <Image
                source={
                  item?.imageUrl
                    ? { uri: item?.imageUrl }
                    : require("../../assets/placeholder.jpeg")
                }
                style={styles.image}
                resizeMode="cover"
              />
            </View>
            <View style={styles.content}>
              <View style={styles.viewRate}>
                <View>
                  <Text
                    style={
                      theme === "light"
                        ? styles.titleText
                        : stylesDark.titleText
                    }
                  >
                    {item?.name}
                  </Text>
                  <Text
                    style={
                      theme === "light"
                        ? styles.addressText
                        : stylesDark.addressText
                    }
                  >
                    {item?.address}
                  </Text>
                </View>
                {ratePlace ? (
                  <Text
                    style={theme === "light" ? styles.rate : stylesDark.rate}
                  >
                    {ratePlace.toFixed(1)}/5
                  </Text>
                ) : (
                  <Text
                    style={theme === "light" ? styles.rate : stylesDark.rate}
                  >
                    0/5
                  </Text>
                )}
              </View>
              <View style={styles.infoContainer}>
                <Text
                  style={
                    theme === "light"
                      ? styles.textThemeDarkOrLight
                      : stylesDark.textThemeDarkOrLight
                  }
                >
                  Você alugou para o horário/dia de
                </Text>
                <Text
                  style={
                    theme === "light"
                      ? styles.valueHourText
                      : stylesDark.valueHourText
                  }
                >
                  {item?.initialTime} às {item?.finalTime}, para{" "}
                  {item?.day?.day}-feira
                </Text>
              </View>
              {item?.day?.status === "APROVADO" && (
                <>
                  <Text
                    style={
                      theme === "light"
                        ? styles.evaluatePlace
                        : stylesDark.evaluatePlace
                    }
                  >
                    Avaliar quadra
                  </Text>
                  <AirbnbRating
                    count={5}
                    showRating
                    reviews={["", "", "", "", ""]}
                    defaultRating={0}
                    size={30}
                    onFinishRating={ratingCompleted}
                    starContainerStyle={{ marginTop: -40 }}
                  />
                  {isSendAvaliation ? (
                    <Text style={styles.sendingRequest}>Enviando...</Text>
                  ) : (
                    <Text onPress={() => setRate()} style={styles.sendRequest}>
                      enviar avaliação
                    </Text>
                  )}
                </>
              )}
            </View>
            <View
              style={{
                ...styles.viewStatus,
                justifyContent:
                  item?.day?.status === "PENDENTE"
                    ? "space-between"
                    : "space-evenly",
              }}
            >
              <Text
                style={
                  theme === "light"
                    ? styles.textThemeDarkOrLight
                    : stylesDark.textThemeDarkOrLight
                }
              >
                status de pagamento
              </Text>
              <View
                style={{
                  ...styles.viewTextStatus,
                  backgroundColor:
                    item?.day?.status === "PENDENTE"
                      ? Colors.PENDING
                      : Colors.PRIMARY,
                }}
              >
                <Text style={styles.textStatus}>{item?.day?.status}</Text>
              </View>
              {item?.day?.status === "PENDENTE" && (
                <View style={styles.viewButton}>
                  <TouchableOpacity
                    style={{
                      ...styles.bookingButton,
                      backgroundColor: Colors.SEND_COMPROVANT,
                    }}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      handleNavigateToSendComprovant();
                    }}
                  >
                    <Text style={styles.bookingButtonText}>
                      Enviar comprovante
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      ...styles.bookingButton,
                      backgroundColor: Colors.PRIMARY,
                    }}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      handleNavigateToPay();
                    }}
                  >
                    <Text style={styles.bookingButtonText}>
                      Realizar pagamento
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        ) : (
          <View
            style={
              theme === "light"
                ? styles.itemContainer
                : stylesDark.itemContainer
            }
          >
            <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible)}
              style={styles.closeButton}
            >
              <Icon
                name="close"
                size={32}
                color={theme === "light" ? Colors.TEXT_PRIMARY : Colors.PAPER}
              />
            </TouchableOpacity>
            <View style={styles.content}>
              <Text
                style={
                  theme === "light" ? styles.titleText : stylesDark.titleText
                }
              >
                {item?.name}
              </Text>
              <Text
                style={
                  theme === "light"
                    ? styles.addressText
                    : stylesDark.addressText
                }
              >
                {item?.address}
              </Text>
              <View style={styles.infoContainer}>
                <Text
                  style={
                    theme === "light"
                      ? styles.textThemeDarkOrLight
                      : stylesDark.textThemeDarkOrLight
                  }
                >
                  Esta quadra foi reservada para o horário/dia de
                </Text>
                <Text
                  style={
                    theme === "light"
                      ? styles.valueHourText
                      : stylesDark.valueHourText
                  }
                >
                  {item?.initialTime} às {item?.finalTime}, para{" "}
                  {item?.day?.day}-feira
                </Text>
              </View>
              <View style={styles.infoContainer}>
                <Text
                  style={[
                    styles.marginBottom,
                    theme === "light"
                      ? styles.textThemeDarkOrLight
                      : stylesDark.textThemeDarkOrLight,
                  ]}
                >
                  comprovante de pagamento
                </Text>
                <Image
                  source={{ uri: item?.image }}
                  style={styles.imageComprovant}
                />
              </View>
            </View>
            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => {
                allowPlace();
                setModalVisible(!modalVisible);
              }}
            >
              {confirmPlace ? (
                <ActivityIndicator color={Colors.TEXT_SECONDARY} size={32} />
              ) : (
                <Text style={styles.bookingButtonText}>Liberar quadra</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </Modal>
    </ScrollView>
  );
};
export default Home;
