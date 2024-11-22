import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Text } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const icons = [
    {
        id: 1,
        type: "IonIC",
        iconName: "home-sharp",
        title: "Home",
    },
    {
        id: 2,
        type: "fontAw",
        iconName: "heart",
        title: "favorite",
    },
    {
        id: 3,
        type: "fontAw",
        iconName: "user",
        title: "account",
    },
    {
        id: 4,
        type: "IonIC",
        iconName: "settings-sharp",
        title: "account",
    },
];

export const FooterSection = () => {

    const navigation = useNavigation();


    const storedMobile = async () => {
        const value = await AsyncStorage.getItem('userMobile')
        const response = await fetch("http://10.0.2.2:8080/Apex_Chat/Load_Profile?mob=" + value);

        if (response.ok) {
            const userObjet = await response.json();

            if (userObjet.success) {
                let Firstname = userObjet.user.fname;
                let Lastname = userObjet.user.lname;
                let Username = userObjet.user.userName;
                let Mobile = userObjet.user.mobile;
                let About = userObjet.user.about;
                let image = userObjet.user.profileImg;
                navigation.navigate('MyAccount',
                    {
                        user: {
                            Fname: Firstname,
                            Lname: Lastname,
                            Uname: Username,
                            Mobile: Mobile,
                            About: About,
                            img: image,
                        },
                    }
                );
                // setFirst_Name(userObjet.user.fname);
                // setLast_Name(userObjet.user.lname);
                // if (userObjet.user.userName === null) {
                //     setUserName("update here...");
                // } else {
                //     setUserName(userObjet.user.userName);
                // }
                // setMobile(userObjet.user.mobile);
                // if (userObjet.user.about === "") {
                //     setBio_Desc("update here...");
                // } else {
                //     setBio_Desc(userObjet.user.about);
                // }
                // if (!userObjet.profileImg === "") {
                //     setImgUrl(userObjet.profileImg);
                // } else {
                //     setImgUrl(null);
                // }

            } else {
                console.log(userObjet.message);
            }
        } else {
            console.log("response Error");
        }
    }

    // const [toggleStates, setToggleStates] = useState(
    //     icons.reduce((acc, icon) => {
    //         acc[icon.id] = false;
    //         return acc;
    //     }, {})
    // );

    // const handleToggle = (id) => {
    //     const newState = Object.keys(toggleStates).reduce((acc, key) => {
    //         acc[key] = parseInt(key) === id;
    //         return acc;
    //     }, {});
    //     setToggleStates(newState);
    // };

    return (

        <>

            <View style={styles.mainSection1}>
                <TouchableOpacity
                    style={styles.sectionBG1}

                    // { backgroundColor: toggleStates[1] ? '#1B3642' : '#1D2C32' }, // Change background based on toggle state
                    // ]}
                    onPress={() => {
                        // handleToggle(1)
                        navigation.navigate('Home');
                    }}
                >
                    <View style={styles.subSection1}>
                        <Ionicons name="home-sharp" size={25} color="#fff" />
                        <Text style={styles.sectionText1}>Home</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.sectionBG1}

                    // { backgroundColor: toggleStates[2] ? '#1B3642' : '#1D2C32' }, // Change background based on toggle state
                    // ]}
                    onPress={() => {
                        // handleToggle(2)
                        navigation.navigate('StartChat');
                    }}
                >
                    <View style={styles.subSection1}>
                        <MaterialIcons name="chat" size={26} color="#fff" />
                        <Text style={styles.sectionText1}>Chat</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.sectionBG1}
                    onPress={storedMobile}
                >
                    <View style={styles.subSection1}>
                        <FontAwesome name="user" size={26} color="#fff" />
                        <Text style={styles.sectionText1}>Account</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.sectionBG1}

                // { backgroundColor: toggleStates[4] ? '#1B3642' : '#1D2C32' }, // Change background based on toggle state
                // ]}
                // onPress={() => handleToggle(4)}
                >
                    <View style={styles.subSection1}>
                        <Ionicons name="settings-sharp" size={26} color="#fff" />
                        <Text style={styles.sectionText1}>Settings</Text>
                    </View>
                </TouchableOpacity>

            </View>
        </>

    );
}

const styles = StyleSheet.create(
    {
        mainSection1: {
            width: '100%',
            height: 80,
            backgroundColor: '#1D2C32',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            // paddingHorizontal: 15,
        },
        subSection1: {
            flexDirection: 'column',
            alignItems: 'center',
        },
        sectionText1: {
            fontSize: 14,
            fontFamily: 'Inter',
            fontWeight: '500',
            color: '#CDEDFF',
        },
        sectionBG1: {
            height: '100%',
            paddingVertical: 18,
            paddingHorizontal: 24,
        },
    }
);