import React, { useEffect, useState } from "react";
import { Accessory } from "../../components/Accessory";
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import {Feather} from '@expo/vector-icons'

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
  Footer
} from "./styles";
import { Button } from "../../components/Button";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CarDTO } from "../../dtos/CarDTO";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";
import { format, parseISO } from "date-fns";
import api from "../../services/api";
import { Alert } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";

interface Params {
  car: CarDTO
  dates: string[]
}

interface RentalPeriodData {
  start: string;
  end: string;
}

export function SchedulingDetails() {
  const theme = useTheme()
  const navigation = useNavigation()
  const route = useRoute()
  const netInfo = useNetInfo()

  const { car, dates } = route.params as Params

  const rentTotal = Number(dates.length * car.price)

  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO)
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriodData>({} as RentalPeriodData)
  const [loading, setLoading] = useState(false)

  async function handleConfirmRental() {
    setLoading(true)


   await api.post('rentals', {
      car_id: car.id,
      start_date: new Date(dates[0]),
      end_date: new Date(dates[dates.length - 1]),
      total: rentTotal
  }).then(() => {
      navigation.navigate('Confirmation', {
            nextScreenRoute: 'Home',
            title: 'Carro alugado!',
            message: " Agora você só precisa ir\naté a concessionária da RENTX\npegar o seu automóvel."
        })
    }).catch(() => {
      setLoading(false)
      Alert.alert('Não foi possível confirmar o agendamento.')
    })

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

  useEffect(() => {
    setRentalPeriod({
      start: format(parseISO(dates[0]), 'dd/MM/yyyy'),
      end:  format(parseISO(dates[dates.length - 1]), 'dd/MM/yyyy')
    })
  }, [])

  return (
    <Container>
      <Header>
        <BackButton onPress={() => navigation.goBack()} />
      </Header>
      <CarImages>
         <ImageSlider imagesUrl={
              !!carUpdated.photos ? carUpdated.photos : [{ id: car.thumbnail, photo: car.thumbnail}]
          } />
      </CarImages>
      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {car.price}</Price>
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
   
          <RentalPeriod>
            <CalendarIcon>
              <Feather name="calendar" size={RFValue(24)} color={theme.colors.shape} />
            </CalendarIcon>
            <DateInfo>
              <DateTitle>DE</DateTitle>
              <DateValue>{rentalPeriod.start}</DateValue>
            </DateInfo>

            <Feather name="chevron-right" size={RFValue(10)} color={theme.colors.text} />

            <DateInfo>
              <DateTitle>ATÉ</DateTitle>
              <DateValue>{rentalPeriod.end}</DateValue>
            </DateInfo>

          </RentalPeriod>

          <RentalPrice>
            <RentalPriceLabel>TOTAL</RentalPriceLabel>
            <RentalPriceDetails>
              <RentalPriceQuota>R$ {`${car.price} x${dates.length}`} diárias</RentalPriceQuota>
              <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
            </RentalPriceDetails>
          </RentalPrice>

      </Content>
      <Footer>
        <Button title="Alugar agora" color={theme.colors.success} onPress={handleConfirmRental} enabled={!loading} loading={loading} />
      </Footer>


    </Container>
  );
}
