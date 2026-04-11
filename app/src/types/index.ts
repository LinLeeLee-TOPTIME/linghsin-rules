export type SOPStep = {
  order: number;
  title: string;
  description: string;
  note?: string;
};

export type SOP = {
  id: string;
  category: string;
  title: string;
  summary: string;
  steps: SOPStep[];
  tags: string[];
  updatedAt: string;
};

export type Service = {
  id: string;
  name: string;
  durationMinutes: number;
  description: string;
};

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export type Booking = {
  id: string;
  serviceId: string;
  serviceName: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "14:00-15:00"
  status: BookingStatus;
  note?: string;
  createdAt: string;
};
