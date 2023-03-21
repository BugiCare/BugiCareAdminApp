import React from 'react';
import {Dimensions, View} from 'react-native';
import {LineChart} from 'react-native-chart-kit';

export const LineGraph = ({ period, content }: any) => {
    
    
  return (
    <View>
      <LineChart
        data={{
          labels: ['일', '월', '화', '수', '목', '금', '토'],
          datasets: [
            {
              data: [2, 5, 4, 5, 6, 7, 3],
            },
          ],
          legend: [period],
        }}
        width={Dimensions.get('window').width * 0.9} // from react-native
        height={220}
        fromZero
        withShadow={false}
        chartConfig={{
          backgroundColor: '#9ec9ff',
          backgroundGradientFrom: '#FFFFFF',
          backgroundGradientTo: '#FFFFFF',
          barPercentage: 0.5,
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
  );
};
