import {LogoImage, MainView, Navbar, WhiteBackGround} from '../App';
import React from 'react';
import {ButtonText, SmallButton, TopButton} from '../components/MainButton';
import {
  Image,
  FlatList,
  ImageSourcePropType,
  View,
  SafeAreaView,
  TextInput,
  Text,
  ScrollView,
  Button,
  Pressable,
} from 'react-native';
import {images} from '../image';
import styled from 'styled-components/native';
import {useState} from 'react';
import {useEffect} from 'react';
import axios from 'axios';
import IconButton from '../components/IconButton';
import {AnyStyledComponent} from 'styled-components';
type MainButtonType = {
  onPress?: () => void;
};

const TTSButton = styled.Pressable<MainButtonType>`
display:flex;
height:40;
  margin
  margin-top: 10px;
  margin-bottom: 10px;
  padding-left: 10;
  padding-right: 10;
  color:#e8b4bc
  background-color: #E8B4BC;
  border-radius: 100px;
`;

const TTSButtonText = styled.Text`
  font-size: 20;
  font-family: 'BMJUA';
  text-align: center;
  margin: auto;
  color: #040202;
`;

const AlarmTextInput = styled.TextInput`
  width: 80%;
  height: 50px;
  margin: auto;
  text-align: center;
  border: 2px solid #9ec9ff;
  border-radius: 30px;
  font-size: 20px;
  font-family: BMJUA;
  margin-top: 10px;
`;

const HealthScrollView = styled.FlatList`
  flex: 1;
`;
const Container = styled.SafeAreaView`
  flex-grow: 1;
`;

const HealthCheckScreen = ({navigation, route}: any) => {
  const [title, setTitle] = useState<string>();
  const [hello, setHello] = useState([
    '좋은 아침이에요',
    '오늘 하루는 어떠셨나요?',
    '행복한 하루 되세요',
  ]);
  const [health, setHealth] = useState([
    '아픈곳은 없으세요?',
    '스트레칭 해주세요',
  ]);
  const [meal, setMeal] = useState([
    '식사하실 시간이에요',
    '약은 챙겨 드셨나요?',
  ]);
  const handleSubmit = (data: string) => {
    const formData = new FormData();
    formData.append('name', data);

    axios
      .post('http://192.168.1.3:5000/tts', formData)
      .then(function (response) {
        console.log(response);
        console.log(formData);
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log('onSubmitEditing');
  };
  return (
    <MainView>
      <WhiteBackGround>
        <TopButton flex={0.15} colorTheme={'#9ec9ff'} text={'스피커로 대화'} />

        <TopButton flex={0.1} colorTheme={'#d2c9ff'} text={'안부인사'} />
        <View style={{flex: 0.15}}>
          <FlatList
            horizontal={true}
            data={hello}
            renderItem={itemData => {
              return (
                <TTSButton
                  onPress={() => {
                    handleSubmit(itemData.item);
                  }}>
                  <TTSButtonText>{itemData.item}</TTSButtonText>
                </TTSButton>
              );
            }}
          />
        </View>
        <TopButton flex={0.1} colorTheme={'#d2c9ff'} text={'건강챙기기'} />
        <View style={{flex: 0.15}}>
          <FlatList
            horizontal={true}
            data={health}
            renderItem={itemData => {
              return (
                <TTSButton
                  onPress={() => {
                    handleSubmit(itemData.item);
                  }}>
                  <TTSButtonText>{itemData.item}</TTSButtonText>
                </TTSButton>
              );
            }}
          />
        </View>
        <TopButton flex={0.1} colorTheme={'#d2c9ff'} text={'식사'} />
        <View style={{flex: 0.15}}>
          <FlatList
            horizontal={true}
            data={meal}
            renderItem={itemData => {
              return (
                <TTSButton
                  onPress={() => {
                    handleSubmit(itemData.item);
                  }}>
                  <TTSButtonText>{itemData.item}</TTSButtonText>
                </TTSButton>
              );
            }}
          />
        </View>
      </WhiteBackGround>
      <Navbar>
        <IconButton
          types={images.homeIcon}
          width={18}
          onPress={() => {
            navigation.popToTop();
          }}
        />
        <IconButton types={images.searchIcon} width={18} />
        <IconButton types={images.myInfoIcon} width={18} />
        <IconButton types={images.settingIcon} width={18} />
      </Navbar>
    </MainView>
  );
};
export default HealthCheckScreen;
