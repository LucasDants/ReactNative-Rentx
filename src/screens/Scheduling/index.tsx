import React, { useState } from "react";
import { useTheme } from "styled-components";
import { BackButton } from "../../components/BackButton";

import ArrowSvg from "../../assets/arrow.svg";

import { 
    Container, 
    Header, 
    Title,
    RentalPeriod,
    DateInfo,
    DateTitle,
    DateValue,
    Content,
    Footer,
 } from "./styles";
import { StatusBar } from "react-native";
import { Button } from "../../components/Button";
import { Calendar, DayProps, generateInterval, MarkedDateProps } from "../../components/Calendar";
import { useNavigation, useRoute } from "@react-navigation/native";
import { format, parseISO } from "date-fns";
import { CarDTO } from "../../dtos/CarDTO";

interface RentalPeriodData {
  startFormatted: string;
  endFormatted: string;
}
interface Params {
  car: CarDTO
}

export function Scheduling() {
  const theme = useTheme();
  const navigation = useNavigation()
  const route = useRoute()

  const { car } = route.params as Params

  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps)
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps)
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriodData>({} as RentalPeriodData)


  function handleConfirmRental() {
    navigation.navigate('SchedulingDetails', {
      car,
      dates: Object.keys(markedDates)
    })
  }

  function handleChangeDate(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate
    let end = date;

    if(start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end)

    const interval = generateInterval(start, end)
    setMarkedDates(interval)

    const firstDate = Object.keys(interval)[0]
    const lastDate = Object.keys(interval)[Object.keys(interval).length - 1]

    setRentalPeriod({
      startFormatted: format(parseISO(firstDate), 'dd/MM/yyyy'),
      endFormatted: format(parseISO(lastDate), 'dd/MM/yyyy'),
    })
  }

  return (
    <Container>
      <Header>
        <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
        <BackButton onPress={() => navigation.goBack()} color={theme.colors.shape} />
        <Title>
          Escolha uma {"\n"}
          data de início e {"\n"}
          fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={!!rentalPeriod.startFormatted}>{rentalPeriod.startFormatted}</DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormatted}>{rentalPeriod.endFormatted}</DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

        <Content>
            <Calendar 
              markedDates={markedDates}
              onDayPress={handleChangeDate}
            />
        </Content>

        <Footer>
            <Button title="Confirmar" onPress={handleConfirmRental} enabled={!!rentalPeriod.endFormatted} />
        </Footer>

    </Container>
  );
}
