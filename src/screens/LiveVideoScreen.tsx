import React, {useState} from 'react';

import {SmallButton, TopButton} from '../components/MainButton';
import {WhiteBackGround, MainView} from '../App';
import {Button, Image, ScrollView, Text, TextInput, View} from 'react-native';
import styled from 'styled-components/native';

import {useEffect} from 'react';
import axios from 'axios';
// import io from 'socket.io-client';

const AlarmContainer = styled.ScrollView`
  height: 100px;
  padding-top: 20px;
`;


// const socket = io('http://192.168.1.3:5000');
const LiveVideoScreen = () => {
  const [imageData, setImageData] = useState('');

  // useEffect(() => {
  //   socket.on('image', data => {
  //     setImageData(data);
  //   });
  // }, []);

  return (
    <MainView>
      <WhiteBackGround>
        <TopButton flex={0.2} colorTheme={'#9ec9ff'} text={'실시간 영상'}></TopButton>
        <AlarmContainer>
          <View>
            {imageData ? (
              <Image source={{uri: `data:image/jpeg;base64,${imageData}`}} />
            ) : (
              <Text>Loading...</Text>
            )}
          </View>
        </AlarmContainer>
      </WhiteBackGround>
    </MainView>
  );
};
export default LiveVideoScreen;
