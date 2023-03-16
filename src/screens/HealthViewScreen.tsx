import {LogoImage, MainView, WhiteBackGround} from '../App';
import React from 'react';
import { LineGraph } from '../components/LineGraph';
import {SmallButton, TopButton} from '../components/MainButton';
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
const HealthScrollView = styled.FlatList`
  flex: 1;
`;
const Container = styled.SafeAreaView`
  flex-grow: 2;
`;
var lineGraph :any= {
    'act': <LineGraph />, // scrollView 안에 차트들 있는 형식으로 해야함
    'door': <LineGraph />,
    'refri': <LineGraph/>,
    
} // state 상태에 따라 다른 컴포넌트 렌더링

const HealthViewScreen = () => {
  const [selectedInfo, setSelectedInfo] = useState('act');

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
        <TopButton colorTheme={'#9ec9ff'} text={'행동 분석'} />
        <SelectBarView>
          <SelectBar
            theme={selectedInfo=='act'?'#d2c9ff':'#9ec9ff'}
            onPress={() => {
              setSelectedInfo('act');
            }}>
            <SelectBarText>활동시간</SelectBarText>
          </SelectBar>
          <SelectBar
            theme={selectedInfo=='door'?'#d2c9ff':'#9ec9ff'}
            onPress={() => {
              setSelectedInfo('door');
            }}>
            <SelectBarText>문 열림</SelectBarText>
          </SelectBar>
          <SelectBar
            theme={selectedInfo=='refri'?'#d2c9ff':'#9ec9ff'}
            onPress={() => {
              setSelectedInfo('refri');
            }}>
            <SelectBarText>냉장고 열림</SelectBarText>
          </SelectBar>
        </SelectBarView>
        {/* <HealthScrollView data ={healthData} renderItem={renderItem}/> */}
        {lineGraph[selectedInfo]}
      </WhiteBackGround>
    </MainView>
  );
};
export default HealthViewScreen;
