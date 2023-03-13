import {LogoImage, MainView, WhiteBackGround} from '../App';
import React from 'react';

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
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';

interface healthDataType {
  id: number;
  type: ImageSourcePropType;
}

const HealthScrollView = styled.FlatList`
  flex: 1;
`;
const Container = styled.SafeAreaView`
  flex-grow: 2;
`;

const HealthViewScreen = () => {
  const [healthData, setHealthData] = useState<healthDataType[]>([]);

  useEffect(() => {
    const hd = [
      {id: 1, type: images.healthview1},
      {id: 2, type: images.healthview2},
    ];
    setHealthData(hd);
  }, []);

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

        {/* <HealthScrollView data ={healthData} renderItem={renderItem}/> */}
        <View>
          <LineChart
            data={{
              labels: ['일', '월', '화', '수', '목', '금', '토'],
              datasets: [
                {
                  data: [2, 5, 4, 5, 6, 7, 3],
                },
              ],
            }}
            width={Dimensions.get('window').width * 0.9} // from react-native
            height={220}
            chartConfig={{
              backgroundColor: '#9ec9ff',
              backgroundGradientFrom: '#FFFFFF',
              backgroundGradientTo: '#FFFFFF',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(0,0,161,${opacity})`,
              labelColor: (opacity = 1) => `rgba(0,0,161, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#9ec9ff',
              },
            }}
            style={{
              marginVertical: 10,
              borderRadius: 16,
            }}
          />
              </View>
              <TopButton colorTheme={'#B9EDF8'} text={'문 열림 횟수'} />
      </WhiteBackGround>
    </MainView>
  );
};
export default HealthViewScreen;
