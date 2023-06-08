import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import moment from 'moment';


interface AlarmType{
  alarmTime: Date,
  title:string
}

const Alarm = ({alarmTime,title}:AlarmType) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);


  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };



//   const scheduleAlarm = (date: Date) => {
//     PushNotification.localNotificationSchedule({
//       message: 'Alarm!',
//       date: date,
//     });
//   };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{title }</Text>
      {
        <Text style={styles.alarmTime}>
          {moment(alarmTime).format('h:mm A')}
        </Text>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    padding:10,
    marginLeft: 40,
    marginRight:100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: 30,
    fontFamily:'BMJUA',
    marginBottom: 20,
  },
  alarmTime: {
    fontSize: 24,
    fontFamily:'BMJUA',
    marginVertical: 24,
  },
});

export default Alarm;