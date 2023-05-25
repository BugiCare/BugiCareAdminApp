import React, {useRef, useState} from 'react';

import {SmallButton, TopButton} from '../components/MainButton';
import {WhiteBackGround, MainView, Navbar} from '../App';
import {Button, Image, ScrollView, Text, TextInput, View} from 'react-native';
import styled from 'styled-components/native';

import {useEffect} from 'react';
import axios from 'axios';
import IconButton from '../components/IconButton';
import { images } from '../image';

const ProfilePhoto = styled.Image`
  flex: 1;
  height: 130px;
  align-items: flex-start;
  width: 100%;
`;

const AlarmContainer = styled.ScrollView`
  height: 100px;
  padding-top: 20px;
`;

const LiveVideoScreen = ({navigation,route}:any) => {
  const [CCTV, setCCTV] = useState('');
  const [imageData, setImageData] = useState('');

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
   getImageData() ;
  }, 100);
  
  const getImageData = () => {
    axios.get('http://3.36.218.186:5000/cctv').then(json => {
      const img = json.data;
      setImageData(`data:image/png;base64,${img.img}`);
    })
  }
  // useEffect(() => {
  //   socket.on('image', data => {
  //     setImageData(data);
  //   });
  // }, []);

  return (
    <MainView>
      <WhiteBackGround>
        <TopButton flex={0.2} colorTheme={'#9ec9ff'} text={'실시간 영상'}></TopButton>
        <ProfilePhoto source={{uri:`${imageData}`}} resizeMode="contain"/>
      </WhiteBackGround>
      <Navbar>
            <IconButton types={images.homeIcon} width={18} onPress={() => { navigation.popToTop()}} />
            <IconButton types={images.searchIcon} width={18} />
            <IconButton types={images.myInfoIcon} width={18} />
            <IconButton types={images.settingIcon} width={18} />
          </Navbar>
    </MainView>
  );
};
export default LiveVideoScreen;
