import styled from 'styled-components/native';
import IconButton, {Button} from './IconButton';
import React from 'react';
import {ImageSourcePropType, Text} from 'react-native';
import {LogoImage} from '../App';
import {images} from '../image';

interface ButtonTextType {
  fontWeight: number;
  fontSize: number;
}
interface ButtonTheme {
  theme: string;
  flex: number;
}
const UserContainer = styled(Button)`
  width: 100%;
  height:150px;
  flex-direction: row;
  justify-content: flex-start;
  position: relative;
  flex: 0.35;
  margin-bottom: 0;
  padding-left: 20;
  padding-right: 20;
  border-bottom-width: 1px;
  border-top-width: 1px;
  border-color: #9ec9ff;
  align-items: center;
`;

export const MainButtonBG = styled(Button)<ButtonTheme>`
  flex: ${props => props.flex};
  flex-direction: row;
  align-items: center;
  
  position: relative;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-left: 20;
  padding-right: 20;
  background: ${props => props.theme};
  border-radius: 100px;
`;
export const ButtonText = styled.Text<ButtonTextType>`
  font-weight: ${props => props.fontWeight};
  font-size: ${props => props.fontSize}px;
  font-family: 'BMJUA';
text-align:center;
  margin: auto;
  color: #040202;
`;
type MainButtonType = {
  colorTheme?: string;
  text?: string;
  types?: ImageSourcePropType;
  onPress?: () => void;
};
export const UserList = ({text, types, onPress}: MainButtonType) => {
  return (
    <UserContainer width={100} onPress={onPress}>
      <LogoImage source={types} width={20} resizeMode="contain"></LogoImage>
      <ButtonText
        fontWeight={400}
        fontSize={25}
        style={{justifyContent: 'flex-start'}}>
        {text}
          </ButtonText>
          <TopButton colorTheme='#ffffff'></TopButton>
      <IconButton types={images.phoneIcon} width={15}></IconButton>
    </UserContainer>
  );
};

const MainButton = ({text, types, onPress}: MainButtonType) => {
  return (
    <MainButtonBG flex={1} theme={'#9ec9ff'} width={80} onPress={onPress}>
      <LogoImage source={types} width={30} resizeMode="contain"></LogoImage>
      <ButtonText fontWeight={400} fontSize={32}>
        {text}
      </ButtonText>
    </MainButtonBG>
  );
};
export const SmallButton = ({
  colorTheme,
  text,
  types,
  onPress,
}: MainButtonType) => {
  return (
    <MainButtonBG flex={0.8} theme={colorTheme} width={50} onPress={onPress}>
      <LogoImage source={types} width={25} resizeMode="contain"></LogoImage>
      <ButtonText fontWeight={400} fontSize={22}>
        {text}
      </ButtonText>
    </MainButtonBG>
  );
};
export const TopButton = ({colorTheme, text, onPress}: MainButtonType) => {
  return (
    <MainButtonBG flex={0.2} theme={colorTheme} width={50} onPress={onPress}>
      <ButtonText fontWeight={400} fontSize={20}>
        {text}
      </ButtonText>
    </MainButtonBG>
  );
};
export default MainButton;
