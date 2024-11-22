import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Alert, Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";

export const ProfileImgSet = ({ navigation, route }) => {

    const { mobile } = route.params;

    const [username, setUsername] = useState("");
    const [userBio, setUserBio] = useState("");
    const [profileImage, setProfileImage] = useState(null);

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
                            <View style={{ flex: 1, paddingHorizontal: 20 }}>
                                <Text style={{ color: '#fff', fontSize: 22, fontFamily: 'Inter', fontWeight: '500', marginTop: 20, }}>Profile info</Text>
                                <View style={{
                                    justifyContent: 'center', marginVertical: 30, alignItems: 'center',
                                    marginTop: '20%', width: '100%', borderRadius: 12, paddingVertical: 40,
                                    opacity: 0.8, height: 'auto', backgroundColor: "rgba(255, 255, 255, 0.1)",
                                }}>
                                    <View style={{ width: 150, height: 150 }}>
                                        {profileImage ?
                                            <Image source={{ uri: profileImage }} style={{
                                                position: 'relative', width: '100%', height: '100%', objectFit: 'cover',
                                                borderRadius: 100, borderWidth: 1, borderColor: '#DEDEDE'
                                            }} />
                                            :
                                            <Image source={require('../assets/images/user.png')} style={{ position: 'relative', width: '100%', height: '100%', objectFit: 'cover' }} />
                                        }
                                        <Pressable style={{ width: 44, height: 44, objectFit: 'cover', position: 'absolute', right: -2, top: -2, }}
                                            onPress={
                                                async () => {
                                                    let imageResult = await ImagePicker.launchImageLibraryAsync({
                                                        mediaTypes: ImagePicker.MediaTypeOptions.Images,
                                                        allowsEditing: true,
                                                        aspect: [1, 1],
                                                        quality: 1,
                                                    });

                                                    if (!imageResult.canceled) {
                                                        setProfileImage(imageResult.assets[0].uri);
                                                    }
                                                }
                                            }

                                        >
                                            <Image source={require('../assets/images/add.png')} style={{ width: '100%', height: '100%' }} />
                                        </Pressable>
                                    </View>
                                    <View style={{ width: '100%', flexDirection: 'column', alignItems: 'center', rowGap: 40, marginTop: 25, }}>
                                        <TextInput style={styles.inputUsername1} placeholderTextColor={'#fff'} placeholder="Username..." inputMode="text" value={username} onChangeText={setUsername} />
                                        <TextInput
                                            multiline={true}
                                            numberOfLines={5}
                                            placeholderTextColor={'#fff'}
                                            placeholder="Edit Bio..."
                                            style={styles.inputUsername2}
                                            value={userBio}
                                            onChangeText={setUserBio}
                                        />
                                        {/* <TextInput style={styles.inputUsername1} placeholderTextColor={'#fff'} placeholder="Edit Bio..." /> */}
                                    </View>
                                    <Pressable style={{ backgroundColor: '#078814', marginTop: 40, width: '80%', paddingVertical: 12, borderRadius: 10 }}
                                        onPress={

                                            async () => {

                                                let userForm = new FormData();
                                                userForm.append("mobile_num", mobile);
                                                userForm.append("username", username);
                                                userForm.append("userBio", userBio);

                                                if (profileImage != null) {
                                                    userForm.append("profileImg",
                                                        {
                                                            name: "userIcon.png",
                                                            type: "image/png",
                                                            uri: profileImage,
                                                        }
                                                    );
                                                }

                                                const response = await fetch("http://10.0.2.2:8080/Apex_Chat/User_Information",
                                                    {
                                                        method: "POST",
                                                        body: userForm,
                                                    }
                                                );

                                                if (response.ok) {
                                                    const jsonObj = await response.json();

                                                    if (jsonObj.success) {
                                                        Alert.alert("Message", jsonObj.message);
                                                        setTimeout(() => {
                                                            navigation.replace('Home');
                                                        }, 1000);

                                                    } else {
                                                        Alert.alert("Message", jsonObj.message, [
                                                            {
                                                                text: 'Cancel',
                                                                onPress: () => { },
                                                                style: 'cancel',
                                                            },
                                                            {
                                                                text: 'OK', onPress: () => {
                                                                    navigation.replace('Home');
                                                                }
                                                            },
                                                        ]);
                                                    }
                                                }

                                            }}
                                    >
                                        <Text style={{ color: '#fff', fontWeight: '600', fontSize: 16, fontFamily: 'Inter', textAlign: 'center' }}>Let's Go</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </ScrollView>
                    </LinearGradient>
                </View>

            </SafeAreaView >
        </>
    )
};

const styles = StyleSheet.create(
    {
        inputUsername1: {
            width: '80%',
            paddingTop: 10,
            paddingBottom: 5,
            borderBottomWidth: 1,
            textAlign: 'left',
            borderBottomColor: '#ACD3E9',
            borderRadius: 10,
            paddingHorizontal: 20,
            color: '#fff',
            fontSize: 17,
        },
        inputUsername2: {
            width: '80%',
            paddingTop: 10,
            // paddingBottom: 5,
            borderWidth: 1,
            // textAlign: 'center',
            textAlignVertical: 'top',
            borderColor: '#ACD3E9',
            borderRadius: 10,
            paddingHorizontal: 20,
            color: '#fff',
            fontSize: 16,
        },
        bgImg1: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
        }
    }
);