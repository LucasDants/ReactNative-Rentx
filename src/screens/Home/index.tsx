import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize';

import { synchronize } from "@nozbe/watermelondb/sync"
import { database } from '../../database'
import { Car as ModelCar } from '../../database/models/Car'
import Logo from '../../assets/logo.svg'
import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';
import api from '../../services/api';

import {
    Container,
    Header,
    TotalCars,
    HeaderContent,
    CarList,
} from './styles';
import { useNetInfo } from '@react-native-community/netinfo';

export function Home(){
  const navigation = useNavigation()
  const netInfo = useNetInfo()

  const [cars, setCars] = useState<ModelCar[]>([])
  const [loading, setLoading] = useState(true)

  function handleCarDetails(car: ModelCar) {
    navigation.navigate('CarDetails', { car })
  }

  async function offlineSynchronize() {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const { data } = await api.get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`)

        const { changes, latestVersion } = data

        return { changes, timestamp: latestVersion }

      },
      pushChanges: async ({ changes }) => {
          const user = changes.users
          await api.post("/users/sync", user).catch(console.log)
      },
    })
  }

  useEffect(() => {
    if(netInfo.isConnected === true) {
      offlineSynchronize()
    }

  }, [netInfo.isConnected])

  useEffect(() => {
    let isMounted = true;

    async function fetchCars() {
      try {
        const carCollection = database.get<ModelCar>('cars')
        const cars = await carCollection.query().fetch()

        if(isMounted) {
          setCars(cars)
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

