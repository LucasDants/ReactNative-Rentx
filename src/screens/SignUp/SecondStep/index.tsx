import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { PasswordInput } from '../../../components/PasswordInput';
import api from '../../../services/api';

import {
  Container,
  Header,
  Steps,
  Title,
  Subtitle,
  Form,
  FormTitle
} from './styles';

interface Params {
    user: {
        name: string;
        email: string;
        driverLicense: string;
    }
}

export function SignUpSecondStep(){
    const navigation = useNavigation()
    const route = useRoute()
    
    const { user } = route.params as Params
    
    const theme = useTheme()

    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')

    function handleBack() {
        navigation.goBack()
    }

   async function handleRegister() {
        if(!password || !passwordConfirm) { 
            return Alert.alert("Informe a senha e a confirmação")
        }

        if(password !== passwordConfirm) {
            return Alert.alert("As senhas precisam ser iguais")
        }

        await api.post('/users', {
            name: user.name,
            email: user.email,
            driver_license: user.driverLicense,
            password,
        }).then(() => {
            navigation.navigate("Confirmation", {
                nextScreenRoute: 'SignIn',
                title: 'Conta criada',
                message: "Agora é só fazer login\ne aproveitar"
            })
        }).catch(err => {
            Alert.alert('Opa', 'Não foi possível cadastrar')
        })

    }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Header>
                    <BackButton onPress={handleBack} />
                    <Steps>
                        <Bullet />
                        <Bullet active />
                    </Steps>
                </Header>

                <Title>Crie sua{"\n"}conta</Title>
                <Subtitle>Faça seu cadastro de {"\n"}forma rápida e fácil</Subtitle>

                <Form>
                    <FormTitle>2. Senha</FormTitle>

                    <PasswordInput 
                        iconName="lock"
                        placeholder="Senha"
                        onChangeText={setPassword}
                        value={password}
                    />
                    <PasswordInput 
                        iconName="lock"
                        placeholder="Repetir Senha"
                        onChangeText={setPasswordConfirm}
                        value={passwordConfirm}
                    />
                </Form>

                <Button  title="Cadastrar" color={theme.colors.success} onPress={handleRegister} />
            </Container>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}