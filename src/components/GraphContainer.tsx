import React from "react"
import { ScrollView, View } from "react-native"
import styled from "styled-components/native"
import { LineGraph } from "./LineGraph"

const ScrollViewContainer = styled.ScrollView`
flex:1.5;

`

export const GraphContainer = ({content}:any) => {
    return (
        <ScrollViewContainer
            horizontal
            pagingEnabled
            scrollEventThrottle={200}
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
        >
            {['시간', '하루', '주'].map((item,i) => {
                return (
    <LineGraph period={item} content={content}></LineGraph>
)})}
        </ScrollViewContainer>
    )
}