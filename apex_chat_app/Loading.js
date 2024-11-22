// import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { View, StyleSheet, Text, Image, ActivityIndicator } from "react-native";

export const Loading = ({ navigation }) => {

    setTimeout(
        async () => {
            const value1 = await AsyncStorage.getItem('userMobile')
            const value2 = await AsyncStorage.getItem('userID')
            if (value1 != null && value2 != null) {
                navigation.replace('Home');
                console.log(value1);
                console.log(value2);
            } else {
                navigation.replace('Login');
                console.log(value1);
                console.log(value2);
            }
        }, 5000);

    return (
        <>
            <View style={styles.mainSector1}>
                <View style={styles.mainContent1}>
                    <View style={styles.imageBox1}>
                        <Image source={require('./assets/images/chat-icon.png')} style={styles.imageView} />
                    </View>
                    <Text style={styles.text1}>ApexChat</Text>
                </View>
                <View style={styles.mainContent2}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 8, }}>
                        <ActivityIndicator size="large" color="#91C1E3" />
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: '500' }}>Loading...</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 6, columnGap: 6, }}>
                        <Image source={require('./assets/images/memos.png')} style={{ width: 25, height: 25, objectFit: 'cover' }} />
                        <Text style={{ color: '#fff', fontSize: 12, fontFamily: 'Roboto' }}>Powered By Memos</Text>
                    </View>
                    <Text style={{ fontSize: 12, color: 'white', fontWeight: '400' }}>@ApexChat TM. | 2024 All right reserved.</Text>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create(
    {
        imageBox1: {
            width: 200,
            height: 100,
            objectFit: 'cover',
        },
        imageView: {
            width: '100%',
            height: '100%',
        },
        text1: {
            color: 'white',
            fontSize: 36,
            fontWeight: '600',
            fontFamily: 'Lobster',
            textAlign: 'center',
        },
        mainContent1: {
            flex: 1,
            marginTop: 100,
            justifyContent: 'center',
            alignContent: 'center',
        },
        // loader1:{
        //       width:30,
        //       height:30,
        //       backgroundColor:'transparent',
        //       borderColor: 'linear-gradient(180deg, #91C1E3 30% , #fff 100%)',
        //       borderWidth:4,
        //       borderRadius:50,
        // },
        mainSector1: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#314858',
        },
        mainContent2: {
            flex: 0.2,
            paddingVertical: 10,
            //   backgroundColor:'red',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
    }
);