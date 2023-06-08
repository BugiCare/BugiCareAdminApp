import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import ProfileScreen from './screens/ProfileScreen';
import LiveVideoScreen from './screens/LiveVideoScreen';
import HealthViewScreen from './screens/HealthViewScreen';
import HealthCheckScreen from './screens/HealthCheckScreen';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import {notiContext} from './AppContext';
import {notiValue} from './AppContext';

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    await messaging()
      .getToken()
      .then(fcmToken => {
        console.log('token: ', fcmToken);
      })
      .catch(e => console.log('error: ', e));
  }
}

const onDisplayNotification = async ({
  title = '긴급알림',
  body = '쓰러짐',
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

import {
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import styled from 'styled-components/native';
import IconButton from './components/IconButton';
import {
  TopButton,
  UserList,
} from './components/MainButton';
import {images} from './image';


interface PropsType {
  width: number;
}
interface DataTypes {
  id: number;
  name: string;
  address: string;
  age: number;
  phone: string;
}

const FullView = styled.SafeAreaView`
  flex: 1;
  flex-direction: column;
`;
export const Navbar = styled.View`
  height: 70;
  flex-direction: row;
  padding-left: 5;
  padding-right: 5;
  align-items: center;
  justify-content: space-between;
  background-color: white;
`;
const Logo = styled.TouchableOpacity`
  flex: 1;
  align-items: flex-start;
`;
const MenuIcon = styled.TouchableOpacity`
  flex: 1;
  align-items: flex-end;
`;
export const LogoImage = styled.Image<PropsType>`
  width: ${props => props.width}%;
  justify-content: center;
  align-items: center;
`;
export const MainView = styled.View`
  flex: 6;
  background-color: #d8ecff;
`;
const EmergencyView = styled(MainView)`
  flex: 1;
`;
export const WhiteBackGround = styled.View`
  width: 90%;
  height: 500px;
  margin: auto;
  margin-top: 10px;
  background: #ffffff;
  border-radius: 30px;
`;
const HomeScreen = ({navigation, route}: any) => {
  const [myInfo, setMyInfo] = useState<DataTypes[]>([
    {id: 99, name: 'example', address: 'example', age: 99, phone: 'example'},
    {id: 99, name: 'example', address: 'example', age: 99, phone: 'example'},
    {id: 99, name: 'example', address: 'example', age: 99, phone: 'example'},
    {id: 99, name: 'example', address: 'example', age: 99, phone: 'example'},
    {id: 99, name: 'example', address: 'example', age: 99, phone: 'example'},
  ]);
  const [profileImg, setProfileImg] = useState<string[]>(['']);
  const [profile, setProfile] = useState('');
  const getProfileImage = () => {
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((item, i) => {
      axios
        .get(`http://15.164.7.163:8080/userImage/${i + 1}`, {
          responseType: 'blob',
        })
        .then(response => {
          const imageBlob = new Blob([response.data]);
          const imageUrl = URL.createObjectURL(imageBlob);
          setProfileImg([...profileImg, imageUrl]);
        });
    });

    axios
      .get(`http://15.164.7.163:8080/userImage/1`, {
        responseType: 'blob',
      })
      .then(response => {
        const imageBlob = new Blob([response.data]);
        const imageUrl = URL.createObjectURL(imageBlob);
        setProfile(imageUrl);
      });
  };
  const getInfo = () => {
    axios
      .get('http://15.164.7.163:8080/allUser') // 여기에 아마 서버 주소??
      .then(json => {
        const infoData = json.data;
        setMyInfo(infoData);
      });
  };

  useEffect(() => {
    requestUserPermission();
    getInfo();
    getProfileImage();
    console.log(profileImg);

    // onDisplayNotification({});
  }, []);

  return (
    <MainView>
      <Navbar>
        <Logo>
          <LogoImage source={images.mainLogo} width={80} resizeMode="contain" />
        </Logo>
        <MenuIcon>
          <LogoImage source={images.menuIcon} width={30} resizeMode="contain" />
        </MenuIcon>
      </Navbar>
      <TopButton flex={0.5} colorTheme={'#9ec9ff'} text={'담당 어르신 목록'} />
      <WhiteBackGround style={{paddingBottom: 20, paddingTop: 20}}>
        <ScrollView>
          {myInfo.map((user, i) => {
            return (
              <UserList
                flex={0.5}
                types={images.myInfoIcon}
                text={user.name}
                onPress={() => {
                  navigation.navigate('상세 정보', {user});
                }}></UserList>
              // <UserLists user={user}
             
              // ></UserLists>
            );
          })}
        </ScrollView>
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
const Stack = createNativeStackNavigator();
const App = ({navigation, route}: any) => {
  const [fallenValue, setFallenValue] = useState(true);
  const showNoti = () => {
    onDisplayNotification({});
    setFallenValue(false);
  };
  const getNoti = () => {
    if (fallenValue) {
      axios.get('http://15.164.7.163:8080/fallen').then(json => {
        const infoData = json.data;
        // console.log(infoData);
        infoData != true ? console.log(infoData) : showNoti();
      });
      setTimeout(() => {
        setFallenValue(true);
      }, 10000);
    }
  };
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
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useInterval(() => {
    getNoti();
  }, 3000);
  useEffect(() => {
    setFallenValue(true);
    setTimeout(() => {
      SplashScreen.hide();
    }, 1500);
  }, []);
  try {
    return (
      <notiContext.Provider value={getNoti}>
        <notiValue.Provider value={'true'}>
          <FullView style={backgroundStyle}>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            />

            <MainView>
              <NavigationContainer>
                <Stack.Navigator>
                  <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen name="상세 정보" component={ProfileScreen} />
                  <Stack.Screen
                    name="실시간 영상"
                    component={LiveVideoScreen}
                  />
                  <Stack.Screen name="분석결과" component={HealthViewScreen} />
                  <Stack.Screen name="채팅" component={HealthCheckScreen} />
                </Stack.Navigator>
              </NavigationContainer>
            </MainView>
          </FullView>
        </notiValue.Provider>
      </notiContext.Provider>
    );
  } finally {
    SplashScreen.hide();
  }
};
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
});

export default App;
