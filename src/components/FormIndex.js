import {
  Box, Button, Text, TextField,
} from '@skynexui/components';
import React from 'react';
import { useRouter } from 'next/router';
import appConfig from '../../config.json';
import Titulo from './Titulo';

export default function FormIndex(props) {
  const roteamento = useRouter();
  const { username } = props;
  let timer;
  const WastTime = 1000;

  return (
    <Box

      as="form"
      onSubmit={(e) => {
        e.preventDefault();
        // console.log('Alguém submeteu o form');
        roteamento.push(`/chat?username=${username}`);
      }}
      styleSheet={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: { xs: '100%', sm: '50%' },
        textAlign: 'center',
        marginBottom: '32px',
      }}
    >

      <Titulo
        tag="h2"
      >
        Boas vindas de volta!

      </Titulo>

      <Text variant="body3" styleSheet={{ marginBottom: '40px', color: appConfig.theme.colors.secondary['200'] }}>
        {appConfig.name}
      </Text>

      <TextField
        value={username}
        onKeyUp={(event) => {
          props.setFlag(false);
          // console.log('usuario digitou', event.target.value);

          // adquirir o valor do parametro event.

          // clear timer
          clearTimeout(timer);

          const { value } = event.target;

          // Wait for X ms and then process the request
          timer = setTimeout(() => {
            console.log(value);
            props.setUsername(value);
            props.setFlag(true);
          }, WastTime);

          // colocar o valor na função de estado do React, para que este possa fazer a alteração do valor onde for necessário
        }}
        fullWidth
        textFieldColors={{
          neutral: {
            textColor: appConfig.theme.colors.neutrals['600'],
            mainColor: appConfig.theme.colors.secondary['600'],
            mainColorHighlight: appConfig.theme.colors.secondary['800'],
            backgroundColor: appConfig.theme.colors.secondary['200'],
          },
        }}
      />

      <Button
        type="submit"
        label="Entrar"
        disabled={!(username.length > 2)}
        fullWidth
        buttonColors={{
          contrastColor: appConfig.theme.colors.primary['100'],
          mainColor: appConfig.theme.colors.primary['600'],
          mainColorLight: appConfig.theme.colors.secondary['400'],
          mainColorStrong: appConfig.theme.colors.primary['400'],
        }}

      />

    </Box>

  );
}
