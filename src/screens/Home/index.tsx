import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, BackHandler } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize';
import { Ionicons } from '@expo/vector-icons'

import Animated, { useSharedValue, useAnimatedStyle, useAnimatedGestureHandler, withSpring } from 'react-native-reanimated'
import { RectButton, PanGestureHandler } from 'react-native-gesture-handler'

import Logo from '../../assets/logo.svg'
import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';
import { CarDTO } from '../../dtos/CarDTO';
import api from '../../services/api';

import {
    Container,
    Header,
    TotalCars,
    HeaderContent,
    CarList,
} from './styles';
import { useTheme } from 'styled-components';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton)

export function Home(){
  const navigation = useNavigation()
  const theme = useTheme()

  const [cars, setCars] = useState<CarDTO[]>([])
  const [loading, setLoading] = useState(true)

  const positionY = useSharedValue(0)
  const positionX = useSharedValue(0)

  const myCarsButtonStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: positionX.value },
      { translateY: positionY.value }
    ]
  }))

  const onGestureEvent = useAnimatedGestureHandler({
      onStart(_, context: any) {
        context.positionX = positionX.value
        context.positionY = positionY.value
      },
      onActive(event, ctx) {
        positionX.value = event.translationX + ctx.positionX
        positionY.value = event.translationY + ctx.positionY
      },
      onEnd() {
        // positionX.value = withSpring(0);
        // positionX.value = withSpring(0);
      }
  })

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car })
  }

  function handleOpenMyCars() {
    navigation.navigate('MyCars')
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get<CarDTO[]>('cars');
        setCars(response.data)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    fetchCars()
  }, [])

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true)
    
  }, [])

  return (
    <Container>
        <StatusBar barStyle='light-content' backgroundColor="transparent" translucent />
        <Header>
            <HeaderContent>
                <Logo width={RFValue(108)} height={RFValue(12)} />
                {
                  !loading &&
                  <TotalCars>Total de {cars.length} carros</TotalCars>
                }
            </HeaderContent>
        </Header>
        {
          loading ? <LoadAnimation /> :
          <CarList 
            data={cars}
            keyExtractor={item  => item.id}
            renderItem={({ item }) => <Car data={item} onPress={() => handleCarDetails(item)} />}
          />
        }
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View
            style={[
              myCarsButtonStyle,
              {
                position: 'absolute',
                bottom: 13,
                right: 22
              }
            ]}
          >
            <ButtonAnimated style={[styles.button, { backgroundColor: theme.colors.main }]} onPress={handleOpenMyCars}>
              <Ionicons name="ios-car-sport" size={32} color={theme.colors.shape} />
            </ButtonAnimated>
          </Animated.View>
        </PanGestureHandler>
    </Container>
  );
}


const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
})