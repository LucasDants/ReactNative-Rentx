import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg'
import { Car } from '../../components/Car';

import {
    Container,
    Header,
    TotalCars,
    HeaderContent,
    CarList
} from './styles';

export function Home(){
  const navigation = useNavigation()

  const carData = [{
    brand: 'audi',
    name: 'RS 5 Coupé',
    rent: {
      period: 'ao dia',
      price: 120,
    },
    thumbnail: 'https://toppng.com/uploads/preview/audi-11530986691mytcdhkpad.png'
  },
  {
    brand: 'audi',
    name: 'RS 5 Coupé',
    rent: {
      period: 'ao dia',
      price: 120,
    },
    thumbnail: 'https://toppng.com/uploads/preview/audi-11530986691mytcdhkpad.png'
  }
]

  function handleCarDetails() {
    navigation.navigate('CarDetails')
  }

  return (
    <Container>
        <StatusBar barStyle='light-content' backgroundColor="transparent" translucent />
        <Header>
            <HeaderContent>
                <Logo width={RFValue(108)} height={RFValue(12)} />
                <TotalCars>Total de 12 carros</TotalCars>
            </HeaderContent>
        </Header>
        <CarList 
          data={carData}
          keyExtractor={item  => item.name}
          renderItem={({ item }) => <Car data={item} onPress={handleCarDetails} />}
        />
    </Container>
  );
}