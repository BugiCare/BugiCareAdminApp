import {LogoImage, MainView, Navbar, WhiteBackGround} from '../App';
import React from 'react';

import MainButton, {SmallButton, TopButton} from '../components/MainButton';
import {
  Image,
  FlatList,
  ImageSourcePropType,
  View,
  SafeAreaView,
  Text,
  Dimensions,
} from 'react-native';
import {images} from '../image';
import styled from 'styled-components/native';
import {useState} from 'react';
import {useEffect} from 'react';
import {GraphContainer} from '../components/GraphContainer';
import axios from 'axios';
import {NavItem} from 'react-bootstrap';
import IconButton from '../components/IconButton';

interface healthDataType {
  id: number;
  type: ImageSourcePropType;
}
interface SelectBarTheme {
  theme: string;
}
const SelectBarView = styled.View`
  flex: 0.2;
  margin-left: auto;
  margin-right: auto;
  width: 90%;
  flex-direction: row;
`;
const SelectBar = styled.Pressable<SelectBarTheme>`
  flex: 1;
  width: 45%;
  margin: 3px;

  background: ${props => props.theme};
  border-radius: 30px;
  align-items: center;
`;
const SelectBarText = styled.Text`
  padding: 13px;
  font-size: 18px;
  font-family: BMJUA;
`;

const Container = styled.SafeAreaView`
  flex-grow: 2;
`;
var lineGraph: any = {
  활동시간: <GraphContainer content={'활동시간'} />, // scrollView 안에 차트들 있는 형식으로 해야함
  문열림: <GraphContainer content={'문열림'} />,
  냉장고열림: <GraphContainer content={'냉장고열림'} />,
}; // state 상태에 따라 다른 컴포넌트 렌더링

const HealthViewScreen = ({navigation, route}: any) => {
  const [selectedInfo, setSelectedInfo] = useState('활동시간');
  const [springData, setSpringData] = useState('');

  const getProfileImage = () => {
    axios
      .get('https://15.164.7.163')
      .then(json => {
        console.log(json.data);
      })
      .catch(error => console.log(error))
      .then(() => console.log('it works'));
  };
  useEffect(() => {
    getProfileImage();
  });

  const renderItem = ({item}: any) => {
    return (
      <Container>
        <LogoImage source={item.type} width={100} resizeMode="contain" />
      </Container>
    );
  };

  return (
    <MainView>
      <WhiteBackGround style={{height: 550}}>
        <TopButton flex={0.2} colorTheme={'#9ec9ff'} text={'행동 분석'} />
        <SelectBarView>
          {['활동시간', '문열림', '냉장고열림'].map((item, i): any => {
            return (
              <SelectBar
                theme={selectedInfo == item ? '#d2c9ff' : '#9ec9ff'}
                onPress={() => {
                  setSelectedInfo(item);
                }}>
                <SelectBarText>{item}</SelectBarText>
              </SelectBar>
            );
          })}
          {/* <SelectBar
            theme={selectedInfo == 'act' ? '#d2c9ff' : '#9ec9ff'}
            onPress={() => {
              setSelectedInfo('act');
            }}>
            <SelectBarText>활동시간</SelectBarText>
          </SelectBar>
          <SelectBar
            theme={selectedInfo == 'door' ? '#d2c9ff' : '#9ec9ff'}
            onPress={() => {
              setSelectedInfo('door');
            }}>
            <SelectBarText>문 열림</SelectBarText>
          </SelectBar>
          <SelectBar
            theme={selectedInfo == 'refri' ? '#d2c9ff' : '#9ec9ff'}
            onPress={() => {
              setSelectedInfo('refri');
            }}>
            <SelectBarText>냉장고 열림</SelectBarText>
          </SelectBar> */}
        </SelectBarView>
        {/* <HealthScrollView data ={healthData} renderItem={renderItem}/> */}
        {lineGraph[selectedInfo]}
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
export default HealthViewScreen;
