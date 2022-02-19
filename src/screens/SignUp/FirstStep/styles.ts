import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native'

export const Container = styled.View`
    padding: 0 24px;

    background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    margin-top: ${getStatusBarHeight() + 30}px;
`

export const Steps = styled.View`
    flex-direction: row;
    align-items: center;
`

export const Title = styled.Text`
    color: ${({theme}) => theme.colors.title};
    font-family: ${({theme}) => theme.fonts.secondary_600};
    font-size: ${RFValue(40)}px;
    
    margin-top: 60px;
    margin-bottom: 16px;
`

export const Subtitle = styled.Text`
    color: ${({theme}) => theme.colors.text};
    font-family: ${({theme}) => theme.fonts.primary_400};
    font-size: ${RFValue(15)}px;

    line-height: ${RFValue(25)}px;
`

export const Form = styled.View`
    width: 100%;
    margin-top: 64px;
    margin-bottom: 16px;
`

export const FormTitle = styled.Text`
    color: ${({theme}) => theme.colors.title};
    font-family: ${({theme}) => theme.fonts.secondary_600};
    font-size: ${RFValue(20)}px;

    margin-bottom: 24px;

`