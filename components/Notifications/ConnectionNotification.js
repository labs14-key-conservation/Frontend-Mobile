import React, { useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  Button,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import moment from 'moment';
import TimeStamp from './TimeStamp';

{
  /* TEAL COLOR: #00FF9D */
}

const ConnectionNotification = (props) => {
  useEffect(() => {
    console.log('@@@@@@@@@', data);
  }, [data]);

  const createdAt = props.notifData.item.time;
  const [data, setData] = useState(props.notifData.item);

  const goToCommenterProfile = () => {
    props.nav.push('Pro', {
      selectedProfile: props.notifData.item.sender_id,
    });
    checkNew();
  };

  const checkNew = () => {
    console.log('state data', data);
    if ((data.new_notification = true)) {
      return setData({
        ...data,
        new_notification: false,
      });
    }
  };

  return (
    <TouchableOpacity
      style={!data.new_notification ? styles.wrapper : styles.wrapperNew}
      onPress={goToCommenterProfile}
    >
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <TouchableOpacity onPress={goToCommenterProfile}>
            <Avatar
              size="medium"
              rounded
              source={{
                uri: `${props.notifData.item.sender_Pic}` || undefined,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Text style={styles.connectionInfo}>
            <Text style={styles.connect} onPress={goToCommenterProfile}>
              {props.notifData.item.sender_name}{' '}
            </Text>
            wants to connect
          </Text>
          <TimeStamp style={styles.timeStamp} createdAt={createdAt} />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            props.nav.push('Connections', (props = { forceOpen: true }));
          }}
        >
          <Text style={styles.connect}>Connect</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 80,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  wrapperNew: {
    height: 80,
    backgroundColor: '#D3D3D3',
    borderRadius: 20,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    height: 20,
    width: '100%',
    padding: 5,
    flexDirection: 'row',
    // padding: 10,
    borderRadius: 0,
    marginVertical: 6,
    alignItems: 'center',
  },
  content: {
    flex: 4,
    marginLeft: 10,
  },
  avatarContainer: {
    alignSelf: 'center',
    flex: 1,
    marginLeft: 1,
  },
  button: {
    flex: 1,
    borderRadius: 7.5,
    height: 27,
    paddingRight: 15,
    paddingLeft: 15,
    margin: 'auto',
    justifyContent: 'center',
    color: 'black',
    backgroundColor: '#00FF9D',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    elevation: 10,
  },
  connect: {
    fontFamily: 'Lato-Bold',
  },
  connectionInfo: {
    fontFamily: 'Lato',
    fontSize: 17,
  },
  timeStamp: {
    fontFamily: 'Lato',
    fontSize: 13,
    color: '#B5B5B5',
  },
});

export default ConnectionNotification;