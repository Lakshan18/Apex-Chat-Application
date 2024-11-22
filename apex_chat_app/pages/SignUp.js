import AsyncStorage from "@react-native-async-storage/async-storage";
import Checkbox from "expo-checkbox";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { ImageBackground, Text, View, StyleSheet, TextInput, Image, Pressable, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export const SignUp = ({ navigation }) => {

    const [isChecked, setChecked] = useState(false);

    // user get/set hooks...
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");



    return (
        <>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ width: '100%', height: '100%' }}>
                    <LinearGradient
                        colors={[
                            '#3A464E',
                            '#5E707D',
                            '#3D4C56',
                            '#283C4A',
                        ]}
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
                                    <Text style={styles.pageHeading1}>Welcome</Text>
                                    <Text style={styles.pageHeading1}>User</Text>
                                    <Text style={{ color: '#F6F6F6', fontSize: 20, fontFamily: 'Inter', fontWeight: 'light', marginTop: 6, marginBottom: 40 }}>Sign up to join</Text>
                                </View>
                                <View style={styles.fieldContainer1}>
                                    <TextInput style={styles.fieldView1} placeholderTextColor={'#DEDEDE'} placeholder="First Name" inputMode="text" value={first_name} onChangeText={setFirstName} />
                                    <TextInput style={styles.fieldView1} placeholderTextColor={'#DEDEDE'} placeholder="Last Name" inputMode="text" value={last_name} onChangeText={setLastName} />
                                    <TextInput style={styles.fieldView1} placeholderTextColor={'#DEDEDE'} placeholder="Mobile" inputMode="number" maxLength={10} value={mobile} onChangeText={setMobile} />
                                    <TextInput style={styles.fieldView1} placeholderTextColor={'#DEDEDE'} placeholder="Password" secureTextEntry={true} maxLength={15} value={password} onChangeText={setPassword} />
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Checkbox style={{ margin: 8 }} value={isChecked} onValueChange={setChecked} />
                                    <Text style={{ color: '#ACD3E9', textAlign: 'right', fontSize: 16, fontFamily: 'Inter', fontWeight: '600', marginVertical: 38 }}>agree to
                                        <Text style={{ color: '#3FB8FC', fontWeight: 'bold' }}> term & condition</Text>
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                        <Text style={{ color: '#ACD3E9', textAlign: 'center', fontSize: 18, fontFamily: 'Inter', fontWeight: '600', marginBottom: 24 }}>Have an account?
                                            <Text style={{ color: '#32A6FB', fontWeight: 'bold' }} onPress={() => {
                                                navigation.replace('Login');
                                            }}> Sign In</Text>
                                        </Text>
                                    </View>

                                    {isChecked ?
                                        <Pressable style={{
                                            width: '100%', paddingVertical: 13, backgroundColor: '#3C81E8',
                                            borderRadius: 8, flexDirection: 'row', marginBottom: 30, justifyContent: 'center'
                                        }}
                                            onPress={

                                                async () => {

                                                    const userDetails = {
                                                        first_name: first_name,
                                                        last_name: last_name,
                                                        mobile: mobile,
                                                        password: password,
                                                    }

                                                    const response = await fetch("http://10.0.2.2:8080/Apex_Chat/User_Registration",
                                                        {
                                                            method: "POST",
                                                            body: JSON.stringify(userDetails),
                                                            headers: {
                                                                "Content-Type": "application/json",
                                                            },
                                                        }
                                                    );

                                                    if (response.ok) {
                                                        const jsonObj = await response.json();

                                                        if (jsonObj.success) {
                                                            // Alert.alert("Message", jsonObj.message);
                                                            setTimeout(() => {
                                                                navigation.replace('Login');
                                                            }, 800);
                                                        } else {
                                                            Alert.alert("Warning", jsonObj.message);
                                                        }
                                                    }

                                                }}
                                        >
                                            <Text style={{ color: 'white', fontSize: 18, fontWeight: '800', fontFamily: 'Inter' }}>Sign Up</Text>
                                        </Pressable>
                                        :
                                        <Pressable disabled={true} style={{ width: '100%', paddingVertical: 13, marginBottom: 30, backgroundColor: 'rgba(157, 176, 187, 0.38)', borderRadius: 8, flexDirection: 'row', justifyContent: 'center' }}>
                                            <Text disabled={true} style={{ color: '#DEDEDE', fontSize: 18, fontWeight: '800', fontFamily: 'Inter' }}>Sign Up</Text>
                                        </Pressable>
                                    }

                                </View>
                            </View>
                        </ScrollView>

                    </LinearGradient>
                </View>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create(
    {
        bgImg1: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
        },
        mainContainer1: {
            flex: 1,
            // height:'100%',
            justifyContent: 'center',
            paddingHorizontal: 17,
            // alignItems: 'center',
            // backgroundColor:'gray',
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
            fontFamily: 'Quicksand',
            paddingHorizontal: 15,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            fontSize: 17,
            color: '#fff',
            borderRadius: 8,
        },
        pageHeading1: {
            color: '#BEE0F9',
            fontSize: 40,
            fontFamily: 'Roboto',
            fontWeight: 'bold',
        },
    }
);