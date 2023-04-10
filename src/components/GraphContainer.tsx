import axios from 'axios';
import React, {useEffect, useRef} from 'react';
import {useState} from 'react';
import {ScrollView, View, Text} from 'react-native';
import styled from 'styled-components/native';
import {LineGraph} from './LineGraph';
import {MainButtonBG, TopButton, ButtonText} from './MainButton';

const ScrollViewContainer = styled.ScrollView`
  flex: 1.5;
`;
const CountText = styled.Text`
  flex: 1;
  text-align: center;
  justify-content: center;
  font-weight: 400;
  font-size: 20px;
  font-family: 'BMJUA';
`;

export const GraphContainer = (props: {
  content: '활동시간' | '문열림' | '냉장고열림';
}) => {
  const [timeData, setTimeData] = useState<number[][]>();
  const [dailyData, setDailyData] = useState<number[][]>();
  const [weeklyData, setWeeklyData] = useState<number[][]>();

  const analyzedData = {
    활동시간: [
      //key
      [0, 1, 2, 3, 4, 5], //시간단위

      [5, 8, 1, 9, 2, 4, 5], //일단뒤

      [4, 3, 2, 1], //주단위
    ],
    문열림: [
      [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20, 21, 22, 23,
      ],

      [0, 0, 0, 0, 0, 0, 0],

      [4, 3, 2, 1],
    ],
    냉장고열림: [
      [1, 2, 3, 4, 5, 6],

      [5, 8, 1, 9, 2, 4, 5],

      [4, 3, 2, 1],
    ],
  };
  const [analyzeData, setAnalyzeData] = useState(analyzedData);

  const recentData = () => {
    axios.get('http://15.164.7.163:8080/count/day/refrigerator').then(json => {
      const temp = analyzedData;
      const numberData = json.data.map((str: string) => parseInt(str));
      const numberReverse = numberData;
      temp.냉장고열림[0] = numberReverse;
      console.log(numberData);
      setAnalyzeData(temp);
    });
  };
    useEffect(() => {
      recentData();
    }, [analyzeData]);
  function useInterval(callback: () => void | (() => void), delay: number) {
    const savedCallback = useRef<() => void | (() => void)>(); // Add type annotation

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      function tick() {
        const cb = savedCallback.current;
        if (cb) {
          const cleanup = cb();
          if (cleanup) {
            return cleanup;
          }
        }
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }
  useInterval(() => {
    recentData();
  }, 1000);
  return (
    <ScrollViewContainer
      horizontal
      pagingEnabled
      scrollEventThrottle={200}
      decelerationRate="fast"
      showsHorizontalScrollIndicator={false}>
      {['시간', '하루', '주'].map((item, i) => {
        return (
          <View key={i}>
            <LineGraph
              period={item}
              content={props.content}
              analyzeData={analyzeData[props.content][i]}></LineGraph>
            <MainButtonBG flex={1} theme={'#9ec9ff'} width={70}>
              <CountText>
                {item} 평균 {props.content} :{' '}
                {Math.floor(
                  (analyzeData[props.content][i].reduce(
                    (a: number, c: number) => a + c,
                    0,
                  ) /
                    analyzeData[props.content][i].length) *
                    10,
                ) / 10}
              </CountText>
            </MainButtonBG>
            <MainButtonBG flex={1} theme={'#9ec9ff'} width={70}>
              <CountText>현재 {props.content} : </CountText>
            </MainButtonBG>
          </View>
        );
      })}
    </ScrollViewContainer>
  );
};