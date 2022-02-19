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
import { getPlatformDate } from "../../utils/getPlatformDate";
import { format } from "date-fns";
import api from "../../services/api";
import { Alert } from "react-native";

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
  const { car, dates } = route.params as Params

  const rentTotal = Number(dates.length * car.rent.price)

  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriodData>({} as RentalPeriodData)
  const [loading, setLoading] = useState(false)

  async function handleConfirmRental() {
    setLoading(true)
    const schedulesByCar = await api.get(`schedules_bycars/${car.id}`)

    const unavailable_dates = [...schedulesByCar.data.unavailable_dates, ...dates]


   await api.post('schedules_byuser', {
      car,
      user_id: 1,
      startDate: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      endDate:  format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy')
  })

    api.put(`schedules_bycars/${car.id}`, {
      id: car.id,
      unavailable_dates
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
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      end:  format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy')
    })
  }, [])

  return (
    <Container>
      <Header>
        <BackButton onPress={() => navigation.goBack()} />
      </Header>
      <CarImages>
        <ImageSlider
          imagesUrl={car.photos}
        />
      </CarImages>
      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {
            car.accessories.map(accessory => 
              <Accessory key={accessory.type} name={accessory.name} icon={getAccessoryIcon(accessory.type)} />
            )
          }
        </Accessories>
   
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
              <RentalPriceQuota>R$ {`${car.rent.price} x${dates.length}`} diárias</RentalPriceQuota>
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
