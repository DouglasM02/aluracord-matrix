import React from 'react';
import {
  Box, TextField, Button,
} from '@skynexui/components';
import { ButtonSendSticker } from './ButtonSendSticker';
import appConfig from '../../config.json';
import MessageList from './MessageList';
import HeaderChat from './HeaderChat';
import {
  handleNewMessage,
} from '../../services/handleSupaBase';

export default function BuildOfChat(props) {
  console.log('build: ', props.content);

  return (
    <Box
      styleSheet={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
        borderRadius: '5px',
        backgroundColor: appConfig.theme.colors.primary['500'],
        height: '100%',
        maxWidth: '95%',
        maxHeight: '95vh',
        padding: '32px',
      }}
    >
      <HeaderChat />

      <Box
        styleSheet={{
          position: 'relative',
          display: 'flex',
          flex: 1,
          height: '80%',
          backgroundColor: appConfig.theme.colors.neutrals['700'],
          flexDirection: 'column',
          borderRadius: '5px',
          padding: '16px',
        }}
      >

        <MessageList
          content={props.content}
          setMensagem={props.setMensagem}
          setListaDeMensagens={props.setListaDeMensagens}
          setOverBoolean={props.setOverBoolean}
          setData={props.setDataLoaded}
        />

        <Box
          as="form"
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <TextField
            value={props.content.mensagem}
            onChange={(event) => {
              const valor = event.target.value;
              props.setMensagem(valor);
            }}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                handleNewMessage(props.content.mensagem, props.content.usuarioLogado);
                props.setMensagem('');
              }
            }}
            placeholder="Insira sua mensagem aqui..."
            type="textarea"
            styleSheet={{
              width: '100%',
              height: '50px',
              border: '0',
              resize: 'none',
              borderRadius: '10px',
              padding: '6px 8px',
              backgroundColor: appConfig.theme.colors.tertiary['100'],
              marginRight: '12px',
              color: appConfig.theme.colors.primary['800'],
            }}
          />

          <ButtonSendSticker
            onStickerClick={(sticker) => {
              handleNewMessage(`:sticker: ${sticker}`, props.content.usuarioLogado);
              props.setMensagem('');
            }}
          />

          <Button
            onClick={(event) => {
              event.preventDefault();

              handleNewMessage(props.content.mensagem, props.content.usuarioLogado);
              props.setMensagem('');
            }}
            variant="tertiary"
            colorVariant="positive"
            label="Enviar"

            styleSheet={{
              marginLeft: '7px',
              borderRadius: '15%',
              padding: '0 3px 0 3px',
              Width: '50px',
              Height: '50px',
              fontSize: '20px',
              marginBottom: '8px',
              lineHeight: '0',
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
