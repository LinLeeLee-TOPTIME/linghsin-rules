import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  BookingStackParamList,
  CalendarStackParamList,
  RootTabParamList,
  SOPStackParamList,
} from './types';
import { colors } from '../theme/colors';

import HomeScreen from '../screens/HomeScreen';
import SOPListScreen from '../screens/SOPListScreen';
import SOPDetailScreen from '../screens/SOPDetailScreen';
import BookingServicesScreen from '../screens/BookingServicesScreen';
import BookingDateTimeScreen from '../screens/BookingDateTimeScreen';
import BookingConfirmScreen from '../screens/BookingConfirmScreen';
import CalendarScreen from '../screens/CalendarScreen';
import BookingDetailScreen from '../screens/BookingDetailScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator<RootTabParamList>();
const SOPStack = createNativeStackNavigator<SOPStackParamList>();
const BookingStack = createNativeStackNavigator<BookingStackParamList>();
const CalendarStack = createNativeStackNavigator<CalendarStackParamList>();

const stackScreenOptions = {
  headerStyle: { backgroundColor: colors.primary },
  headerTintColor: '#ffffff',
  headerTitleStyle: { fontWeight: '600' as const },
};

function SOPStackNavigator() {
  return (
    <SOPStack.Navigator screenOptions={stackScreenOptions}>
      <SOPStack.Screen name="SOPList" component={SOPListScreen} options={{ title: 'SOP 規範' }} />
      <SOPStack.Screen name="SOPDetail" component={SOPDetailScreen} options={{ title: 'SOP 詳情' }} />
    </SOPStack.Navigator>
  );
}

function BookingStackNavigator() {
  return (
    <BookingStack.Navigator screenOptions={stackScreenOptions}>
      <BookingStack.Screen
        name="BookingServices"
        component={BookingServicesScreen}
        options={{ title: '選擇服務' }}
      />
      <BookingStack.Screen
        name="BookingDateTime"
        component={BookingDateTimeScreen}
        options={{ title: '選擇日期時段' }}
      />
      <BookingStack.Screen
        name="BookingConfirm"
        component={BookingConfirmScreen}
        options={{ title: '確認預約' }}
      />
    </BookingStack.Navigator>
  );
}

function CalendarStackNavigator() {
  return (
    <CalendarStack.Navigator screenOptions={stackScreenOptions}>
      <CalendarStack.Screen
        name="CalendarMonth"
        component={CalendarScreen}
        options={{ title: '我的行事曆' }}
      />
      <CalendarStack.Screen
        name="BookingDetail"
        component={BookingDetailScreen}
        options={{ title: '預約詳情' }}
      />
    </CalendarStack.Navigator>
  );
}

const TabIcon = ({ label, focused }: { label: string; focused: boolean }) => (
  <Text style={{ fontSize: 18, opacity: focused ? 1 : 0.5 }}>{label}</Text>
);

export default function RootNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: '#ffffff',
        headerTitleStyle: { fontWeight: '600' },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: '首頁',
          tabBarIcon: ({ focused }) => <TabIcon label="🏠" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="SOP"
        component={SOPStackNavigator}
        options={{
          title: 'SOP',
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon label="📋" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Booking"
        component={BookingStackNavigator}
        options={{
          title: '預約',
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon label="📝" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarStackNavigator}
        options={{
          title: '行事曆',
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon label="📅" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: '個人',
          tabBarIcon: ({ focused }) => <TabIcon label="👤" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}
