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
import { connect } from 'react-redux';
import { markNotification } from '../../store/actions';
import { NavigationEvents } from 'react-navigation';

{
  /* TEAL COLOR: #00FF9D */
}

const ConnectionNotification = (props) => {
  const createdAt = props.notifData.item.time;
  const [data, setData] = useState(props.notifData.item);
  const [read, setRead] = useState(props.notifData.item.new_notification);

  useEffect(() => {
    console.log('@@@@@@@@@', props.notifData);

    console.log('**** data.new_notification ***', read);
  }, [data]);

  const goToCommenterProfile = () => {
    props.nav.push('Pro', {
      selectedProfile: props.notifData.item.sender_id,
    });
    // checkNew();
  };

  // const checkNew = () => {
  //   // console.log('state data', data);
  //   if ((data.new_notification = true)) {
  //     return setData({
  //       ...data,
  //       new_notification: false,
  //     });
  //   }
  // };

  const handleMark = () => {
    console.log('handleMark');
    props
      .markNotification(
        props.notifData.item.user_id,
        props.notifData.item.notification_id
      )
      .then(() => {
        goToCommenterProfile();
      });
  };

  return (
    <TouchableOpacity
      style={
        !props.notifData.new_notification ? styles.wrapper : styles.wrapperNew
      }
      onPress={() => {
        handleMark();
      }}
    >
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <TouchableOpacity onPress={goToCommenterProfile}>
            <Avatar
              size="medium"
              rounded
              source={{
                uri: `${props.notifData.item.sender_pic}` || undefined,
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
    margin: 3,
  },
  wrapperNew: {
    height: 80,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    margin: 3,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.1,
    elevation: 1,
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
    width: '55%',
    marginLeft: 10,
  },
  avatarContainer: {
    alignSelf: 'center',
    // flex: 1,
    width: '15 %',
    marginLeft: 1,
  },
  avatar: {
    justifyContent: 'flex-start',
    width: '100%',
  },
  button: {
    minWidth: '17%',
    width: 'auto',
    // flex: 1,
    borderRadius: 7.5,
    height: 30,
    paddingRight: 15,
    paddingLeft: 15,
    margin: 'auto',
    justifyContent: 'center',
    color: 'black',
    backgroundColor: '#00FF9D',
    alignItems: 'flex-end',
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

export default connect(null, {
  markNotification,
})(ConnectionNotification);

// export default ConnectionNotification;
