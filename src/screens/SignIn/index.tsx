import React, { useState } from 'react';
import { KeyboardAvoidingView, StatusBar, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { useTheme } from 'styled-components';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import * as Yup from 'yup'

import {
  Container,
  Header,
  Title,
  SubTitle,
  Form,
  Footer
} from './styles';
import { useNavigation } from '@react-navigation/native';

export function SignIn(){
    const theme = useTheme()
    const navigation = useNavigation()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

  async function handleSignIn() {
    const schema = Yup.object().shape({
      email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
      password: Yup.string().required('Senha obrigatória')
    })

    try {
      await schema.validate({ email, password })
    } catch(err) {
        if(err instanceof Yup.ValidationError) {
          return Alert.alert("Opa", err.message)
        }
        
        return Alert.alert('Error na autenticação', 'Ocorreu um erro ao fazer login, verifique as credenciais')
    }
  }

  function handleNewAccount() {
    navigation.navigate('SignUpFirstStep')
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
          <Header>
              <Title>Estamos{"\n"}quase lá.</Title>
              <SubTitle>
                  Faça seu login para começar{"\n"}
                  uma experiência incrível
              </SubTitle>
          </Header>

          <Form>
              <Input 
                iconName="mail" 
                placeholder="E-mail" 
                keyboardType="email-address" 
                autoCorrect={false} 
                autoCapitalize="none" 
                onChangeText={setEmail} 
                value={email}
              />
              <PasswordInput 
                iconName="lock" 
                placeholder="Senha" 
                onChangeText={setPassword}
                value={password}
              />
          </Form>

          <Footer>
              <Button title="Login" onPress={handleSignIn} enabled={true} loading={false} />
              <Button title="Criar conta" onPress={handleNewAccount} enabled={true} loading={false} light color={theme.colors.background_secondary} />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}