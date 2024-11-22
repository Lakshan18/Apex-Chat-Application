import { FlatList, ScrollView, StyleSheet, Text, TextInput, View, Dimensions, Pressable, Image, BackHandler, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React, { useEffect, useState } from "react";
// import { LinearGradient } from "expo-linear-gradient";
import { Modal } from "react-native";
import { FooterSection } from "./components/FooterSection";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

// const { width } = Dimensions.get('window');


export function Home({ route, navigation }) {

   const [messages, setMessages] = useState([]);

   const [userStatus, setUserStatus] = useState(null);
   const [userpr_Image, setUserPr_Image] = useState(null);
   const [userId, setUserId] = useState('');
   const [friends, setFriends] = useState([]);


   //use for logout process in back key press....

   useFocusEffect(
      React.useCallback(() => {
         const backAction = () => {
            Alert.alert("Hold On!", "Are you sure you want to go exit Apex Chat?", [
               {
                  text: "Cancel",
                  onPress: () => null,
                  style: "cancel",
               },
               {
                  text: "Yes",
                  onPress: async () => {
                     const response = await fetch(
                        "http://10.0.2.2:8080/Apex_Chat/StatusChanged?uid=" + userId + "&status=out"
                     );
                     if (response.ok) {
                        const responseJson = await response.json();
                        // Alert.alert(responseJson.message);
                        if (responseJson.success) {
                           if (responseJson.logOut === "logOut") {
                              BackHandler.exitApp();
                           }
                           console.log(responseJson.message);
                        } else {
                           console.log(responseJson);
                        }

                     } else {
                        console.error("Something went wrong");
                     }
                  },
               },
            ]);
            return true;
         };

         const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

         return () => backHandler.remove(); // Clean up the event listener when screen is blurred
      }, [userId])
   );


   useEffect(() => {
      // setInterval(() => {
         fetchMessage();
      // }, 2000);
      // statusChange();
   }, [userId]);

   const fetchMessage = async () => {
      const user_id = await AsyncStorage.getItem('userID')
      setUserId(user_id);

      if (user_id != null) {
         try {

            const response = await fetch("http://10.0.2.2:8080/Apex_Chat/Load_Recent_Messages?uid=" + user_id);
            const response2 = await fetch("http://10.0.2.2:8080/Apex_Chat/StatusChanged?uid=" + user_id + "&status=in");
            const response3 = await fetch("http://10.0.2.2:8080/Apex_Chat/Load_Friends?uid=" + user_id);

            if (response.ok) {
               const chatJsonArray = await response.json();
               console.log(chatJsonArray);
               setMessages(chatJsonArray.chats);
            }
            if (response2.ok) {
               const respJson = await response2.json();

               if (respJson.success) {
                  setUserStatus(respJson.message);
                  setUserPr_Image(respJson.user_pimage);
               } else {
                  console.log(respJson);
               }
            }

            if (response3.ok) {

               const friendsArray = await response3.json();

               if (friendsArray.success) {
                  setFriends(friendsArray.friends);
               } else {
                  console.log(friendsArray.message);
               }
            }

         } catch (error) {
            console.error('Error fetching recent messages:', error);
         }

      } else {
         console.log(user_id);
      }
   };


   // const statusChange = async () => {
   //    const user_id = await AsyncStorage.getItem('userID')

   //    try {
   //       if (user_id != null) {
   //          const response = await fetch("http://10.0.2.2:8080/Apex_Chat/StatusChanged?uid=" + user_id + "&status=in");

   //          if (response2.ok) {
   //             const respJson = await response.json();

   //             if (respJson.success) {
   //                setUserStatus(respJson.message);
   //                setUserPr_Image(respJson.user_pimage);
   //             } else {
   //                console.log(respJson);
   //             }
   //          }
   //       }

   //    } catch (error) {
   //       console.error("ERROR is:", error);
   //    }
   // };

   const [modalVisible, setModalVisible] = useState(false);


   const limitText = (text, limit) => {
      return text.length > limit ? text.substring(0, limit) + '...' : text;
   }

   const [inputText, setInputText] = useState("");

   const openCloseModal = () => {
      setModalVisible(!modalVisible);
   };

   //open single chat with user.....
   const openChat = (f_id, contact, p_Img, isFriend) => {
      navigation.navigate('MainChat', { f_id, contact, p_Img, isFriend });
   }

   // chat rendering//.....

   const renderMessageItems = ({ item }) => (

      <Pressable style={styles.msgContent1} key={item.userId}
         onPress={() => openChat(item.userId, item.contact, item.p_image, item.isFriend)}
      >
         <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 16, }}>
            <View style={{ width: 60, height: 60 }}>
               {item.p_image === 'unable' ?
                  <Image source={require('./assets/images/user.png')} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 100, }} />
                  :
                  <Image source={{ uri: item.p_image }} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 100, }} />
               }
            </View>
            {/* <View style={[styles.profileIMG1, { backgroundColor: msg.image }]}></View> */}
            <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
               <Text style={{ fontSize: 18, fontFamily: "Inter", fontWeight: '600', color: '#fff' }}>{item.contact}</Text>
               <Text style={styles.smallText1}>{limitText(item.message, 20)}</Text>
            </View>
         </View>
         <View style={{ flexDirection: 'row', alignSelf: 'flex-end', paddingBottom: 3.4, }}>
            <Text style={styles.smallText2}>{item.time}</Text>
         </View>
      </Pressable>

   );

   return (
      <>
         <SafeAreaView style={{ flex: 1 }}>
            <View style={{ width: '100%', height: '100%', backgroundColor: '#293A46' }}>
               <View style={styles.content1}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 10, }}>
                     <Text style={styles.heading1}>Chats</Text>
                     <MaterialCommunityIcons name="dots-vertical" size={30} color="#fff" onPress={openCloseModal} />

                     <Modal
                        transparent={true}
                        visible={modalVisible}
                        animationType="fade"
                        onRequestClose={openCloseModal}
                     >
                        <Pressable style={styles.overlayModal1} onPress={openCloseModal}>
                           <View style={styles.modalContainer1}>
                              <View style={{ width: '100%', height: 'auto' }}>
                                 {userStatus === 'online' ?
                                    <><Image source={{ uri: userpr_Image }} style={{ position: 'relative', width: 50, height: 50, marginLeft: 43, marginBottom: 8, objectFit: 'cover', borderRadius: 100, borderWidth: 1, borderColor: 'yellow' }} />
                                       <View style={{ position: 'absolute', width: 15, height: 15, backgroundColor: 'lightgreen', borderRadius: 100, right: 60, top: -4 }}></View>
                                    </>
                                    :
                                    <Image source={require('./assets/images/user.png')} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 100, borderWidth: 1, borderColor: 'yellow' }} />
                                 }
                              </View>
                              <Text style={styles.modalOption} onPress={
                                 () => {
                                    setTimeout(
                                       async () => {
                                          let user_id = await AsyncStorage.getItem('userID')
                                          const response = await fetch("http://10.0.2.2:8080/Apex_Chat/StatusChanged?uid=" + user_id + "&status=out");

                                          if (response.ok) {
                                             let respJson = await response.json();

                                             if (respJson.success) {
                                                await AsyncStorage.removeItem('userMobile')
                                                await AsyncStorage.removeItem('userID')
                                                setModalVisible(false);
                                                navigation.replace('Login');
                                             } else {
                                                console.log(respJson);
                                             }
                                          }

                                       }, 800);
                                 }
                              }>sign out</Text>
                           </View>
                        </Pressable>
                     </Modal>

                  </View>

                  <View style={{ width: '100%', flex: 1, flexDirection: 'column', paddingHorizontal: 15, justifyContent: 'center' }}>
                     <View style={{ width: '100%', flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <TextInput style={[styles.input1,
                        inputText.length === 0 ? styles.centeredPlaceholder : styles.leftAlignText,
                        ]}
                           placeholder="search for peoples..."
                           value={inputText}
                           onChangeText={setInputText}
                        />
                        <EvilIcons name="search" size={30} color="#9E9E9E" style={{ position: 'absolute', paddingHorizontal: 10, }} />
                     </View>
                  </View>
                  <View style={{ flex: 8, flexDirection: 'column', width: '100%' }}>
                     <View style={{ width: '100%', flex: 1, flexDirection: 'row', paddingHorizontal: 15, paddingBottom: 30, paddingTop: 10, alignItems: 'center' }}>
                        <Text style={styles.heading2}>Friends</Text>
                        <ScrollView
                           horizontal={true}
                           showsHorizontalScrollIndicator={false}
                           bounces={true}
                           snapToInterval={20}
                           decelerationRate="fast"
                        >
                           {friends.map((item) => (
                              <Pressable
                                 style={styles.userProfiles1} key={item.id}
                                 onPress={
                                    () => {
                                       navigation.navigate('FriendProfile',
                                          {
                                             friend_data: {
                                                fname: item.fname,
                                                lname: item.lname,
                                                username: item.username,
                                                mobile: item.mobile,
                                                f_bio: item.friend_bio,
                                                f_p_image: item.p_image,
                                                reg_date: item.reg_date,
                                             },
                                          }
                                       );
                                    }
                                 }
                              >
                                 <View style={styles.profileIMG1}>
                                    {
                                       item.p_image === 'unable' ?
                                          <Image source={require('./assets/images/user.png')} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 100, }} />
                                          :
                                          <Image source={{ uri: item.p_image }} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 100, }} />
                                    }
                                 </View>
                                 <Text style={{ color: '#F7F9FB', paddingTop: 8, fontSize: 15, fontFamily: 'Roboto', fontWeight: '500' }}>{item.fname}</Text>
                              </Pressable>

                           ))}

                        </ScrollView>

                     </View>
                     <View style={{ flex: 5.2, flexDirection: 'column', justifyContent: 'flex-end' }}>
                        <View style={styles.recentContent1}>
                           <Text style={styles.heading1}>Recent Messages</Text>

                           {/* <ScrollView
                              horizontal={false}
                              showsVerticalScrollIndicator={false}
                              showsHorizontalScrollIndicator={false}
                              bounces={true}
                              decelerationRate="fast"
                           > */}
                           <View style={{ width: '100%', paddingBottom: 10 }}>
                              {/* flatlist using... */}

                              <FlatList
                                 data={messages}
                                 keyExtractor={(item) => item.userId.toString()}
                                 renderItem={renderMessageItems}
                              />

                           </View>

                           {/* </ScrollView> */}

                        </View>
                        <View style={{ width: '100%', height: 'auto' }}>
                           {/* Footer Section */}
                           <FooterSection />
                        </View>
                     </View>
                  </View>

               </View>

            </View >

         </SafeAreaView >
      </>
   );
}

