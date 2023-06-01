import axios from 'axios';
import React, {useEffect, useRef} from 'react';
import {useState} from 'react';
import {ScrollView, View, Text, Dimensions} from 'react-native';
import styled from 'styled-components/native';
import {LineGraph} from './LineGraph';
import {MainButtonBG, TopButton, ButtonText} from './MainButton';
import notifee from '@notifee/react-native';

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
const SleepTime = styled.View`
  width: ${Dimensions.get('window').width * 0.91};
`;

export const GraphContainer = (props: {
  content: '문열림' | '수면시간' | '냉장고열림';
}) => {
  const [timeData, setTimeData] = useState<number[][]>();
  const [dailyData, setDailyData] = useState<number[][]>();
  const [weeklyData, setWeeklyData] = useState<number[][]>();

  const [refriTime, setRefriTime] = useState<number[]>([0, 0, 0, 0, 0, 0]);
  const [doorTime, setDoorTime] = useState<number[]>([0, 0, 0, 0, 0, 0]);
  const [sleepTime, setSleepTime] = useState<number[]>([1]);
  const [refriDay, setRefriDay] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);
  const [doorDay, setDoorDay] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);
  const [sleepDay, setSleepDay] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);
  const [refriWeek, setRefriWeek] = useState<number[]>([0, 0, 0, 0]);
  const [doorWeek, setDoorWeek] = useState<number[]>([0, 0, 0, 0]);
  const [sleepWeek, setSleepWeek] = useState<number[]>([0, 0, 0, 0]);
  const [sleeping, setSleeping] = useState(true);
  const [sleepStack, setSleepStack] = useState(0);
  const [nonSleepStack, setNonSleepStack] = useState(0);

  const onDisplayNotification = async ({
    title = '알림',
    body = '수면중 장시간 움직임 없음',
  }: {
    title?: string;
    body?: string;
  }) => {
    const channelId = await notifee.createChannel({
      id: 'channelId',
      name: 'channelName',
    });

    await notifee.displayNotification({
      title,
      body,
      android: {
        channelId,
      },
    });
  };
  const showNoti = () => {
    sleepDay[6] == 15 ? onDisplayNotification({}) : null;
  };

  const settingSleepStack = () => {
    if (sleepTime[0] == 1) {
      setNonSleepStack(0);
      setSleepStack(sleepStack + 1);
      if (sleepStack == 2) {
        setSleeping(true);
        setSleepStack(1);
      }
    } else {
      setSleepStack(0);
      setNonSleepStack(nonSleepStack + 1);
      if (nonSleepStack == 2) {
        setSleeping(false);
        setNonSleepStack(1);
      }
    }
    console.log(sleeping);
    console.log(sleepStack);
    console.log(nonSleepStack);
  };

  const analyzedData = {
    문열림: [doorTime, doorDay, doorWeek],
    수면시간: [
      //key
      sleepTime, //시간단위

      sleepDay, //일단뒤

      sleepWeek, //주단위
    ],

    냉장고열림: [refriTime, refriDay, refriWeek],
  };
  const [analyzeData, setAnalyzeData] = useState(analyzedData);
  const getSleepTimeDay = async () => {
    await axios.get('http://15.164.7.163:8080/sleepTime/day').then(json => {
    
        const numberData = json.data.map((str: string) => parseInt(str));
        const numberReverse = numberData.reverse();

        console.log(json.data.reverse());
        setSleepTime(numberReverse);
      
    });
  }

  const recentData = async () => {
    await axios
      .get('http://15.164.7.163:8080/count/day/refrigerator')
      .then(json => {
        if (json.data.length == 6) {
          const numberData = json.data.map((str: string) => parseInt(str));
          const numberReverse = numberData.reverse();
          setRefriTime(numberReverse);
        }
      });
    await axios
      .get('http://15.164.7.163:8080/count/week/refrigerator')
      .then(json => {
        if (json.data.length == 7) {
          const numberData = json.data.map((str: string) => parseInt(str));
          const numberReverse = numberData.reverse();

          // console.log(json.data.reverse());
          setRefriDay(numberReverse);
        }
      });
    await axios
      .get('http://15.164.7.163:8080/count/month/refrigerator')
      .then(json => {
        if (json.data.length == 4) {
          const numberData = json.data.map((str: string) => parseInt(str));
          const numberReverse = numberData.reverse();

          // console.log(json.data.reverse());
          setRefriWeek(numberReverse);
        }
      });
    await axios.get('http://15.164.7.163:8080/count/day/door').then(json => {
      if (json.data.length == 6) {
        const numberData = json.data.map((str: string) => parseInt(str));
        const numberReverse = numberData.reverse();

        // console.log(json.data.reverse());
        setDoorTime(numberReverse);
      }
    });
    await axios.get('http://15.164.7.163:8080/count/week/door').then(json => {
      if (json.data.length == 7) {
        const numberData = json.data.map((str: string) => parseInt(str));
        const numberReverse = numberData.reverse();

        // console.log(json.data.reverse());
        setDoorDay(numberReverse);
      }
    });
    await axios.get('http://15.164.7.163:8080/count/month/door').then(json => {
      if (json.data.length == 4) {
        const numberData = json.data.map((str: string) => parseInt(str));
        const numberReverse = numberData.reverse();

        // console.log(json.data.reverse());
        setDoorWeek(numberReverse);
      }
    });
    // await axios.get('http://15.164.7.163:8080/sleepTime/day').then(json => {
    //   const numberData = json.data.map((str: string) => parseInt(str));
    //   const numberReverse = numberData.reverse();

    //   console.log(json.data.reverse());
    //   setSleepTime(numberReverse);
    // });
    await axios.get('http://15.164.7.163:8080/sleepTime/week').then(json => {
      if (json.data.length == 7) {
        const numberData = json.data.map((str: string) => parseInt(str));
        const numberReverse = numberData.reverse();
        // console.log(json.data.reverse());
        setSleepDay(numberReverse);
      }
    });
    await axios.get('http://15.164.7.163:8080/sleepTime/month').then(json => {
      if (json.data.length == 4) {
        const numberData = json.data.map((str: string) => parseInt(str));
        const numberReverse = numberData.reverse();

        // console.log(json.data.reverse());
        setSleepWeek(numberReverse);
      }
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
    showNoti();
   
  }, 3000);
  useInterval(() => {
    getSleepTimeDay();
    settingSleepStack();
  },1000)
  return (
    <ScrollViewContainer
      horizontal
      pagingEnabled
      scrollEventThrottle={200}
      decelerationRate="fast"
      showsHorizontalScrollIndicator={false}>
      {['시간', '하루', '주'].map((item, i) => {
        const graphData = analyzeData[props.content][i]; //현제 그래프에 해당하는 데이터값
        const nowData = graphData[graphData.length - 1]; //현재시간의 그래프 값
        let count = 0;
        return (
          <View key={i}>
            {props.content == '수면시간' && item == '시간' ? (
              <SleepTime />
            ) : (
              <LineGraph
                period={item}
                content={props.content}
                analyzeData={graphData}></LineGraph>
            )}
            {props.content == '수면시간' && item == '시간' ? (
              <MainButtonBG
                style={{
                  marginTop: 80,
                }}
                flex={0.7}
                theme=
                {sleepTime[0]==1 ? '#d2c9ff' : '#95f88c'}
                // {sleeping ? '#d2c9ff' : '#95f88c'}
                width={70}>
                <CountText style={{fontSize: 30}}>
                  {sleepTime[0]==1 ? '수면중' : '활동중'}
                  {/* {sleeping ? '수면중' : '활동중'} */}
                </CountText>
              </MainButtonBG>
            ) : (
              <>
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
                  theme={nowData > 7 ? '#95f88c' : '#f59e33'}
                  width={70}>
                  <CountText>
                    현재 {props.content} : {nowData}
                  </CountText>
                </MainButtonBG>
              </>
            )}
          </View>
        );
      })}
    </ScrollViewContainer>
  );
};
