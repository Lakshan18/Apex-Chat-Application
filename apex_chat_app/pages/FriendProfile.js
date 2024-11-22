import { LinearGradient } from "expo-linear-gradient";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export const FriendProfile = ({ route }) => {

    const { friend_data } = route.params;

    return (
        <>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flexGrow: 1 }}>
                    <LinearGradient
                        colors={[
                            '#3A464E',
                            '#5E707D',
                            '#3D4C56',
                            '#283C4A',
                        ]}
                        style={{ flexGrow: 1 }}
                    >
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                            <View style={{ flex: 2.6, width: '100%', flexDirection: 'column', alignItems: 'center' }}>
                                <View style={{ width: 140, marginTop: 30, height: 140 }}>
                                    {
                                        friend_data.f_p_image === 'unable' ?
                                            <Image source={require('../assets/images/user.png')} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 100 }} />
                                            :
                                            <Image source={{ uri: friend_data.f_p_image }} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 100 }} />
                                    }

                                </View>
                                <Text style={{ fontSize: 20, paddingTop: 10, fontFamily: 'Roboto', fontWeight: '500', color: '#7FFFFF', textAlign: 'center' }}>{friend_data.username}</Text>
                            </View>
                            <View style={{ flex: 6, width: '100%' }}>
                                <View style={{ width: '100%', height: 450, paddingHorizontal: 15, }}>
                                    <View style={{ width: '100%', height: '100%', padding: 15, backgroundColor: 'rgba(43, 63, 77, 0.56)', borderRadius: 8, }}>
                                        <View style={{ width: '100%', height: 100, rowGap: 4, }}>
                                            <Text style={{ fontSize: 18, fontFamily: 'Quicksand', color: '#fff', fontWeight: '500', }}>Bio :</Text>
                                            <Text style={{ width: '100%', fontSize: 15, color: '#F5EDC4', fontWeight: '300', fontFamily: 'Quicksand' }}>{friend_data.f_bio}</Text>
                                        </View>
                                        <Text style={{ fontSize: 24, fontFamily: 'Inter', color: '#91C1E3', paddingTop: 20, borderBottomColor: '#fff', borderBottomWidth: 1, }}>Info</Text>
                                        <View style={{ width: '100%', height: 'auto', marginTop: 15, rowGap: 2, }}>
                                            <Text style={{ fontSize: 18, fontFamily: 'Quicksand', color: '#fff', fontWeight: '500', }}>Name</Text>
                                            <Text style={{ width: '100%', fontSize: 16, color: '#16D3FC', fontWeight: '300', fontFamily: 'Quicksand' }}>{friend_data.fname + " " + friend_data.lname}</Text>
                                        </View>
                                        <View style={{ width: '100%', height: 'auto', marginTop: 15, rowGap: 2, }}>
                                            <Text style={{ fontSize: 18, fontFamily: 'Quicksand', color: '#fff', fontWeight: '500', }}>Mobile</Text>
                                            <Text style={{ width: '100%', fontSize: 16, color: '#16D3FC', fontWeight: '300', fontFamily: 'Quicksand' }}>{friend_data.mobile}</Text>
                                        </View>
                                        <View style={{ width: '100%', height: 'auto', marginTop: 15, rowGap: 2, }}>
                                            <Text style={{ fontSize: 18, fontFamily: 'Quicksand', color: '#fff', fontWeight: '500', }}>Registered Date</Text>
                                            <Text style={{ width: '100%', fontSize: 16, color: '#16D3FC', fontWeight: '300', fontFamily: 'Quicksand' }}>{friend_data.reg_date}</Text>
                                        </View>
                                    </View>

                                </View>
                            </View>
                        </View>
                    </LinearGradient>
                </View>
            </SafeAreaView>
        </>
    );

}