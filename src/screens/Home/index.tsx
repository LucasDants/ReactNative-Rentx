import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize';

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

export function Home(){
  const navigation = useNavigation()

  const [cars, setCars] = useState<CarDTO[]>([])
  const [loading, setLoading] = useState(true)

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car })
  }

  useEffect(() => {
    let isMounted = true;

    async function fetchCars() {
      try {
        const response = await api.get<CarDTO[]>('cars');
        if(isMounted) {
          setCars(response.data)
        }
      } catch (err) {
        console.log(err)
      } finally {
        if(isMounted) {
          setLoading(false)
        }
      }
    }

    fetchCars()

    return () => {
      isMounted = false
    };
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