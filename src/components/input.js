import React, {useImperativeHandle, forwardRef, useState, useRef} from 'react';

import {TextInput, Button} from 'react-native-paper';
import {View} from 'react-native';

function Input({style, placeHolder,secureTextEntry,inputStyle,onChangeText,keyboardType, value}, ref) {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    blur: () => {
      inputRef.current.blur();
    },
  }));

  return (
      <View>
      <TextInput
      ref={inputRef}
                    secureTextEntry={secureTextEntry}
                    placeholder={placeHolder}
                    autoCorrect={false}
                    underlineColorAndroid="#fff"
                    style={inputStyle}
                    value={value}
                    onChangeText={onChangeText}
                    keyboardType={keyboardType}
                    autoCapitalize={false}
                    />
      </View>
    
  );
}

Input = forwardRef(Input);













export default React.memo(Input);
