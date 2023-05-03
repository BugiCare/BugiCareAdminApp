import { LogoImage } from "../App";
import React from "react";
import { images } from "../image";
import { ImageSourcePropType, Pressable } from "react-native";
import styled from "styled-components/native";
type PropsType={
    types: ImageSourcePropType,
    width: number,
    onPress?:()=>void
}
interface ButtonType{
    width:number
}

export const Button = styled.Pressable<ButtonType>`
width:${props =>props.width}%;
`

const IconButton = ({types,width,onPress}:PropsType )=> {
    return (
        <Button hitSlop={5} width ={width} onPress={onPress}>
            <LogoImage source={types} width={100} resizeMode='contain'/>
        </Button>
    )
 };

export default IconButton;
