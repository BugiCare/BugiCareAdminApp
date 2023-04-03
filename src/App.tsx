import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Image} from 'react-bootstrap';
import ProfileScreen from './screens/ProfileScreen';
import AlarmScreen from './screens/AlarmScreen';
import HealthViewScreen from './screens/HealthViewScreen';

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
  id: string;
  name: string;
  address: string;
  age: number;
  phoneNum: number;
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
  const [myInfo, setMyInfo] = useState<DataTypes[]>([
    {id: '1', name: '김용남', address: '98세', age: 193, phoneNum: 1},
  ]);
  const getInfo = () => {
    axios
      .get(
        'https://raw.githubusercontent.com/BugiCare/BugiCareUserApp/master/src/data.json',
      ) // 여기에 아마 서버 주소??
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

      <WhiteBackGround style={{paddingBottom: 20}}>
        <TopButton colorTheme={'#9ec9ff'} text={'담당 어르신 목록'} />
        {myInfo.map((user,i) => {
          return (
            <UserList
          types={images.myInfoIcon}
          text={user.name}
          onPress={() => {
            navigation.navigate('상세 정보',{user});
          }}></UserList>
          )
        })}
       
      </WhiteBackGround>
    </MainView>
  );
};
const Stack = createNativeStackNavigator();
const App = () => {
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
            <Stack.Screen name="실시간 영상" component={AlarmScreen} />
            <Stack.Screen name="분석결과" component={HealthViewScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </MainView>

      <Navbar>
        <IconButton types={images.homeIcon} width={18} />
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
