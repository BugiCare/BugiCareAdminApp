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
  content: '수면시간' | '문열림' | '냉장고열림';
}) => {
  const [timeData, setTimeData] = useState<number[][]>();
  const [dailyData, setDailyData] = useState<number[][]>();
  const [weeklyData, setWeeklyData] = useState<number[][]>();

  const [refriTime, setRefriTime] = useState<number[]>([]);
  const [doorTime, setDoorTime] = useState<number[]>([]);
  const [sleepTime, setSleepTime] = useState<number[]>([]);
  const [refriDay, setRefriDay] = useState<number[]>([]);
  const [doorDay, setDoorDay] = useState<number[]>([]);
  const [sleepDay, setSleepDay] = useState<number[]>([]);
  const [refriWeek, setRefriWeek] = useState<number[]>([]);
  const [doorWeek, setDoorWeek] = useState<number[]>([]);
  const [sleepWeek, setSleepWeek] = useState<number[]>([]);

  const analyzedData = {
    수면시간: [
      //key
      sleepTime, //시간단위

      sleepDay, //일단뒤

      sleepWeek, //주단위
    ],
    문열림: [doorTime, doorDay, doorWeek],
    냉장고열림: [refriTime, refriDay, refriWeek],
  };
  const [analyzeData, setAnalyzeData] = useState(analyzedData);

  const recentData = async () => {
    await axios
      .get('http://15.164.7.163:8080/count/day/refrigerator')
      .then(json => {
        const numberData = json.data.map((str: string) => parseInt(str));
        const numberReverse = numberData.reverse();

        console.log(json.data.reverse() + 'reday');
        setRefriTime(numberReverse);
      });
    await axios
      .get('http://15.164.7.163:8080/count/week/refrigerator')
      .then(json => {
        // const numberData = json.data.map((str: string) => parseInt(str));
        const numberData = json.data.map((str: string) => parseInt(str));
        const numberReverse = numberData.reverse();

        console.log(json.data.reverse());
        setRefriDay(numberReverse);
      });
    await axios
      .get('http://15.164.7.163:8080/count/month/refrigerator')
      .then(json => {
        const numberData = json.data.map((str: string) => parseInt(str));
        const numberReverse = numberData.reverse();

        console.log(json.data.reverse());
        setRefriWeek(numberReverse);
      });
    await axios.get('http://15.164.7.163:8080/count/day/door').then(json => {
      const numberData = json.data.map((str: string) => parseInt(str));
      const numberReverse = numberData.reverse();

      console.log(json.data.reverse());
      setDoorTime(numberReverse);
    });
    await axios.get('http://15.164.7.163:8080/count/week/door').then(json => {
      const numberData = json.data.map((str: string) => parseInt(str));
      const numberReverse = numberData.reverse();

      console.log(json.data.reverse());
      setDoorDay(numberReverse);
    });
    await axios.get('http://15.164.7.163:8080/count/month/door').then(json => {
      const numberData = json.data.map((str: string) => parseInt(str));
      const numberReverse = numberData.reverse();

      console.log(json.data.reverse());
      setDoorWeek(numberReverse);
    });
    await axios.get('http://15.164.7.163:8080/sleepTime/day').then(json => {
      const numberData = json.data.map((str: string) => parseInt(str));
      const numberReverse = numberData.reverse();

      console.log(json.data.reverse());
      setSleepTime(numberReverse);
    });
    await axios.get('http://15.164.7.163:8080/sleepTime/week').then(json => {
      const numberData = json.data.map((str: string) => parseInt(str));
      const numberReverse = numberData.reverse();

      console.log(json.data.reverse());
      setSleepDay(numberReverse);
    });
    await axios.get('http://15.164.7.163:8080/sleepTime/month').then(json => {
      const numberData = json.data.map((str: string) => parseInt(str));
      const numberReverse = numberData.reverse();

      console.log(json.data.reverse());
      setSleepWeek(numberReverse);
    });
  };
  useEffect(() => {
    recentData();
    setAnalyzeData(analyzedData);
  }, []);
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
    setAnalyzeData(analyzedData);
  }, 3000);
  return (
    <ScrollViewContainer
      horizontal
      pagingEnabled
      scrollEventThrottle={200}
      decelerationRate="fast"
      showsHorizontalScrollIndicator={false}>
      {['시간', '하루', '주'].map((item, i) => {
        const graphData = analyzeData[props.content][i]; //현제 그래프에 해당하는 데이터값
        const nowData = graphData[graphData.length - 1]; //현재 그래프의 평균
        return (
          <View key={i}>
            <LineGraph
              period={item}
              content={props.content}
              analyzeData={graphData}></LineGraph>
            <MainButtonBG flex={1} theme={'#9ec9ff'} width={70}>
              <CountText>
                {item} 평균 {props.content} :{' '}
                {Math.floor(
                  (graphData.reduce((a: number, c: number) => a + c, 0) /
                    graphData.length) *
                    10,
                ) / 10}
              </CountText>
            </MainButtonBG>
            <MainButtonBG
              flex={1}
              theme={nowData > 7 ? '#95f88c' : '#ef3333'}
              width={70}>
              <CountText>
                현재 {props.content} : {nowData}
              </CountText>
            </MainButtonBG>
          </View>
        );
      })}
    </ScrollViewContainer>
  );
};
