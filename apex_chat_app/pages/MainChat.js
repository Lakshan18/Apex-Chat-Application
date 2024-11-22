import { ImageBackground, FlatList, StyleSheet, Text, View, TextInput, Pressable, Image, Alert } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Modal } from "react-native";

export const MainChat = ({ route }) => {
    const { f_id, contact, p_Img, isFriend } = route.params;
    const [chatData, setChatData] = useState([]);
    const [u_id, setUId] = useState(null);
    const [friendStatus, setFriendStatus] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [chatStatus, setChatStatus] = useState({});
    const [titleStatus, setTitleStatus] = useState('');

    useEffect(() => {
        fetchSingleUserChats();
    }, [f_id, u_id]);

    const fetchSingleUserChats = async () => {
        const u_id = await AsyncStorage.getItem("userID");
        setUId(u_id);
        const response = await fetch(
            `http://10.0.2.2:8080/Apex_Chat/LoadChat?friendId=${f_id}&userId=${u_id}`
        );
        if (response.ok) {
            const chatJsonArray = await response.json();
            setChatData(chatJsonArray.both_chat);
            setFriendStatus(chatJsonArray.friend_status);
        }
    };

    const sendMessage = async () => {
        if (!newMessage.trim()) return;

        const response = await fetch("http://10.0.2.2:8080/Apex_Chat/SendMessage", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `from_user_id=${u_id}&to_user_id=${f_id}&message=${newMessage}`,
        });

        if (response.ok) {
            const messageJson = await response.json();
            if (messageJson.success) {

                fetchSingleUserChats();
                // const messageData = {
                //     id: messageJson.id, // Ensure this ID is unique
                //     message: newMessage,
                //     from_user_id: u_id,
                //     to_user_id: f_id,
                //     date_time: new Date().toLocaleString(),
                // };
                // setChatData((prevChatData) => [...prevChatData, messageData]);
                // Alert.alert("message", JSON.stringify(chatData));
            }
            setNewMessage("");
        }
    };

    const openCloseModal = () => {
        setModalVisible(!modalVisible);
    };

    const renderItem = ({ item }) => {
        return (
            item.from_user_id === parseInt(u_id) ? (
                <View style={{ width: '100%', flexDirection: 'column', alignItems: 'flex-end' }} key={item.id}>
                    <View style={[styles.toMessageContent1, item.message.length > 30 ? { width: 300 } : { width: 'auto' }]}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.Message1}>{item.message}</Text>
                            <View style={{ position: 'absolute', right: 0, top: -10 }}>
                                {
                                    item.chat_status === 'sent' ? (
                                        <MaterialIcons name="done" size={18} color="#DEDEDE" />
                                    ) : item.chat_status === 'delivered' ? (
                                        <MaterialIcons name="done-all" size={18} color="#DEDEDE" />
                                    ) :
                                        <MaterialIcons name="done-all" size={18} color="#FAFF00" />
                                }
                            </View>
                            <View style={{ position: 'absolute', bottom: -8, right: 0 }}>
                                <Text style={styles.messageTime1}>{item.date_time}</Text>
                            </View>
                        </View>
                        <View style={styles.triangleToSide1}></View>
                    </View>
                </View>
            ) : (
                <View style={{ width: '100%', flexDirection: 'column', alignItems: 'flex-start' }} key={item.id}>
                    <View style={[styles.fromMessageContent1, item.message.length > 30 ? { width: 300 } : { width: 'auto' }]}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.Message1}>{item.message}</Text>
                            <View style={{ position: 'absolute', bottom: -8, right: 0 }}>
                                <Text style={styles.messageTime1}>{item.date_time}</Text>
                            </View>
                        </View>
                        <View style={styles.triangleFromSide1}></View>
                    </View>
                </View>
            )
        );
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.mainContainer1}>
                <View style={{
                    width: '100%', height: 70, backgroundColor: '#21404D',
                    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, paddingVertical: 8,
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 10 }}>
                        <View style={{ width: 55, height: 55 }}>
                            {p_Img === 'unable' ? (
                                <Image source={require('../assets/images/user.png')} style={{ width: '100%', height: '100%', borderRadius: 100 }} />
                            ) : (
                                <Image source={{ uri: p_Img }} style={{ width: '100%', height: '100%', borderRadius: 100 }} />
                            )}
                        </View>
                        <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                            <Text style={styles.friendName1}>{contact}</Text>
                            <Text style={styles.lastSeenTime1}>
                                {friendStatus.isOnline ? "Online" : `Last Seen ${friendStatus.last_seen}`}
                            </Text>
                        </View>
                    </View>
                    <MaterialCommunityIcons name="dots-vertical" size={30} color="#fff" onPress={openCloseModal} />
                    <Modal
                        transparent={true}
                        visible={modalVisible}
                        animationType="fade"
                        onRequestClose={openCloseModal}
                    >
                        <Pressable style={styles.overlayModal1} onPress={openCloseModal}>
                            <View style={styles.modalContainer1}>
                                <Text style={[styles.modalOption, { color: isFriend ? 'rgb(140,140,140)' : '#fff' }]}
                                    disabled={isFriend}
                                    onPress={async () => {
                                        const response = await fetch(`http://10.0.2.2:8080/Apex_Chat/AddToFriendList?uid=${u_id}&fid=${f_id}`);
                                        if (response.ok) {
                                            const responseObj = await response.json();
                                            if (responseObj.success) {
                                                setTimeout(() => {
                                                    setTitleStatus(responseObj.message === 'success' ? "success" : 'disabled');
                                                }, 1000);
                                            }
                                        }
                                    }}>
                                    Add to Friend List
                                </Text>
                                <Text style={styles.modalOption}>Add to Favorite</Text>
                                <Text style={styles.modalOption}>Remove Friend List</Text>
                                <Text style={styles.modalOption}>Block Friend</Text>
                            </View>
                        </Pressable>
                    </Modal>
                </View>

                <ImageBackground source={require('../assets/images/bg-chat-single 1.png')} style={styles.chatBG1}>
                    <View style={{ flexGrow: 1 }}>
                        <View style={{ flex: 5 }}>
                            <FlatList
                                data={chatData}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.id} // Ensure this ID is unique
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={styles.chatArea1}
                            />
                        </View>
                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: 10 }}>
                            <View style={styles.searchArea1}>
                                <TextInput
                                    placeholder="Message"
                                    multiline={true}
                                    numberOfLines={1}
                                    placeholderTextColor={'#534D4D'}
                                    style={styles.messageTypeInput1}
                                    value={newMessage}
                                    onChangeText={setNewMessage}
                                />
                                <Pressable style={{
                                    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                                    backgroundColor: '#078814', borderRadius: 6, padding: 10, height: 50, width: '15%'
                                }}
                                    onPress={sendMessage}
                                >
                                    <Ionicons name="send" size={20} color='#fff' />
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    mainContainer1: {
        flexDirection: 'column',
        height: '100%',
    },
    friendName1: {
        fontSize: 18,
        fontFamily: 'Inter',
        color: '#fff',
        fontWeight: '600',
    },
    lastSeenTime1: {
        fontSize: 13,
        fontFamily: 'Quicksand',
        fontWeight: '400',
        color: '#CECECE',
    },
    chatBG1: {
        flexGrow: 1,
    },
    chatArea1: {
        padding: 15,
        rowGap: 18,
    },
    fromMessageContent1: {
        paddingHorizontal: 8,
        paddingVertical: 11,
        backgroundColor: '#57636B',
        borderRadius: 8,
        position: 'relative',
        marginVertical: 5,
    },
    Message1: {
        fontSize: 16,
        color: '#fff',
        fontFamily: 'Inter',
        fontWeight: 'thin',
        marginRight: 60,
    },
    messageTime1: {
        fontSize: 12,
        color: '#fff',
        fontFamily: 'Quicksand',
        fontWeight: '200',

    },
    toMessageContent1: {
        paddingHorizontal: 8,
        paddingVertical: 11,
        backgroundColor: '#2B528D',
        borderRadius: 8,
        position: 'relative',
        marginVertical: 5,
    },
    triangleFromSide1: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 10,
        borderRightWidth: 8,
        borderBottomWidth: 15,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#57636B',
        transform: [{ rotate: '0deg' }],
        position: 'absolute',
        left: -10,
        bottom: 0,
        zIndex: 0,
    },
    triangleToSide1: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 8,
        borderRightWidth: 10,
        borderBottomWidth: 15,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#2B528D',
        transform: [{ rotate: '0deg' }],
        position: 'absolute',
        right: -9,
        bottom: 0,
        zIndex: 0,
    },
    searchArea1: {
        width: '100%',
        flexDirection: 'row',
        columnGap: 6,
        alignItems: 'center',
        paddingLeft: 8,
        paddingRight: 14,

    },
    messageTypeInput1: {
        backgroundColor: 'rgba(255, 255, 255, 0.71)',
        width: '85%',
        borderRadius: 10,
        fontSize: 16,
        fontFamily: 'Inter',
        fontWeight: '200',
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    modalContainer1: {
        backgroundColor: '#22394A',
        paddingVertical: 10,
        paddingHorizontal: 10,
        width: 250,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        marginTop: 40,
        marginRight: 20,
        alignItems: 'flex-start',
    },
    modalOption: {
        padding: 10,
        fontSize: 16,
        width: '100%',
        color: '#fff',
        textAlign: 'left',
    },
    overlayModal1: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },

});


