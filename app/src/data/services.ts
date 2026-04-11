import { Service } from '../types';

export const MOCK_SERVICES: Service[] = [
  {
    id: 'svc-001',
    name: '初次諮詢',
    durationMinutes: 30,
    description: '免費初次諮詢,了解您的需求。',
  },
  {
    id: 'svc-002',
    name: '標準服務',
    durationMinutes: 60,
    description: '完整的 1 小時服務項目。',
  },
  {
    id: 'svc-003',
    name: '深度諮詢',
    durationMinutes: 90,
    description: '針對特殊需求提供深度諮詢與規劃。',
  },
  {
    id: 'svc-004',
    name: '後續追蹤',
    durationMinutes: 30,
    description: '定期追蹤與進度回顧。',
  },
];

export const AVAILABLE_TIME_SLOTS = [
  '09:00-10:00',
  '10:00-11:00',
  '11:00-12:00',
  '13:00-14:00',
  '14:00-15:00',
  '15:00-16:00',
  '16:00-17:00',
  '17:00-18:00',
];
