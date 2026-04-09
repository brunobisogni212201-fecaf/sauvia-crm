import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#006b2c",
        tabBarInactiveTintColor: "#3f6b62",
        tabBarStyle: { backgroundColor: "#e4fff9" },
      }}
    >
      <Tabs.Screen name="dashboard" options={{ title: "Dashboard" }} />
      <Tabs.Screen name="patients" options={{ title: "Pacientes" }} />
      <Tabs.Screen name="appointments" options={{ title: "Consultas" }} />
      <Tabs.Screen name="profile" options={{ title: "Perfil" }} />
    </Tabs>
  );
}
