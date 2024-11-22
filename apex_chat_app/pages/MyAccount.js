import { LinearGradient } from "expo-linear-gradient";
import { Alert, Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FooterSection } from "../components/FooterSection";
import { TextInput } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export const MyAccount = ({ route }) => {

    const { user } = route.params;

    const [first_name, setFirst_Name] = useState('');
    const [last_name, setLast_Name] = useState('');
    const [userName, setUserName] = useState('');
    const [bio_desc, setBio_Desc] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    // Initialize state values from user object
    useEffect(() => {
        setFirst_Name(user.Fname);
        setLast_Name(user.Lname);
        setUserName(user.Uname);
        setBio_Desc(user.About);
        setProfileImage(user.img); // Set initial profile image from user object
    }, [user]);

    const handleImagePick = async () => {
        let imageResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!imageResult.canceled) {
            // Update profile image URI with selected image
            setProfileImage(imageResult.assets[0].uri);
        } else {
            Alert.alert('Image selection was canceled.');
        }
    };


    //modal success....
    const openCloseModal = () => {
        setModalVisible(!modalVisible);
    };

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
                        <View style={{ width: '100%', height: '100%', paddingTop: 15, }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ fontSize: 22, color: '#fff', fontFamily: 'Roboto', paddingHorizontal: 15, }}>My Profile</Text>
                                <MaterialCommunityIcons name="dots-vertical" size={30} color="#fff" />
                            </View>

                            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
                                <Modal
                                    transparent={true}
                                    visible={modalVisible}
                                    animationType="fade"
                                    onRequestClose={openCloseModal}
                                >
                                    <View style={{ position: 'absolute', top: 10, right: 10, width: 'auto', zIndex: 20, paddingHorizontal: 15, paddingVertical: 10, backgroundColor: '#14AA23' }}>
                                        <Text style={{ fontSize: 17, color: '#DEDEDE', fontFamily: 'Quicksand', fontWeight: '600' }} onPress={openCloseModal}>
                                            Profile Updated Successfully.!
                                        </Text>
                                    </View>
                                </Modal>

                                <View style={{ flex: 7.5 }}>
                                    <View style={{ width: 150, height: 150, marginTop: 40, alignSelf: 'center' }}>
                                        {
                                            profileImage ?
                                                <Image source={{ uri: profileImage }} style={{
                                                    width: '100%', height: '100%', borderRadius: 100, borderWidth: 1,
                                                }} />
                                                :
                                                <Image source={require('../assets/images/user.png')} style={{
                                                    width: '100%', height: '100%', borderRadius: 100, borderWidth: 1,
                                                }} />
                                        }

                                        <Pressable style={{ width: 44, height: 44, position: 'absolute', right: 6, top: 6, }}
                                            onPress={handleImagePick}
                                        >
                                            <Image source={require('../assets/images/add.png')} style={{ width: '100%', height: '100%' }} />
                                        </Pressable>
                                    </View>
                                    <Text style={{ fontSize: 21, paddingTop: 15, color: '#7FFFFF', fontFamily: 'Quicksand', textAlign: 'center', fontWeight: '700' }}>{userName}</Text>

                                    <ScrollView
                                        horizontal={false}
                                        showsHorizontalScrollIndicator={false}
                                        showsVerticalScrollIndicator={false}
                                        scrollEnabled={true}
                                        bounces={true}
                                        decelerationRate="fast"
                                        keyboardShouldPersistTaps='handled'
                                    >
                                        <View style={styles.infoContainer1}>
                                            <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                                                <Text style={styles.inputTitle1}>First Name</Text>
                                                <TextInput style={styles.inputField1} value={first_name} onChangeText={(e) => setFirst_Name(e)} />
                                            </View>
                                            <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                                                <Text style={styles.inputTitle1}>Last Name</Text>
                                                <TextInput style={styles.inputField1} value={last_name} onChangeText={(e) => setLast_Name(e)} />
                                            </View>
                                            <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                                                <Text style={styles.inputTitle1}>Username</Text>
                                                <TextInput style={styles.inputField1} value={userName} onChangeText={(e) => setUserName(e)} />
                                            </View>
                                            <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                                                <Text style={styles.inputTitle1}>Mobile</Text>
                                                <TextInput style={styles.inputField1} value={user.Mobile} editable={false} />
                                                <Text style={{ fontSize: 13, color: '#FFF386', fontFamily: 'Quicksand', paddingLeft: 10, }}>If you want to change your mobile number, please use the change mobile number option...</Text>
                                            </View>
                                            <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                                                <Text style={styles.inputTitle1}>About You</Text>
                                                <TextInput style={styles.inputFieldArea1} multiline={true} value={bio_desc} onChangeText={(e) => setBio_Desc(e)} inputMode="text" textAlignVertical="top" numberOfLines={5} />
                                            </View>
                                            <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                                                <Pressable style={styles.codeText1}>
                                                    <Text style={{ fontSize: 15, fontFamily: 'Quicksand', fontWeight: '700', color: '#fff' }}>Create security KeyCode</Text>
                                                </Pressable>
                                            </View>
                                            <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                                                <Pressable style={styles.codeText2}
                                                    onPress={
                                                        async () => {

                                                            let user_id = await AsyncStorage.getItem('userID');

                                                            const form = new FormData();
                                                            form.append("userId", user_id);
                                                            form.append("first_name", first_name);
                                                            form.append("last_name", last_name);
                                                            form.append("username", userName);
                                                            form.append("bio_desc", bio_desc);

                                                            if (profileImage != null) {
                                                                form.append("profileImg",
                                                                    {
                                                                        name: "newIcon.png",
                                                                        type: "image/png",
                                                                        uri: profileImage,
                                                                    }
                                                                );
                                                            }


                                                            const response = await fetch("http://10.0.2.2:8080/Apex_Chat/UpdateProfile",
                                                                {
                                                                    method: "POST",
                                                                    body: form,
                                                                }
                                                            );

                                                            if (response.ok) {

                                                                const respJson = await response.json();

                                                                if (respJson.success) {
                                                                    if (respJson.message === 'done') {
                                                                        setTimeout(() => {
                                                                            openCloseModal();
                                                                        }, 400);
                                                                    } else if (respJson.message === 'not') {
                                                                        setProfileImage();
                                                                    }
                                                                } else {
                                                                    Alert.alert("Message", respJson.message);
                                                                }
                                                            } else {
                                                                console.log("something went wrong.");
                                                            }
                                                        }}
                                                >
                                                    <Text style={{ fontSize: 16, textAlign: 'center', fontFamily: 'Quicksand', fontWeight: '700', color: '#fff' }}>Update Changes</Text>
                                                </Pressable>
                                            </View>
                                        </View>
                                    </ScrollView>
                                </View>

                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end' }}>
                                    <FooterSection />
                                </View>
                            </View>

                        </View>
                    </LinearGradient>
                </View >
            </SafeAreaView >
        </>
    );
}

const styles = StyleSheet.create(
    {
        infoContainer1: {
            width: '100%',
            paddingHorizontal: 15,
            paddingVertical: 20,
            marginTop: 10,
            rowGap: 28,

        },
        inputTitle1: {
            fontSize: 18,
            fontFamily: 'Roboto',
            fontWeight: '400',
            color: '#7FFFFF',
            paddingLeft: 10,
            paddingBottom: 5,
        },
        codeText1: {
            backgroundColor: '#14AA23',
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderRadius: 4,
        },
        codeText2: {
            backgroundColor: '#0561B6',
            paddingHorizontal: 15,
            paddingVertical: 14,
            borderRadius: 4,
            width: '100%',
        },
        inputField1: {
            width: '100%',
            paddingHorizontal: 10,
            borderRadius: 8,
            borderBottomColor: '#708991',
            borderBottomWidth: 1,
            fontSize: 16,
            color: '#DEDEDE',
            fontFamily: 'Roboto',
        },
        inputFieldArea1: {
            width: '100%',
            paddingHorizontal: 10,
            borderRadius: 8,
            borderColor: '#708991',
            borderWidth: 1,
            fontSize: 16,
            color: '#DEDEDE',
            fontFamily: 'Roboto',
        },
    }
);