const styles = StyleSheet.create(
   {
      content1: {
         flex: 1,
         flexDirection: 'column',
      },
      input1: {
         width: '100%',
         paddingVertical: 12,
         borderRadius: 10,
         backgroundColor: '#fff',
         fontSize: 15,
         fontFamily: 'Inter',
         position: 'relative',
      },
      centeredPlaceholder: {
         textAlign: 'center',
      },
      heading1: {
         fontSize: 22,
         fontFamily: 'Roboto',
         paddingLeft: 15,
         color: "#fff",
         marginBottom: 12,
         paddingTop: 15,
      },
      heading2: {
         fontSize: 20,
         fontFamily: 'Roboto',
         paddingLeft: 15,
         color: "#fff",
         marginBottom: 12,
         // paddingTop: 15,
         paddingHorizontal: 10,
      },
      leftAlignText: {
         textAlign: 'left',
         paddingHorizontal: 50,
      },
      profileIMG1: {
         width: 50,
         height: 50,
         borderRadius: 100,
         borderWidth: 1,
         borderColor: '#839CAA',
      },
      userProfiles1: {
         // width:60,
         flexDirection: 'column',
         alignItems: 'center',
         paddingHorizontal: 18,
      },
      recentContent1: {
         width: '100%',
         // height: 440,
         flex: 1,
         flexDirection: 'column',
         alignItems: 'flex-start',
         backgroundColor: '#384E5B',
         borderTopRightRadius: 18,
         borderTopLeftRadius: 18,
         paddingHorizontal: 15,
      }
      , msgContent1: {
         width: '100%',
         height: 'auto',
         flexDirection: 'row',
         alignItems: 'center',
         justifyContent: 'space-between',
         paddingVertical: 16,
         borderTopColor: '#547D8A',
         borderTopWidth: 1,
      },
      smallText1: {
         fontSize: 15,
         paddingTop: 5,
         fontFamily: "Roboto",
         fontWeight: '400',
         color: '#93D8F6',
         maxWidth: 200,
      },
      smallText2: {
         fontSize: 11,
         paddingTop: 5,
         fontFamily: "Roboto",
         fontWeight: '400',
         color: '#CECECE',
         maxWidth: 200,
      },
      modalContainer1: {
         backgroundColor: '#406271',
         paddingVertical: 10,
         paddingStart: 10,
         width: 160,
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
         width: '100%',
         padding: 10,
         fontSize: 16,
         color: '#fff',
         textAlign: 'left',
      },
      overlayModal1: {
         flex: 1,
         justifyContent: 'flex-start',
         alignItems: 'flex-end',
      },
   }
);