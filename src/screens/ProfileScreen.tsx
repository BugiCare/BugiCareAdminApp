import axios from 'axios';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, Text, View, Alert, Linking} from 'react-native';
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
const FlexContainer = styled.View`
flex-direction:row;
flex:0.5;
margin-left:10px;
margin-right:10px;
`
const Stack = createNativeStackNavigator();
const ProfileScreen = ({navigation, route}: any) => {
  const [num, setNum] = useState(0);
  const [profileImg, setProfileImg] = useState('');
  const [selectedInfo, setSelectedInfo] = useState('#93ddff');
  const [user, setUserInfo] = useState(route.params.user);

  const nextNum = () => {
    setNum(num + 1);
    console.log(num);
  };

  const getProfileImage = () => {
    // axios.get('http://15.164.7.163:8080/userImage/1').then(json => {
    //   const img = json.data;

    //   setProfileImg(`data:image/png;base64,${img.img}`);

    axios
      .get(`http://15.164.7.163:8080/userImage/${route.params.user.id}`, {
        responseType: 'blob',
      })
      .then(response => {
        const imageBlob = new Blob([response.data]);
        const imageUrl = URL.createObjectURL(imageBlob);
        setProfileImg(imageUrl);
      });
  };
  useEffect(() => {
    getProfileImage();
    // setTimeout(() => {
    //   Alert.alert('hi');
    // }, 2000);
  }, []);
  return (
    <MainView>
      <WhiteBackGround style={{height: 450}}>
        <TopButton flex={0.2}colorTheme="#9ec9ff" text="상세 정보" />
        <View style={{flex: 0.7, flexDirection: 'row'}}>
          <ProfilePhoto source={{uri: profileImg}} resizeMode="contain" />
          <View style={{flex: 1, justifyContent: 'center'}}></View>
        </View>
        <ProfileTextBox>
          <ProfileTextKey>성함</ProfileTextKey>
          <Text>{route.params.user.name}</Text>
          <ProfileTextKey>연세</ProfileTextKey>
          <Text>{route.params.user.age}세</Text>
        </ProfileTextBox>
        <ProfileTextBox>
          <ProfileTextKey>주민번호</ProfileTextKey>
          <Text>{route.params.user.id}</Text>
        </ProfileTextBox>
        <ProfileTextBox>
          <ProfileTextKey>연락처</ProfileTextKey>
          <Text>{route.params.user.phone}</Text>
        </ProfileTextBox>
        <ProfileTextBox>
          <ProfileTextKey>주소</ProfileTextKey>
          <Text>{route.params.user.address}</Text>
        </ProfileTextBox>
        <View style={{flex: 0.2}}></View>
      </WhiteBackGround>
      <FlexContainer>
        <SmallButton
          flex={1}
        colorTheme={'#F1B6B6'}
        text={'실시간 영상'}
        types={images.myInfoIcon}
        onPress={() => {
          navigation.navigate('실시간 영상');
        }}
      />
        <SmallButton
          flex={1}
        colorTheme={'#F1B6B6'}
        text={'분석 결과 보기'}
        types={images.settingIcon}
        onPress={() => {
          navigation.navigate('분석결과'); // 어디든 만들어만 놓으면 댐
        }}
        />
      </FlexContainer>
      <FlexContainer>
        <SmallButton
          flex={1}
        colorTheme={'#F1B6B6'}
        text={'긴급 전화'}
        types={images.phoneIcon}
        onPress={() => Linking.openURL(`tel:${route.params.user.phone}`)}
      />
        <SmallButton
          flex={1}
        colorTheme={'#F1B6B6'}
          text={'스피커로 대화'}
        types={images.phoneIcon}
        onPress={()=>{navigation.navigate('채팅')}}
        />
        </FlexContainer>
     
      
    </MainView>
  );
};
export default ProfileScreen;
