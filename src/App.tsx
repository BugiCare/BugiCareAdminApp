import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Image} from 'react-bootstrap';
import ProfileScreen from './screens/ProfileScreen';
import LiveVideoScreen from './screens/LiveVideoScreen';
import HealthViewScreen from './screens/HealthViewScreen';
import HealthCheckScreen from './screens/HealthCheckScreen';
import messaging from '@react-native-firebase/messaging';

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

import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  Linking,
  FlatList,
} from 'react-native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import styled from 'styled-components/native';
import IconButton from './components/IconButton';
import MainButton, {
  SmallButton,
  TopButton,
  UserList,
} from './components/MainButton';
import {images} from './image';
import PillAlarm from './components/PillAlarm';

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
const Navbar = styled.View`
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
  const [myInfo, setMyInfo] = useState<DataTypes[]>([{id: 99,
    name:"example",
    address: "example",
    age: 99,
    phone: "example"},{id: 99,
      name:"example",
      address: "example",
      age: 99,
      phone: "example"},{id: 99,
        name:"example",
        address: "example",
        age: 99,
        phone: "example"},{id: 99,
          name:"example",
          address: "example",
          age: 99,
          phone: "example"},{id: 99,
            name:"example",
            address: "example",
            age: 99,
            phone: "example"},]);
  const getInfo = () => {
    axios
      .get('http://15.164.7.163:8080/allUser') // 여기에 아마 서버 주소??
      .then(json => {
        const infoData = json.data;
        setMyInfo(infoData);
      });
  };

  useEffect(() => {
    getInfo();
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
      <TopButton flex={0.5} colorTheme={'#9ec9ff'} text={'담당 어르신 목록'}  />
      <WhiteBackGround style={{ paddingBottom: 20,paddingTop:20 }}>
        <ScrollView >
          {myInfo.map((user, i) => {
            return (
              <UserList
                flex={0.5}
                types={images.myInfoIcon}
                text={user.name}
                onPress={() => {
                  navigation.navigate('상세 정보', {user});
                }}></UserList>
            );
          })}
        </ScrollView>
      </WhiteBackGround>
    </MainView>
  );
};
const Stack = createNativeStackNavigator();
const App = ({navigation,route}:any) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <FullView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

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
            <Stack.Screen name="실시간 영상" component={LiveVideoScreen} />
            <Stack.Screen name="분석결과" component={HealthViewScreen} />
            <Stack.Screen name="채팅" component={HealthCheckScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
      </MainView>

      <Navbar>
        <IconButton types={images.homeIcon}  width={18} />
        <IconButton types={images.searchIcon} width={18} />
        <IconButton types={images.myInfoIcon} width={18} />
        <IconButton types={images.settingIcon} width={18} />
      </Navbar>
    </FullView>
  );
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
