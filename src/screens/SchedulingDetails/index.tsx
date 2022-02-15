import React from "react";
import { Accessory } from "../../components/Accessory";
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import {Feather} from '@expo/vector-icons'
import speedSvg from "../../assets/speed.svg";
import accelerationSvg from "../../assets/acceleration.svg";
import forceSvg from "../../assets/force.svg";
import gasolineSvg from "../../assets/gasoline.svg";
import exchangeSvg from "../../assets/exchange.svg";
import peopleSvg from "../../assets/people.svg";

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

export function SchedulingDetails() {
  const theme = useTheme()

  return (
    <Container>
      <Header>
        <BackButton onPress={() => {}} />
      </Header>
      <CarImages>
        <ImageSlider
          imagesUrl={[
            "https://toppng.com/uploads/preview/audi-11530986691mytcdhkpad.png",
          ]}
        />
      </CarImages>
      <Content>
        <Details>
          <Description>
            <Brand>Audi</Brand>
            <Name>TT</Name>
          </Description>
          <Rent>
            <Period>AO DIA</Period>
            <Price>R$ 120</Price>
          </Rent>
        </Details>

        <Accessories>
          <Accessory name="380Km/h" icon={speedSvg} />
          <Accessory name="3.2s" icon={accelerationSvg} />
          <Accessory name="800 HP" icon={forceSvg} />
          <Accessory name="Gasolina" icon={gasolineSvg} />
          <Accessory name="Auto" icon={exchangeSvg} />
          <Accessory name="2 pessoas" icon={peopleSvg} />
        </Accessories>
   
          <RentalPeriod>
            <CalendarIcon>
              <Feather name="calendar" size={RFValue(24)} color={theme.colors.shape} />
            </CalendarIcon>
            <DateInfo>
              <DateTitle>DE</DateTitle>
              <DateValue>18/02/2020</DateValue>
            </DateInfo>

            <Feather name="chevron-right" size={RFValue(10)} color={theme.colors.text} />

            <DateInfo>
              <DateTitle>ATÉ</DateTitle>
              <DateValue>18/02/2020</DateValue>
            </DateInfo>

          </RentalPeriod>

          <RentalPrice>
            <RentalPriceLabel>TOTAL</RentalPriceLabel>
            <RentalPriceDetails>
              <RentalPriceQuota>R$ 580 x3 diárias</RentalPriceQuota>
              <RentalPriceTotal>R$ 2.900</RentalPriceTotal>
            </RentalPriceDetails>
          </RentalPrice>

      </Content>
      <Footer>
        <Button title="Confirmar" />
      </Footer>


    </Container>
  );
}
