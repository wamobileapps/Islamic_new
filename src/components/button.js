import React from 'react'
import {Button} from 'react-native-paper'

export default ({label, color, style, mode,  zeroMargin, onPress, loading ,contentStyle, ...other}) => {    
    return(
        <Button
        labelStyle={style}
            style={[{ marginLeft:  15,marginRight:15, height: 44,  borderRadius: 28, color: '#000' }, style ]}
            loading={loading}
            mode ={mode || 'contained'}
            contentStyle={{  ...contentStyle }}
            color={color}
            onPress={!loading ? onPress : null}
            {...other}
        >
            {label}
        </Button>
    )
}

