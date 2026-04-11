# linghsin-rules App

Expo React Native 專案,可在 iOS 與 Android 上執行。

## 環境需求

- Node.js 18+ LTS
- npm 或 yarn
- 手機安裝 **Expo Go** App(開發時測試用)

## 安裝與啟動

```bash
npm install
npx expo start
```

掃描 QR Code 即可在手機上執行。

## 指令

- `npm start` — 啟動 Expo Dev Server
- `npm run ios` — 在 iOS 模擬器啟動(macOS 需先安裝 Xcode)
- `npm run android` — 在 Android 模擬器啟動
- `npm run web` — 在瀏覽器執行(快速檢查用)
- `npm run typecheck` — TypeScript 型別檢查

## 資料夾

```
src/
├── navigation/   導覽 (Tab + Stack)
├── screens/      所有畫面元件
├── store/        全域狀態 (React Context + AsyncStorage)
├── data/         Mock SOP / Service 資料
├── types/        TypeScript 型別
└── theme/        色彩與間距
```

## 重要檔案

- `App.tsx` — App 入口,注入 Provider 與 NavigationContainer
- `src/navigation/RootNavigator.tsx` — 底部 Tab + 每個 Tab 的 Stack
- `src/store/AppDataContext.tsx` — 全域資料與 AsyncStorage 持久化

## 技術棧

- React Native 0.74 / Expo SDK 51
- TypeScript
- React Navigation 6 (Bottom Tab + Native Stack)
- react-native-calendars(月曆元件)
- dayjs(日期處理)
- @react-native-async-storage/async-storage(本機儲存)

## 未來擴充建議

1. **Firebase 整合**:將 `AppDataContext` 內的 AsyncStorage 換成 Firestore。
2. **使用者登入**:加入 Firebase Auth,在進入 App 前顯示登入畫面。
3. **推播通知**:使用 `expo-notifications` 在預約前 1 小時提醒。
4. **管理員後台**:另建一個 Next.js Web 專案,共用 Firestore 資料。
