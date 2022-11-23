import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { Rating, Rent, TimeType } from "../@types";
import { firestoreInstance } from "../config/firebase";
import useAuthContext from "../hooks/useAuthContext";
import { PlaceDetailProps } from "../screens/PlaceDetails";
import { generateUuid } from "../utils/generateUuid";
import { getMonth } from "../utils/getMonth";
import { Reserve } from "./userService";

export const addPlace = async (
  image: any,
  name: string,
  address: string,
  hourValue: string,
  availableTimes: TimeType[],
  user: any,
  getImageURL: string
) => {
  try {
    const rating: Rating[] = [];
    const newPlace = {
      user: user.id,
      name,
      address,
      hourValue,
      availableTimes,
      rating,
      imageUrl: image !== null ? getImageURL : "",
    };
    await addDoc(collection(firestoreInstance, "places"), newPlace);
  } catch (error) {
    console.log(error);
  }
};

export const deletePlace = async (placeId: any) => {
  try {
    await deleteDoc(doc(firestoreInstance, "places", placeId));
  } catch (error: any) {
    console.log("Error delete place: ", error);
  }
};

export const allowPlaceUpdate = async (item: any) => {
  try {
    const reserve = await getDoc(
      doc(firestoreInstance, "reserves", item?.reserveId)
    );
    const reserveData = {
      ...reserve.data(),
      status: "APROVADO",
    };

    await updateDoc(
      doc(firestoreInstance, "reserves", item?.reserveId),
      reserveData
    );
  } catch (error: any) {
    console.log("Error allow place: ", error);
  }
};

export const handleReserve = async (
  schedule: string,
  user: any,
  placeId: any,
  placeData: any,
  dayOfWeek: string,
  selectedTime: any
) => {
  try {
    const uuid = generateUuid();
    const reserve: any = {
      schedule,
      user,
      placeId,
      selectedTime,
      dayOfWeek,
      reserveId: uuid,
    };

    await setDoc(doc(firestoreInstance, "reserves", uuid), {
      ...reserve,
      status: "PENDENTE",
      address: placeData.address,
      name: placeData.name,
      imageUrl: placeData.imageUrl,
      locatorId: placeData.user,
    });
  } catch (error: any) {
    console.log("Error handle reserve");
  }
};

export const sendAvaliation = async (item: any, myRate: number) => {
  try {
    const query = await getDoc(doc(firestoreInstance, "places", item?.placeId));

    const data = query.data() as PlaceDetailProps;

    const newRate = data.rating;
    newRate.push({
      rate: myRate,
      userId: item?.user.id,
      month: getMonth(new Date().getMonth()),
    });

    const placeUpdated: PlaceDetailProps = {
      ...data,
      rating: newRate,
    };

    await updateDoc(
      doc(firestoreInstance, "places", item?.placeId),
      placeUpdated
    );
  } catch (error: any) {
    console.log("Error set rate: ", error);
  }
};

export const getRateService = async (item: Rent) => {
  try {
    const query = await getDoc(doc(firestoreInstance, "places", item?.placeId));

    return query.data() as PlaceDetailProps;
  } catch (error: any) {
    console.log("Error get rate service");
  }
};
