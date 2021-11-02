import React from 'react'
import  VictoryPie from "victory-native";
import  View  from 'react-native'


const  pieChart=({width, height, innerRadius, labelRadius,  style, data, events ,textX, textY, textAnchor, styleText, text, ...other}) =>{
return(
    <View>

       
    <VictoryPie
      standalone={false}
      innerRadius={innerRadius}
      labelRadius={labelRadius}
      style={style}
      data={data}
      events={events}
      {...other}
    />
   

  </View>

)
}

export default pieChart
