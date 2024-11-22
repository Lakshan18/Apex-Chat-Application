import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { View, StyleSheet, Text, ImageBackground, Image, TextInput, Button, Pressable, ScrollView, Alert, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const Login = ({ navigation }) => {

    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const storeData = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.log("Error storing data", error);
        }
    };

    const handleLogin = async () => {
        const loginDetails = {
            mobile: mobile,
            password: password,
        };

        try {
            const response = await fetch("http://10.0.2.2:8080/Apex_Chat/User_Login", {
                method: "POST",
                body: JSON.stringify(loginDetails),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const jsonObject = await response.json();
                console.log(jsonObject);

                if (jsonObject.success) {
                    setIsLoading(true);

                    let userID = JSON.stringify(jsonObject.userId);
                    console.log(userID);
                    await storeData('userMobile', mobile);
                    await storeData('userID', userID);

                    // testing....
                    console.log(mobile);
                    console.log(JSON.stringify(jsonObject.userId));

                    setTimeout(() => {
                        setIsLoading(false);
                        if (!isLoading) {
                            navigation.replace('Home');
                        }
                    }, 5000);

                } else if (jsonObject.message === "info") {
                    await storeData('userMobile', mobile);
                    await storeData('userID', JSON.stringify(jsonObject.userId));

                    // testing....
                    console.log(mobile);
                    console.log(JSON.stringify(jsonObject.userId));

                    navigation.replace('ProfileImgSet', {
                        mobile: mobile,
                    });
                } else {
                    Alert.alert("Warning", jsonObject.message);
                }
            }
        } catch (error) {
            console.log("Login error:", error);
        }
    };

    return (
        <>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ width: '100%', height: '100%' }}>
                    <LinearGradient
                        colors={['#3A464E', '#5E707D', '#3D4C56', '#283C4A']}
                        style={{ flexGrow: 1 }}
                    >
                        <ScrollView
                            contentContainerStyle={{ flexGrow: 1 }}
                            scrollEnabled={true}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            horizontal={false}
                        >

                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <View style={{ width: 100, height: 100, objectFit: 'cover' }}>
                                    <Image source={require('../assets/images/chat-icon.png')} style={{ width: '100%', height: '100%' }} />
                                </View>
                            </View>
                            <View style={styles.mainContainer1}>
                                <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <Text style={{ color: '#BEE0F9', fontSize: 40, fontFamily: 'Roboto', fontWeight: 'bold' }}>Welcome</Text>
                                    <Text style={{ color: '#BEE0F9', fontSize: 40, fontFamily: 'Roboto', fontWeight: 'bold' }}>Back</Text>
                                    <Text style={{ color: '#F6F6F6', fontSize: 20, fontFamily: 'Inter', fontWeight: 'light', marginTop: 6, marginBottom: 40 }}>Sign in to continue</Text>
                                </View>
                                <View style={styles.fieldContainer1}>
                                    <TextInput style={styles.fieldView1} placeholderTextColor={'#fff'} placeholder="Mobile Number" inputMode="text" value={mobile} onChangeText={setMobile} />
                                    <TextInput style={styles.fieldView1} placeholderTextColor={'#fff'} placeholder="Password" secureTextEntry={true} maxLength={15} value={password} onChangeText={setPassword} />
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <Text style={{ color: '#3FB8FC', textAlign: 'right', fontSize: 16, fontFamily: 'Roboto', fontWeight: 'light', marginVertical: 38 }}>Forgot Password?</Text>
                                </View>
                                <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: '10%' }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                        <Text style={{ color: '#ACD3E9', textAlign: 'center', fontSize: 18, fontFamily: 'Inter', fontWeight: '600', marginVertical: 24 }}>Create new account?
                                            <Text style={{ color: '#32A6FB', fontWeight: 'bold' }} onPress={() => {
                                                navigation.replace('SignUp');
                                            }}> Sign Up</Text>
                                        </Text>
                                    </View>
                                    <Pressable style={{
                                        width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom: 30,
                                        paddingVertical: 13, backgroundColor: '#3C81E8', borderRadius: 8, flexDirection: 'row', justifyContent: 'center'
                                    }}
                                        onPress={handleLogin}
                                    >
                                        {
                                            isLoading ?
                                                <ActivityIndicator size="large" color="#DEDEDE" />
                                                :
                                                <Text style={{ color: 'white', fontSize: 18, fontWeight: '800', fontFamily: 'Inter' }}>Log In</Text>
                                        }
                                    </Pressable>
                                </View>
                            </View>
                        </ScrollView>

                    </LinearGradient>
                </View>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    bgImg1: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    mainContainer1: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 17,
        marginTop: 60,
    },
    fieldContainer1: {
        width: '100%',
        height: 'auto',
        flexDirection: 'column',
        alignItems: 'center',
        rowGap: 10,
        marginTop: 5,
    },
    fieldView1: {
        width: '100%',
        paddingVertical: 13,
        paddingHorizontal: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        fontSize: 17,
        color: '#fff',
        borderRadius: 8,
        fontFamily: 'Quicksand',
    },
});
