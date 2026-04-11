import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Booking, BookingStatus, SOP, Service } from '../types';
import { MOCK_SOPS } from '../data/sops';
import { MOCK_SERVICES } from '../data/services';

const BOOKINGS_KEY = '@linghsin/bookings';

type AppDataContextValue = {
  sops: SOP[];
  services: Service[];
  bookings: Booking[];
  addBooking: (b: Omit<Booking, 'id' | 'createdAt' | 'status'>) => Promise<Booking>;
  updateBookingStatus: (id: string, status: BookingStatus) => Promise<void>;
  cancelBooking: (id: string) => Promise<void>;
  getBookingsByDate: (date: string) => Booking[];
};

const AppDataContext = createContext<AppDataContextValue | null>(null);

export const AppDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(BOOKINGS_KEY);
        if (raw) setBookings(JSON.parse(raw));
      } catch (e) {
        console.warn('Failed to load bookings', e);
      }
    })();
  }, []);

  const persist = useCallback(async (next: Booking[]) => {
    setBookings(next);
    try {
      await AsyncStorage.setItem(BOOKINGS_KEY, JSON.stringify(next));
    } catch (e) {
      console.warn('Failed to save bookings', e);
    }
  }, []);

  const addBooking = useCallback<AppDataContextValue['addBooking']>(
    async (b) => {
      const newBooking: Booking = {
        ...b,
        id: `bk-${Date.now()}`,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      };
      await persist([...bookings, newBooking]);
      return newBooking;
    },
    [bookings, persist],
  );

  const updateBookingStatus = useCallback<AppDataContextValue['updateBookingStatus']>(
    async (id, status) => {
      const next = bookings.map((b) => (b.id === id ? { ...b, status } : b));
      await persist(next);
    },
    [bookings, persist],
  );

  const cancelBooking = useCallback<AppDataContextValue['cancelBooking']>(
    async (id) => {
      const next = bookings.map((b) => (b.id === id ? { ...b, status: 'cancelled' as BookingStatus } : b));
      await persist(next);
    },
    [bookings, persist],
  );

  const getBookingsByDate = useCallback(
    (date: string) => bookings.filter((b) => b.date === date && b.status !== 'cancelled'),
    [bookings],
  );

  const value = useMemo<AppDataContextValue>(
    () => ({
      sops: MOCK_SOPS,
      services: MOCK_SERVICES,
      bookings,
      addBooking,
      updateBookingStatus,
      cancelBooking,
      getBookingsByDate,
    }),
    [bookings, addBooking, updateBookingStatus, cancelBooking, getBookingsByDate],
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
};

export const useAppData = () => {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error('useAppData must be used inside AppDataProvider');
  return ctx;
};
