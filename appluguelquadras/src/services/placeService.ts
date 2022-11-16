import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { Rating, Rent, TimeType } from "../@types";
import { firestoreInstance } from "../config/firebase";
import useAuthContext from "../hooks/useAuthContext";
import { PlaceDetailProps } from "../screens/PlaceDetails";
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

export const allowPlaceUpdate = async (item: Rent) => {
  try {
    const query = await getDoc(doc(firestoreInstance, "places", item?.placeId));
    const reserve = await getDoc(
      doc(firestoreInstance, "reserves", item?.reserveId)
    );
    const data = query.data() as PlaceDetailProps;
    const reserveData = reserve.data();
    const { day } = reserveData;
    const newDay = {
      ...day,
      status: "APROVADO",
    };

    const newReserve = {
      ...reserveData,
      day: newDay,
    };

    const [days] = data.availableTimes;
    const novosDias = days.days.map((newDay) => {
      if (newDay.day === item?.day.day) {
        return {
          ...newDay,
          isRented: true,
          userId: item.day.userId,
          status: "APROVADO",
        };
      }
      return newDay;
    });

    const novoAvailableTimes = data.availableTimes.map((teste) => {
      if (teste.id === item?.availableTimeId) {
        return {
          ...teste,
          days: novosDias,
        };
      }
      return teste;
    });

    const placeUpdated: PlaceDetailProps = {
      ...data,
      availableTimes: novoAvailableTimes,
    };
    await updateDoc(
      doc(firestoreInstance, "places", item?.placeId),
      placeUpdated
    );
    await updateDoc(
      doc(firestoreInstance, "reserves", item?.reserveId),
      newReserve
    );
  } catch (error: any) {
    console.log("Error allow place: ", error);
  }
};

export const handleReserve = async (
  day: string,
  schedule: string,
  user: any,
  placeId: any,
  placeData: PlaceDetailProps
) => {
  try {
    if (!user.reserve) {
      const reserve: Reserve = {
        place: placeId,
        day: day,
        scheduleId: schedule,
      };

      const userUpdated = {
        ...user,
        reserve: [reserve],
      };

      const [days] = placeData.availableTimes;
      const novosDias = days.days.map((newDay) => {
        if (newDay.day === day) {
          return {
            ...newDay,
            isRented: true,
            userId: user?.id,
            status: "PENDENTE",
          };
        }
        return newDay;
      });

      const newAvailableTimes = placeData.availableTimes.map((time) => {
        if (time.id === schedule) {
          return {
            ...time,
            days: novosDias,
          };
        }
        return time;
      });

      const placeUpdated: PlaceDetailProps = {
        ...placeData,
        availableTimes: newAvailableTimes,
      };
      await updateDoc(doc(firestoreInstance, "places", placeId), placeUpdated);
      await updateDoc(doc(firestoreInstance, "users", user.id), userUpdated);

      return userUpdated;
    } else {
      const reserve = {
        place: placeId,
        day: day,
        scheduleId: schedule,
      };

      const newReserves = user.reserve;
      newReserves.push(reserve);

      const userUpdated = {
        ...user,
        reserve: newReserves,
      };

      const [days] = placeData.availableTimes;
      const novosDias = days.days.map((newDay) => {
        if (newDay.day === day) {
          return {
            ...newDay,
            isRented: true,
            userId: user.id,
            status: "PENDENTE",
          };
        }
        return newDay;
      });

      const newAvailableTimes = placeData.availableTimes.map((time) => {
        if (time.id === schedule) {
          return {
            ...time,
            days: novosDias,
          };
        }
        return time;
      });

      const placeUpdated: PlaceDetailProps = {
        ...placeData,
        availableTimes: newAvailableTimes,
      };
      await updateDoc(doc(firestoreInstance, "places", placeId), placeUpdated);
      await updateDoc(doc(firestoreInstance, "users", user.id), userUpdated);

      return userUpdated;
    }
  } catch (error: any) {
    console.log("Error handle reserve: ", error);
  }
};

export const sendAvaliation = async (item: Rent, myRate: number) => {
  try {
    const query = await getDoc(doc(firestoreInstance, "places", item?.placeId));

    const data = query.data() as PlaceDetailProps;

    const newRate = data.rating;
    newRate.push({
      rate: myRate,
      userId: item?.day.userId,
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
