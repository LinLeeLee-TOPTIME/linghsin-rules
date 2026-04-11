# linghsin-rules

一款跨平台（iOS + Android）行動 App 專案,用於管理 **SOP 規範流程**、**預約**
與 **行事曆行程**,讓使用者可以瀏覽作業標準流程並進行線上預約。

## 專案結構

```
linghsin-rules/
├── README.md                     # 本檔
├── docs/
│   ├── 需求分析與架構設計.md        # 需求、資訊架構、資料模型、里程碑
│   └── 技術選型說明.md              # 給非技術背景的技術說明
└── app/                           # Expo React Native App 專案
    ├── App.tsx                    # App 入口
    ├── app.json                   # Expo 設定
    ├── package.json               # 相依套件
    └── src/
        ├── navigation/            # 導覽架構 (Tab + Stack)
        ├── screens/               # 所有畫面
        ├── store/                 # 全域狀態 (Context + AsyncStorage)
        ├── data/                  # Mock 資料 (SOP / Services)
        ├── types/                 # TypeScript 型別
        └── theme/                 # 色彩與間距
```

## 快速開始

請先閱讀 [`docs/技術選型說明.md`](./docs/技術選型說明.md) 了解所需環境。

```bash
cd app
npm install
npx expo start
```

出現 QR Code 後,使用手機上的 **Expo Go** App 掃描即可在 iOS 或 Android 上執行。

## 主要功能 (MVP)

- 🏠 **首頁**:今日行程、快速預約、SOP 精選
- 📋 **SOP**:分類瀏覽、關鍵字搜尋、步驟詳情
- 📝 **預約**:選擇服務 → 選擇日期時段 → 備註 → 送出
- 📅 **行事曆**:月曆視圖、每日行程、取消預約
- 👤 **個人**:預約統計、設定入口

## 下一步規劃

詳見 [`docs/需求分析與架構設計.md`](./docs/需求分析與架構設計.md) 的里程碑章節。

- M2:資料持久化至雲端 (Firebase Firestore)
- M3:使用者登入 (Firebase Auth)
- M4:管理員 Web 後台
