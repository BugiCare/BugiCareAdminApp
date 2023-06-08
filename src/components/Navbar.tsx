import React from 'react';
import {images} from '../image';
import IconButton from './IconButton';
import styled from 'styled-components/native';

const Navbar = styled.View`
  height: 70;
  flex-direction: row;
  padding-left: 5;
  padding-right: 5;
  align-items: center;
  justify-content: space-between;
  background-color: white;
`;

export const NavbarComponent = ({ navigation, route }: any) => {
   
  return (
    <Navbar>
      <IconButton
        types={images.homeIcon}
        width={18}
        onPress={() => {
          navigation.pop();
        }}
      />
      <IconButton types={images.searchIcon} width={18} />
      <IconButton types={images.myInfoIcon} width={18} />
      <IconButton types={images.settingIcon} width={18} />
    </Navbar>
  );
};
