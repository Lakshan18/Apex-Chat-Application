import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Alert, Image, Pressable, StyleSheet, TextInput } from "react-native";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FooterSection } from "../components/FooterSection";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const StartChat = () => {

    const navigation = useNavigation();

    const [usersData, setUsersData] = useState([]);

    useEffect(() => {
        setInterval(() => {
            fetchAllUsers();
        }, 1500);

    }, []);

    const fetchAllUsers = async () => {

        let user_id = await AsyncStorage.getItem('userID');

        const response = await fetch("http://10.0.2.2:8080/Apex_Chat/LoadAllUsers?uid=" + user_id);

        if (response.ok) {

            const userArray = await response.json();

            if (userArray.success) {
                setUsersData(userArray.otherUsers);
            } else {

            }
        }
    }

    const limitText = (text, limit) => {
        return text.length > limit ? text.substring(0, limit) + '...' : text;
    }

    const openChat = (f_id, contact, p_Img, isFriend) => {
        navigation.navigate('MainChat', { f_id, contact, p_Img, isFriend });
    }

    return (

        <>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <LinearGradient
                        colors={[
                            '#3A464E',
                            '#5E707D',
                            '#3D4C56',
                            '#283C4A',
                        ]}
                        style={{ flexGrow: 1 }}
                    >
                        <View style={{ flex: 1 }}>
                            <View style={{ flex: 1, paddingHorizontal: 15, paddingTop: 20, }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: 20, fontFamily: 'Inter', color: '#fff', fontWeight: '200' }}>Start New Chat</Text>
                                    <MaterialIcons name="chat" size={24} color="#fff" />
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20, }}>
                                    <TextInput style={styles.input1}
                                        placeholder="search for peoples..."
                                    />
                                    <EvilIcons name="search" size={30} color="#9E9E9E" style={{ position: 'absolute', paddingHorizontal: 10, }} />
                                </View>
                            </View>
                            <View style={{ flex: 5 }}>
                                <View style={{ width: '100%', height: '100%', flexDirection: 'column', paddingHorizontal: 15, paddingTop: 10, }}>

                                    {usersData.map((user) => (
                                        <Pressable style={styles.msgContent1} key={user.id}
                                            onPress={
                                                () => openChat(user.id, user.contact, user.p_image, user.isFriend)
                                            }
                                        >
                                            <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 16, }}>
                                                <View style={styles.profileIMG1}>
                                                    {
                                                        user.p_image === 'unable' ? (
                                                            <Image source={require('../assets/images/user.png')} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 100 }} />
                                                        ) : (
                                                            <Image source={{ uri: user.p_image }} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 100 }} />
                                                        )
                                                    }
                                                </View>
                                                <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                                                    {
                                                        user.isFriend ? (
                                                            <Text style={{ fontSize: 17, fontFamily: "Inter", fontWeight: '600', color: '#fff' }}>{user.contact}</Text>
                                                        ) : (
                                                            <Text style={{ fontSize: 17, fontFamily: "Inter", fontWeight: '600', color: '#fff' }}>{user.contact}</Text>
                                                        )
                                                    }
                                                    <Text style={styles.smallText1}>{limitText("start chat now.....", 24)}</Text>
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignSelf: 'flex-end', paddingBottom: 3.4, }}>
                                                {/* <Text style={styles.smallText1}>{msg.time}</Text> */}
                                            </View>
                                        </Pressable>
                                    ))}


                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }}>
                                <FooterSection />
                            </View>
                        </View>
                    </LinearGradient>
                </View>
            </SafeAreaView>
        </>

    );

}

const styles = StyleSheet.create(
    {
        input1: {
            width: '100%',
            paddingVertical: 12,
            borderRadius: 10,
            backgroundColor: '#fff',
            fontSize: 15,
            fontFamily: 'Inter',
            textAlign: 'center',
            position: 'relative',
        },
        msgContent1: {
            width: '100%',
            height: 'auto',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 16,
            borderBottomColor: '#547D8A',
            borderBottomWidth: 1,
        },
        smallText1: {
            fontSize: 13,
            fontFamily: "Roboto",
            fontWeight: '400',
            color: '#CECECE',
            maxWidth: 200,
        },
        profileIMG1: {
            width: 50,
            height: 50,
            // backgroundColor: '#91C1E3',
            borderRadius: 100,
            borderWidth: 1,
            borderColor: '#839CAA',
        },
    }
);