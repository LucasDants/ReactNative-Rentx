import React, { useEffect, useState } from 'react';
import { FlatList, StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { Car } from '../../components/Car';
import { AntDesign } from '@expo/vector-icons'

import api from '../../services/api';

import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from './styles';
import { LoadAnimation } from '../../components/LoadAnimation';

import { Car as ModelCar } from '../../database/models/Car'
import { format, parseISO } from 'date-fns';
import { useIsFocused } from '@react-navigation/native';
interface DataProps {
  id: string;
  car: ModelCar
  start_date: string;
  end_date: string
}

export function MyCars(){
  const theme = useTheme()

  const [cars, setCars] = useState<DataProps[]>([])
  const [loading, setLoading] = useState(true)
  const screenIsFocus = useIsFocused()

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get("/rentals")

        const dataFormatted = response.data.map((data: DataProps) => {
          return {
            id: data.id,
            car: data.car,
            start_date: format(parseISO(data.start_date), 'dd/MM/yyyy'),
            end_date: format(parseISO(data.end_date), 'dd/MM/yyyy')
          }
        })

        setCars(dataFormatted)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    if(screenIsFocus === true) {
      fetchCars()
    }
  }, [screenIsFocus])



  return (
    <Container>
      <Header>
        <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
        <Title>
          Escolha uma {"\n"}
          data de início e {"\n"}
          fim do aluguel
        </Title>
        <SubTitle>
          Conforto, segurança e praticidade.
        </SubTitle>
      </Header>
      {
        loading ? <LoadAnimation /> :
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
          </Appointments>

          <FlatList 
            data={cars}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CarWrapper>
                <Car data={item.car} />
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.start_date}</CarFooterDate>
                    <AntDesign name="arrowright" size={20} color={theme.colors.title} style={{marginHorizontal: 10}} />
                    <CarFooterDate>{item.end_date}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      }
    </Container>
  );
}