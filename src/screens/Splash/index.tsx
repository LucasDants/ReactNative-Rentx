import React, { useEffect } from 'react';

import BrandSvg from '../../assets/brand.svg'
import LogoSvg from '../../assets/logo.svg'

import Animated, {
     useSharedValue, 
     useAnimatedStyle,
     withTiming,
     Easing,
     interpolate,
     Extrapolate,
     runOnJS
} from 'react-native-reanimated'

import {
  Container
} from './styles';
import { useNavigation } from '@react-navigation/native';

export function Splash(){
    const navigation = useNavigation()
    const splashAnimation = useSharedValue(0)

    const brandStyle = useAnimatedStyle(() => ({
        opacity: interpolate(splashAnimation.value, 
            [0, 50], // periodo da animação (a opacity vai de 0-50 com duração de 1s)
            [1, 0],  // o q ocorre em cada periodo
        ),
        transform: [
            {
                translateX: interpolate(splashAnimation.value,
                    [0, 50],
                    [0, -50],
                    Extrapolate.CLAMP  
                )
            }
        ]
    }))

    const logoStyle = useAnimatedStyle(() => ({
        opacity: interpolate(splashAnimation.value, 
            [0, 25, 50], 
            [0, 0.3, 1]
        ),
        transform: [
            {
                translateX: interpolate(splashAnimation.value,
                    [0, 50],
                    [-50, 0],
                    Extrapolate.CLAMP  
                )
            }
        ]
    }))

    function startApp() {
        navigation.navigate('Home')
    }

    useEffect(() => {
        splashAnimation.value = withTiming(
            50, 
            { duration: 1000},
            () => {
                'worklet'
                runOnJS(startApp)()
            }
        )
    }, [])

  return (
    <Container>
        <Animated.View style={[brandStyle, {position: 'absolute'}]}>
            <BrandSvg width={80} height={50} />
        </Animated.View>

        <Animated.View style={[logoStyle, {position: 'absolute'}]}>
            <LogoSvg width={180} height={20} /> 
        </Animated.View>
    </Container>
  );
}

