import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

const TabsLayout = () => {
  return (
    <>
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#edf11aff",
                tabBarStyle: {
                    backgroundColor: "#13181eff",
                },

                headerShadowVisible: false,
                headerTintColor: "#fff",
                headerStyle: {
                    backgroundColor: "#13181eff"
                },
            }}
        >
        <Tabs.Screen name="index" options={{
            headerTitle: "Home",
            tabBarIcon: ({focused, color}) => (
                <Ionicons name={focused? "home-sharp" : "home-outline"} color={color} size={24}/>
            )
        }}/>

        <Tabs.Screen name="about" options={{
            title: "About Us",
            tabBarIcon: ({focused, color}) => (
                <Ionicons name={focused? "information-circle-sharp" : "information-circle-outline"} color={color} size={24}/>
            )
        }}/>        
        </Tabs>
    </>
  )
}

export default TabsLayout;
