import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, TouchableOpacity } from 'react-native';
import AddNewContactView from '../views/AddNewContactView';
import ContactListView from '../views/ContactListView';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Tab = createBottomTabNavigator();

export function Routers() {
    return (
        <Tab.Navigator tabBar={props => <MyTabBar {...props} />} defaultScreenOptions={{
            tabBarActiveBackgroundColor: Colors.green,
            tabBarInactiveBackgroundColor: Colors.gray
        }}>
            <Tab.Screen name="Contact List" component={ContactListView} />
            <Tab.Screen name="Add New Contact" component={AddNewContactView}/>
        </Tab.Navigator>
    );
}

function MyTabBar({ state, descriptors, navigation }) {
    return (
        <View style={{ flexDirection: 'row' }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;
                const icon = route.name === "Contact List" ? "home" : "plus" ;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        // The `merge: true` option makes sure that the params inside the tab screen are preserved
                        navigation.navigate({ name: route.name, merge: true });
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{ flex: 1, alignItems: "center", justifyContent: "center", height: 50, backgroundColor: isFocused ? "gray" : "white" }}
                    >
                        <FontAwesome5 name={icon} color={isFocused ? "white" : "black"} solid/>
                        <Text style={{ color: isFocused ? 'white' : '#222' }}>
                            {label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}
