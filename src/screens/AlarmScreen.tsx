import React, {useState} from 'react';
import Alarm from '../components/Alarm';
import {SmallButton, TopButton} from '../components/MainButton';
import {WhiteBackGround, MainView} from '../App';
import {Button, ScrollView, TextInput} from 'react-native';
import styled from 'styled-components/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useEffect } from 'react';
import axios from 'axios';

const AlarmContainer = styled.ScrollView`
  height: 100px;
  padding-top: 20px;
`;
const AlarmTextInput = styled.TextInput`
width:80%;
height:50px;
margin:auto;
text-align:center;
border:2px solid #9ec9ff;
border-radius:30px;
font-size:20px;
font-family:BMJUA;
margin-top:10px
`
interface AlarmTypes {
    id: number;
    title: string;
    time: Date;
  }
const AlarmScreen = () => {
  
  return (
    <MainView>
      <WhiteBackGround>
        <TopButton colorTheme={'#9ec9ff'} text={'실시간 영상'}></TopButton>
        <AlarmContainer>
          
        </AlarmContainer>
      </WhiteBackGround>
    </MainView>
  );
};
export default AlarmScreen;