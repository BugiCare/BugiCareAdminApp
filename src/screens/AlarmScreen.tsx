import React, {useState} from 'react';
import Alarm from '../components/Alarm';
import {SmallButton, TopButton} from '../components/MainButton';
import {WhiteBackGround, MainView} from '../App';
import {Button, ScrollView, TextInput} from 'react-native';
import styled from 'styled-components/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useEffect } from 'react';
import axios from 'axios';

const AlarmContainer = styled.ScrollView`
  height: 100px;
  padding-top: 20px;
`;
const AlarmTextInput = styled.TextInput`
width:80%;
height:50px;
margin:auto;
text-align:center;
border:2px solid #9ec9ff;
border-radius:30px;
font-size:20px;
font-family:BMJUA;
margin-top:10px
`
interface AlarmTypes {
    id: number;
    title: string;
    time: Date;
  }
const AlarmScreen = () => {
  const [alarmNumber, setAlarmNumber] = useState<number[]>([]);
  const [isTextInputVisible, setTextInputVisible] = useState(false);
  const [title, setTitle] = useState<string>('');
  const [alarmID, setAlarmID] = useState(0);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [alarmTime, setAlarmTime] = useState(new Date());
  const [alarmInfo, setAlarmInfo] = useState<AlarmTypes[]>([]);
  const [postTitle,setPostTitle] = useState('')
  
  useEffect(()=>{console.log(alarmInfo)},[alarmInfo])

  const showTextInput = () => {
    setTextInputVisible(true);
  };

  const hideTextInput = () => {
    setTextInputVisible(false);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    console.warn('A date has been picked: ', date);
    setAlarmTime(date);
    const newAlarm = { id: alarmID ,title:title,time:alarmTime}
      const array = [...alarmInfo,newAlarm ];
    setAlarmInfo(array);
    hideTextInput();
    setTitle('')

    hideDatePicker();
    
    // scheduleAlarm(date);
  };

  //   const scheduleAlarm = (date: Date) => {
  //     PushNotification.localNotificationSchedule({
  //       message: 'Alarm!',
  //       date: date,
  //     });
  //   };

  const addAlarmTime = () => {
    setPostTitle(title)
    console.log(postTitle)
   
  };

  const getProfileImage = () => {
    axios
      .post('https://15.164.7.163',{data:postTitle})
      .then(json => {
        console.log(json.data);
      })
      .catch(error => console.log(error))
      .then(() => console.log('it works'));
  };
  useEffect(() => {
    getProfileImage();
  },[postTitle]);

  const addAlarmTitle = () => {

    showTextInput();

  };
  return (
    <MainView>
      <WhiteBackGround>
        <TopButton colorTheme={'#9ec9ff'} text={'실시간 영상'}></TopButton>
        <AlarmContainer>
          <AlarmTextInput
          value={title}
          onChangeText={text => setTitle(text)}
            returnKeyType="next"
            autoCorrect
            onSubmitEditing={addAlarmTime}>
          </AlarmTextInput>
        </AlarmContainer>
      </WhiteBackGround>
    </MainView>
  );
};
export default AlarmScreen;