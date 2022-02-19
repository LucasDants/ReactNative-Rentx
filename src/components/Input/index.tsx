import React, { useState } from 'react';
import { useTheme } from 'styled-components';

import { Feather } from '@expo/vector-icons'

import {
  Container,
  IconContainer,
  InputText
} from './styles';
import { TextInputProps } from 'react-native';

interface Props extends TextInputProps {
    iconName: React.ComponentProps<typeof Feather>['name']
}

export function Input({ iconName, value, ...rest }: Props){
    const theme = useTheme()

    const [isFocused, setIsFocused] = useState(false)
    const [isFilled, setIsFilled]  = useState(false)

    function handleInputFocus() {
      setIsFocused(true)
    }

    function handleInputBlur() {
      setIsFocused(false)
      setIsFilled(!!value)
      
    }

  return (
    <Container >
        <IconContainer  isFocused={isFocused} >
          <Feather 
            name={iconName} 
            size={24} 
            color={(isFocused || isFilled) ? theme.colors.main : theme.colors.text_detail}
          />
        </IconContainer>
        <InputText  
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          isFocused={isFocused}
          {...rest}
        />
    </Container>
  );
}