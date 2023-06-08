import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {Dimensions, View} from 'react-native';
import {LineChart} from 'react-native-chart-kit';

export const LineGraph = ({period, content, analyzeData}: any) => {
  const [label, setLabels] = useState<string[]>([]);
  const getDay = () => {
    let today = new Date().getDay();
    return today;
  };
  const getKoreanDay = (today: number) => {
    const array = ['일', '월', '화', '수', '목', '금', '토'];
    const koreanDay = array[today];
    let temp: string[] = [];
    array.map((item, i) => {
      temp.push(array[Math.abs(i - today)]);
    });
    return temp.reverse();
  };
  const labelData = {
    시간: ['6시간전', '5시간전', '4시간전', '3시간전', '2시간전', '1시간전'],
    하루: ['6일전', '5일전', '4일전', '3일전', '2일전', '1일전', '오늘'],
    주: ['3주전', '2주전', '1주전', '이번주'],
  };
  type LabelPeriod = keyof typeof labelData;
  const setLabel = (period: LabelPeriod) => {
    setLabels(labelData[period]);
  };
  useEffect(() => {
    setLabel(period);
  }, []);
  return (
    <View>
      <LineChart
        data={{
          labels: label,
          datasets: [
            {
              data: analyzeData,
            },
          ],
          legend: [period],
        }}
        width={Dimensions.get('window').width * 0.91} // from react-native
        height={220}
        fromZero
        withShadow={false}
        chartConfig={{
          backgroundColor: '#9ec9ff',
          backgroundGradientFrom: '#FFFFFF',
          backgroundGradientTo: '#FFFFFF',
          barPercentage: 0.1,
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
          right: 20,
          marginVertical: 10,
          borderRadius: 16,
        }}
      />
    </View>
  );
};
