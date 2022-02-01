import {
  Box, Text, Image, Button, Icon,
} from '@skynexui/components';
import React from 'react';
import appConfig from '../../config.json';
import {
  handleDeleteMessage,
} from '../../services/handleSupaBase';
import Loading from './loading';

export default function MessageList(props) {
  console.log('MessageList: ', props.content);

  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column-reverse',
        flex: 1,
        color: appConfig.theme.colors.neutrals['100'],
        marginBottom: '16px',
      }}
    >
      {/* Messages */}

      {!props.content.dataLoaded
        ? (
          <Loading />
        ) : (
          <>
            {props.content.listaDeMensagens.map((mensagem) => {
              { /* list of message */ }

              return (

                <Text
                  key={mensagem.id}
                  tag="li"
                  styleSheet={{
                    width: '300px',
                    wordWrap: 'break-word',
                    borderRadius: '5px',
                    padding: '10px',
                    marginBottom: '15px',
                    marginRight: 'auto',
                    border: `2px solid ${appConfig.theme.colors.secondary['600']}`,
                    hover: {
                      border: `2px solid ${appConfig.theme.colors.secondary['300']}`,
                    },
                  }}
                >
                  <Box
                    styleSheet={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '10px',
                      padding: '7px 3px',
                      borderBottom: `3px solid ${appConfig.theme.colors.secondary['500']}`,
                      hover: {
                        borderBottom: `3px solid ${appConfig.theme.colors.secondary['300']}`,
                      },
                    }}
                  >

                    <Box
                      styleSheet={{
                        marginRight: '7px',

                      }}

                      onMouseEnter={() => {
                        props.setOverBoolean(!props.content.overBoolean);
                      }}

                      onMouseLeave={() => {
                        props.setOverBoolean(!props.content.overBoolean);
                      }}
                    >
                      {!props.content.overBoolean && (
                        <Image
                          styleSheet={{
                            width: '35px',
                            height: '35px',
                            borderRadius: '10%',
                            display: 'inline-block',
                            marginRight: '5px',
                          }}

                          src={`https://github.com/${mensagem.de}.png`}
                        />
                      )}

                      {props.content.overBoolean && (
                        <Box
                          styleSheet={{
                            position: 'relative',
                            display: 'flex',
                            padding: '5px',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            borderRadius: '10%',
                            flexDirection: 'column',

                            backgroundColor: appConfig.theme.colors.primary['500'],
                            border: `2px ${appConfig.theme.colors.primary['200']}`,
                            hover: {
                              transform: 'scale(1.5)',
                              transition: '2s ease',
                            },

                          }}
                        >
                          <a
                            href={`https://github.com/${mensagem.de}`}

                            style={{
                              marginLeft: '10px',
                              marginRight: 'auto',
                              display: 'flex',
                              flexDirection: 'column',
                              color: appConfig.theme.colors.neutrals['100'],
                              textDecoration: 'none',
                            }}
                          >
                            <Image
                              styleSheet={{
                                width: '35px',
                                height: '35px',
                                borderRadius: '10%',
                                display: 'inline-block',
                                marginRight: '5px',
                                marginBottom: '5px',
                              }}

                              src={`https://github.com/${mensagem.de}.png`}
                            />
                            <Box
                              tag="span"
                              styleSheet={{
                                display: 'flex',
                                flexDirection: 'row',
                                fontSize: '10px',
                              }}
                            >
                              <Icon
                                name="FaGithub"
                                styleSheet={{
                                  marginRight: '5px',
                                }}
                              />
                              {mensagem.de}
                            </Box>
                          </a>
                        </Box>
                      )}

                    </Box>

                    <Text tag="strong">
                      {mensagem.de}
                    </Text>
                    <Text
                      styleSheet={{
                        fontSize: '10px',
                        marginLeft: '10px',
                        color: appConfig.theme.colors.neutrals['100'],
                      }}
                      tag="span"
                    >
                      {(new Date().toLocaleDateString())}
                    </Text>

                    <Button
                      iconName="times"
                      variant="tertiary"
                      styleSheet={{
                        maxWidth: '35px',
                        maxHeight: '35px',
                        marginLeft: 'auto',
                        paddingRight: '3px',
                        color: appConfig.theme.colors.neutrals['100'],
                        hover: {
                          transition: '.50s ease',
                          backgroundColor: `${appConfig.theme.colors.neutrals['050']}`,
                          color: `${appConfig.theme.colors.primary['500']}`,
                        },
                      }}
                      onClick={(event) => {
                        event.preventDefault();

                        handleDeleteMessage(mensagem);
                      }}
                    />

                  </Box>

                  {
                    mensagem.texto.startsWith(':sticker:')
                      ? (
                        <Image
                          styleSheet={{
                            maxWidth: '75px',
                            maxHeight: '75px',
                          }}
                          src={mensagem.texto.replace(':sticker:', '')}
                        />
                      )
                      : (
                        mensagem.texto
                      )
                  }
                </Text>

              );

              { /* list of message */ }
            })}
          </>
        )}

      {/* Messages */}
    </Box>
  );
}
