import React, { useState, useEffect } from "react";
import { Accessory } from "../../components/Accessory";
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";

import {
  Container,
  Header,
  CarImages,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  About,
  Footer,
  OfflineInfo
} from "./styles";
import { Button } from "../../components/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Car as ModelCar } from "../../database/models/Car";
import { CarDTO } from '../../dtos/CarDTO'
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";
import api from '../../services/api'
import Animated, { useSharedValue, useAnimatedScrollHandler, useAnimatedStyle, interpolate, Extrapolate } from 'react-native-reanimated'
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { StatusBar } from "react-native";
import { useNetInfo } from '@react-native-community/netinfo'

interface Params {
  car: ModelCar
}

export function CarDetails() {
  const navigation = useNavigation()
  const route = useRoute()
  const netInfo = useNetInfo()

  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO)

  const scrollY = useSharedValue(0)
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y
  })

  const headerStyleAnimation = useAnimatedStyle(() => ({
    height: interpolate(
      scrollY.value,
      [0, 200],
      [200, 70],
      Extrapolate.CLAMP
    )
  }))

  const sliderCarsStyleAnimation = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollY.value,
      [0, 150],
      [1, 0]
    )
  }))

  const { car } = route.params as Params

  function handleConfirmRental() {
    navigation.navigate('Scheduling', { car })
  }

  useEffect(() => {
    async function fetchCarUpdated() {
      const response = await api.get(`/cars/${car.id}`)
      setCarUpdated(response.data)

    }

      if(netInfo.isConnected === true) {
        fetchCarUpdated()
      }

  }, [netInfo.isConnected])

  return (
    <Container>
      <StatusBar backgroundColor="transparent" translucent barStyle="dark-content" />
      <Animated.View 
        style={[headerStyleAnimation]}
      >
        <Header>
          <BackButton onPress={() => navigation.goBack()} />
        </Header>
        <Animated.View style={[sliderCarsStyleAnimation]}>
          <CarImages>
            <ImageSlider imagesUrl={
              !!carUpdated.photos ? carUpdated.photos : [{ id: car.thumbnail, photo: car.thumbnail}]
            } />
          </CarImages>
        </Animated.View>
      </Animated.View>
      <Animated.ScrollView 
        contentContainerStyle={{paddingHorizontal: 24, paddingTop: getStatusBarHeight(), alignItems: 'center'}} 
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {netInfo.isConnected === true ? car.price : '...'}</Price>
          </Rent>
        </Details>

        {
          carUpdated.accessories && (
            <Accessories>
              {
                carUpdated.accessories.map(accessory => 
                  <Accessory key={accessory.type} name={accessory.name} icon={getAccessoryIcon(accessory.type)}  />
                )
              }
            </Accessories>
          )
        }

        <About>{car.about}</About>
      </Animated.ScrollView>
      <Footer>
        <Button title="Escolher período do aluguel" onPress={handleConfirmRental} enabled={netInfo.isConnected === true} />
      </Footer>
      {
        netInfo.isConnected === false && (
          <OfflineInfo>Conecte-se a internet para ver mais detalhes e agendar seu carro.</OfflineInfo>
        )
      }
    </Container>
  );
}
