import { NavigatorScreenParams } from '@react-navigation/native';

export type SOPStackParamList = {
  SOPList: undefined;
  SOPDetail: { sopId: string };
};

export type BookingStackParamList = {
  BookingServices: undefined;
  BookingDateTime: { serviceId: string };
  BookingConfirm: { serviceId: string; date: string; timeSlot: string };
};

export type CalendarStackParamList = {
  CalendarMonth: undefined;
  BookingDetail: { bookingId: string };
};

export type RootTabParamList = {
  Home: undefined;
  SOP: NavigatorScreenParams<SOPStackParamList>;
  Booking: NavigatorScreenParams<BookingStackParamList>;
  Calendar: NavigatorScreenParams<CalendarStackParamList>;
  Profile: undefined;
};
