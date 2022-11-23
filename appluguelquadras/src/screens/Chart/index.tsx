import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { View, Text, useColorScheme, ScrollView, Image } from "react-native";

import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryPie,
} from "victory-native";
import { firestoreInstance } from "../../config/firebase";
import useAuthContext from "../../hooks/useAuthContext";
import { Picker } from "@react-native-picker/picker";

import styles from "./styles";
import stylesDark from "./stylesDark";
import { Colors } from "../../constants/colors";
import "../../utils/i18n/i18n";
import { useTranslation } from "react-i18next";

const Chart: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuthContext();
  const theme = useColorScheme();
  const [places, setPlaces] = useState([]);
  const [monthState, setMonth] = useState("");
  const [betterAndWorst, setBetterAndWorst] = useState([]);

  const months = [
    { value: "janeiro" },
    { value: "fevereiro" },
    { value: "março" },
    { value: "abril" },
    { value: "maio" },
    { value: "junho" },
    { value: "julho" },
    { value: "agosto" },
    { value: "setembro" },
    { value: "outubro" },
    { value: "novembro" },
    { value: "dezembro" },
  ];

  const filterByMonth = () => {
    const allPlaces = query(collection(firestoreInstance, "places"));
    const listner = onSnapshot(allPlaces, (snapshot) => {
      let placesFiltered = [];

      snapshot.forEach((doc) => {
        if (user?.id === doc.data().user) {
          let filterPlacesByMonth = doc
            .data()
            .rating.filter(({ month }) => month === monthState);

          let sum = filterPlacesByMonth.reduce((soma, record) => {
            return soma + record.rate;
          }, 0);

          placesFiltered.push({
            name: doc.data().name,
            sum: sum === 0 ? 0 : sum / filterPlacesByMonth.length,
          });
        }
      });

      placesFiltered.sort((a, b) => parseFloat(b.sum) - parseFloat(a.sum));
      let array = [];
      array.push(
        { name: placesFiltered[0].name, sum: placesFiltered[0].sum },
        {
          name: placesFiltered[placesFiltered.length - 1].name,
          sum: placesFiltered[placesFiltered.length - 1].sum,
        }
      );
      setBetterAndWorst(array);
    });

    return listner;
  };

  useEffect(() => {
    user?.type === "LOCATOR" && filterByMonth();
  }, [monthState]);

  const getPlaces = async () => {
    try {
      const allPlaces = query(collection(firestoreInstance, "places"));
      const listner = onSnapshot(allPlaces, (snapshot) => {
        let placesFirebase = [];

        snapshot.forEach((doc) => {
          if (user?.id === doc.data().user) {
            let sum = doc.data().rating.reduce((accumulator: number, item) => {
              return accumulator + item.rate;
            }, 0);
            placesFirebase.push({
              name: doc.data().name,
              sum: sum === 0 ? 0 : sum / doc.data().rating.length,
            });
          }
        });

        setPlaces(placesFirebase);
      });

      return listner;
    } catch (error: any) {
      console.log("Error get places: ", error);
    }
  };

  useEffect(() => {
    getPlaces();
  }, []);

  return (
    <>
      {user?.type === "LOCATOR" ? (
        <ScrollView>
          <View
            style={theme === "light" ? styles.container : stylesDark.container}
          >
            <View style={styles.marginVertical}>
              <Text
                style={
                  theme === "light" ? styles.textChart : stylesDark.textChart
                }
              >
                {t("CHART.TITLE")}
              </Text>
              <VictoryPie
                style={{
                  labels: { fill: Colors.PRIMARY, fontSize: 16 },
                }}
                colorScale={["navy", "tomato", "orange", "gold", "cyan"]}
                x="name"
                y="sum"
                data={places}
              />
            </View>
            <View style={styles.marginVertical}>
              <Text
                style={
                  theme === "light"
                    ? styles.textBetterAndWorst
                    : stylesDark.textBetterAndWorst
                }
              >
                {t("CHART.BETTER_WORST")}
              </Text>
              <Text
                style={
                  theme === "light"
                    ? styles.textBetterAndWorst
                    : stylesDark.textBetterAndWorst
                }
              >
                {t("CHART.BY_MONTH")}
              </Text>
              <Picker
                style={theme === "light" ? styles.picker : stylesDark.picker}
                selectedValue={monthState}
                onValueChange={(itemValue) => setMonth(itemValue)}
              >
                <Picker.Item label={t("CHART.MONTH")} value="" />
                {months.map((mes) => (
                  <Picker.Item label={mes.value} value={mes.value} />
                ))}
              </Picker>
              <View>
                <VictoryChart
                  theme={VictoryTheme.material}
                  domainPadding={{ x: 30 }}
                >
                  <VictoryBar
                    animate={{
                      duration: 2000,
                      onLoad: { duration: 1000 },
                    }}
                    style={{ data: { fill: "#c43a31" } }}
                    data={betterAndWorst}
                    x="name"
                    y="sum"
                  />
                </VictoryChart>
              </View>
            </View>
          </View>
        </ScrollView>
      ) : (
        <View
          style={
            theme === "light" ? styles.viewUserBasic : stylesDark.viewUserBasic
          }
        >
          <Text
            style={
              theme === "light"
                ? styles.textUserBasic
                : stylesDark.textUserBasic
            }
          >
            {t("CHART.NOT_LOCATOR")}
          </Text>
          <Image
            source={require("../../../assets/messi.jpg")}
            style={styles.image}
          />
        </View>
      )}
    </>
  );
};

export default Chart;
