import React from "react";
import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: "#c300ffff",
      }}
    >
      <Tabs.Screen
        name="books"
        options={{
          title: "Livros",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="menu-book" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cds"
        options={{
          title: "CDs",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="album" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

