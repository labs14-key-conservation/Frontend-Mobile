// import React from 'react';
// import { Modal, View, StyleSheet, TouchableOpacity, Text } from 'react-native';

// import BackArrow from '../../assets/jsicons/miscIcons/BackArrow';
// import KeyInfoGreen from '../../assets/jsicons/KeyCon/Key_Info_Green';

// import Animals from '../Animals/Animals';

// const AnimalModal = props => {
//   return (
//     <Modal
//       animationType='fade'
//       transparent={true}
//       visible={props.isModalVisible}
//       onRequestClose={() => props.setIsModalVisible(!props.isModalVisible)}
//     >
//       <View style={styles.modal}>
//         <View style={styles.headerContainer}>
//           <TouchableOpacity
//             style={styles.backArrow}
//             onPress={() => props.setIsModalVisible(!props.isModalVisible)}
//           >
//             <BackArrow />
//           </TouchableOpacity>
//           <View style={styles.titleView}>
//             <KeyInfoGreen />
//             <Text style={styles.title}>Species Patterns</Text>
//             <Text style={styles.text}>
//               Click on the Key icon throughout the app to learn more about the
//               species behind the patterns.
//             </Text>
//           </View>
//         </View>
//         <View style={styles.animalList}>
//           <Animals />
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   background: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     flex: 1
//   },
//   modal: {
//     flex: 1,
//     // width: '80%',
//     // height: '30%',
//     //backgroundColor: '#3b3b3b',
//     marginHorizontal: 40,
//     marginVertical: 70,
//     borderRadius: 8
//     // borderColor: 'black',
//     // borderWidth: 5
//   },

//   headerContainer: {
//     // borderColor: 'purple',
//     // borderWidth: 2,
//     backgroundColor: 'transparent',
//     zIndex: 100,
//     flex: 0,
//     flexDirection: 'row',
//     paddingHorizontal: 10
//   },
//   backArrow: {
//     padding: 3,
//     margin: 10
//   },
//   title: {
//     fontSize: 20,
//     color: 'black',
//     fontFamily: 'Lato',
//     marginHorizontal: 8
//   },
//   animalList: {
//     backgroundColor: 'grey',
//     borderRadius: 8,
//     //bottom: '7%',
//     // borderColor: 'red',
//     // borderWidth: 2,
//     flex: 1,
//     alignSelf: 'center'
//   },
//   titleView: {
//     borderColor: 'purple',
//     borderWidth: 2,
//     flex: 1,
//     flexDirection: 'row'
//   },
//   title: {
//     flex: 1,
//     alignSelf: 'center',
//     paddingHorizontal: 40,
//     fontFamily: 'Lato',
//     color: '#F4F5F7',
//     fontSize: 30
//     // borderColor: 'purple',
//     // borderWidth: 2
//   },
//   text: {
//     alignSelf: 'center',
//     paddingHorizontal: 40,
//     fontFamily: 'Lato',
//     color: '#F4F5F7',
//     fontSize: 30
//     // borderColor: 'purple',
//     // borderWidth: 2
//   }
// });

// export default AnimalModal;
