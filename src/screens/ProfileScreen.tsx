import axios from 'axios';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';
import styled from 'styled-components/native';
import MainButton, {SmallButton, TopButton} from '../components/MainButton';
import {images} from '../image';
import {WhiteBackGround, MainView} from '../App';
import TimePicker from '../components/Alarm';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HealthViewScreen from './HealthViewScreen';

interface SelectBarTheme {
  theme: string;
}
const SelectBarView = styled.View`
  flex: 1;
  left: 5%;
  width: 90%;
  flex-direction: row;
  position: absolute;
`;
const SelectBar = styled.Pressable<SelectBarTheme>`
  flex: 1;
  width: 45%;
  height: 100px;
  margin-top: 10px;
  background: ${props => props.theme};
  border-radius: 30px;
  align-items: center;
`;
const SelectBarText = styled.Text`
  padding-top: 12px;
  font-size: 22px;
`;
const ProfilePhoto = styled.Image`
  flex: 1;
  height: 130px;
  align-items: flex-start;
  width: 30%;
`;
const ProfileTextBox = styled.View`
  flex: 0.2;
  flex-direction: row;
  align-items: center;
  margin: 10px;
`;
const ProfileTextKey = styled.Text`
  margin-left: 10px;
  margin-right: 10px;
  font-weight: 400;
  font-size: 15px;
  padding: 9px;
  align-items: center;
  text-align: center;
  background: #f3dede;
  border-radius: 50px;
`;
const Stack = createNativeStackNavigator();
const ProfileScreen = ({navigation, route}: any) => {
  const [num, setNum] = useState(0);
  const [profileImg, setProfileImg] = useState('');
  const [selectedInfo, setSelectedInfo] = useState('#93ddff');
  const [user,setUserInfo] = useState(route.params.user)

  const nextNum = () => {
    setNum(num + 1);
    console.log(num);
  };


  const getProfileImage = () => {
    axios.get('http://127.0.0.1:5001/image2').then(json => {
      const img = json.data;
      
      setProfileImg(`data:image/png;base64,${img.img}`);
    });
  };
  useEffect(() => {
    getProfileImage();
  }, []);
  return (

    <MainView>
      
        
      
      <WhiteBackGround style={{height: 450}}>
        <TopButton colorTheme="#9ec9ff" text="?????? ??????" />
        <View style={{flex: 0.7, flexDirection: 'row'}}>
          <ProfilePhoto source={{uri: profileImg}} resizeMode="contain" />
          <View style={{flex: 1, justifyContent: 'center'}}></View>
        </View>
        <ProfileTextBox>
          <ProfileTextKey>??????</ProfileTextKey>
          <Text>{route.params.user.name}</Text>
          <ProfileTextKey>??????</ProfileTextKey>
          <Text>{route.params.user.age}???</Text>
        </ProfileTextBox>
        <ProfileTextBox>
          <ProfileTextKey>????????????</ProfileTextKey>
          <Text>{route.params.user.id}</Text>
        </ProfileTextBox>
        <ProfileTextBox>
          <ProfileTextKey>?????????</ProfileTextKey>
          <Text>0{route.params.user.phoneNum}</Text>
        </ProfileTextBox>
        <ProfileTextBox>
          <ProfileTextKey>??????</ProfileTextKey>
          <Text>{route.params.user.address}</Text>
        </ProfileTextBox>
        <View style={{flex: 0.2}}></View>
      </WhiteBackGround>
      <SmallButton
        colorTheme={'#F1B6B6'}
        text={'?????? ??????'}
        types={images.phoneIcon}
      />
      <SmallButton
        colorTheme={'#F1B6B6'}
        text={'?????? ?????? ??????'}
        types={images.phoneIcon}
        onPress={() => {
          navigation.navigate('????????????'); // ????????? ???????????? ????????? ???
        }}
      />
      <SmallButton
        colorTheme={'#F1B6B6'}
        text={'?????? ?????? ??????'}
        types={images.phoneIcon}
      />
      
    </MainView>
  );
};
export default ProfileScreen;
