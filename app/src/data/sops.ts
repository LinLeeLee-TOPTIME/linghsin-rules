import { SOP } from '../types';

export const MOCK_SOPS: SOP[] = [
  {
    id: 'sop-001',
    category: '客戶接待',
    title: '新客戶接待流程',
    summary: '第一次來店的客戶標準接待方式,包含歡迎、需求了解與流程說明。',
    tags: ['接待', '新客戶'],
    updatedAt: '2026-03-20',
    steps: [
      {
        order: 1,
        title: '主動問候',
        description: '客戶進門 3 秒內主動以微笑問候,並確認是否為預約客戶。',
        note: '語氣親切、保持眼神接觸。',
      },
      {
        order: 2,
        title: '登記資料',
        description: '引導至接待區,協助填寫或確認基本資料。',
      },
      {
        order: 3,
        title: '需求了解',
        description: '以開放性問題了解客戶來訪目的與期望。',
      },
      {
        order: 4,
        title: '流程說明',
        description: '簡短說明今日服務流程、預計時間與注意事項。',
      },
    ],
  },
  {
    id: 'sop-002',
    category: '設備操作',
    title: 'POS 機開機與結帳',
    summary: 'POS 收銀系統每日開機、結帳、關機的標準流程。',
    tags: ['POS', '收銀'],
    updatedAt: '2026-02-11',
    steps: [
      {
        order: 1,
        title: '開機檢查',
        description: '開啟主機電源、確認網路與發票機連線正常。',
      },
      {
        order: 2,
        title: '零用金清點',
        description: '清點抽屜零用金,核對與昨日結帳紀錄一致。',
        note: '若有差額立即通報店長。',
      },
      {
        order: 3,
        title: '結帳操作',
        description: '結帳時確認金額、選擇付款方式、列印發票。',
      },
    ],
  },
  {
    id: 'sop-003',
    category: '安全規範',
    title: '緊急疏散程序',
    summary: '發生火警或地震時的標準疏散作業流程。',
    tags: ['安全', '緊急'],
    updatedAt: '2026-01-05',
    steps: [
      {
        order: 1,
        title: '確認狀況',
        description: '保持冷靜,確認事件類型與危險等級。',
      },
      {
        order: 2,
        title: '通報',
        description: '撥打 119 通報,並通知店長與同仁。',
      },
      {
        order: 3,
        title: '引導疏散',
        description: '引導現場人員依疏散路線前往集合點。',
        note: '絕對不可搭乘電梯。',
      },
      {
        order: 4,
        title: '人員清點',
        description: '到達集合點後進行人員清點,確認所有人員安全。',
      },
    ],
  },
  {
    id: 'sop-004',
    category: '預約管理',
    title: '電話預約處理',
    summary: '接聽客戶電話預約時的標準應對流程。',
    tags: ['預約', '電話'],
    updatedAt: '2026-03-01',
    steps: [
      {
        order: 1,
        title: '問候與自我介紹',
        description: '您好,這裡是 OO 店,敝姓 X,很高興為您服務。',
      },
      {
        order: 2,
        title: '確認預約資訊',
        description: '詢問姓名、聯絡方式、預約日期時段與服務項目。',
      },
      {
        order: 3,
        title: '複誦確認',
        description: '向客戶複誦所有預約資訊並取得確認。',
      },
      {
        order: 4,
        title: '結束通話',
        description: '感謝客戶、提醒注意事項後禮貌掛斷。',
      },
    ],
  },
];
