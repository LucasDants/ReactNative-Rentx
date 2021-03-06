import React, { useState } from 'react';
import { useTheme } from 'styled-components';

import { Feather } from '@expo/vector-icons'

import {
  Container,
  IconContainer,
  InputText,
} from './styles';
import { TextInputProps } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

interface Props extends TextInputProps {
    iconName: React.ComponentProps<typeof Feather>['name']
}

export function PasswordInput({ iconName, value, ...rest }: Props){
    const theme = useTheme()

    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const [isFocused, setIsFocused] = useState(false)
    const [isFilled, setIsFilled]  = useState(false)

    function handleInputFocus() {
      setIsFocused(true)
    }

    function handleInputBlur() {
      setIsFocused(false)
      setIsFilled(!!value)
    }

    function handlePasswordVisibilityChange() {
      setIsPasswordVisible(prevState => !prevState)
    }

  return (
    <Container>
        <IconContainer isFocused={isFocused}>
          <Feather name={iconName} size={24} color={(isFocused || isFilled) ? theme.colors.main : theme.colors.text_detail} />
        </IconContainer>
        <InputText 
          secureTextEntry={!isPasswordVisible}  
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          isFocused={isFocused}
          autoCorrect={false}
          {...rest} 
        />
        <BorderlessButton onPress={handlePasswordVisibilityChange}>
          <IconContainer isFocused={isFocused}>
            <Feather name={isPasswordVisible ? 'eye-off' : 'eye'} size={24} color={theme.colors.text_detail}  />
          </IconContainer>
        </BorderlessButton>
    </Container>
  );
}