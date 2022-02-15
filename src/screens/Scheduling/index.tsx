import React from "react";
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
import { Calendar } from "../../components/Calendar";
import { useNavigation } from "@react-navigation/native";

export function Scheduling() {
  const theme = useTheme();
  const navigation = useNavigation()

  function handleConfirmRental() {
    navigation.navigate('SchedulingDetails')
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
            <DateValue selected={true}>18/10/2020</DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={false}></DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

        <Content>
            <Calendar />
        </Content>

        <Footer>
            <Button title="Confirmar" onPress={handleConfirmRental} />
        </Footer>

    </Container>
  );
}
