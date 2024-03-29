export type Days = {
  day: string;
  isRented: boolean;
  status: string;
  userId: string;
};

export type TimeType = {
  id?: string;
  initialTime: string;
  finalTime: string;
};

export type Rent = {
  placeId: string;
  image?: string;
  address: string;
  availableTimeId: string;
  day: Days;
  finalTime: string;
  hourValue: string;
  initialTime: string;
  name: string;
  locatorId: string;
  reserveId?: string;
  imageUrl?: string;
  availableTime?: any;
};

export type Rating = {
  userId: string;
  rate: number;
  month: string;
};
