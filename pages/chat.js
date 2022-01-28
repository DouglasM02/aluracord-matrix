import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/router';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker';

// Como fazer AJAX: https://medium.com/@omariosouto/entendendo-como-fazer-ajax-com-a-fetchapi-977ff20da3c6
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)


function escutaMensagensEmTempoReal(adicionaMensagem) {
    return supabaseClient
        .from('mensagens')
        .on('INSERT', (respostaLive) => {
            adicionaMensagem(respostaLive.new);
        })
        .subscribe();
}

export default function ChatPage() {
    // Sua lógica vai aqui
    const roteamento = useRouter();
    const usuarioLogado = roteamento.query.username;
    const [mensagem, setMensagem] = React.useState('')
    const [listaDeMensagens, setListaDeMensagens] = React.useState([])
    // ./Sua lógica vai aqui
    //console.log(objeto)
    React.useEffect(() => {
        supabaseClient
            .from('mensagens')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {
                //console.log('Dados de consulta', data)
                setListaDeMensagens(data)
            })

        const subscription = escutaMensagensEmTempoReal((novaMensagem) => {
            //console.log('Nova mensagem:', novaMensagem);
            //console.log('listaDeMensagens:', listaDeMensagens);
            // Quero reusar um valor de referencia (objeto/array) 
            // Passar uma função pro setState

            // setListaDeMensagens([
            //     novaMensagem,
            //     ...listaDeMensagens
            // ])
            setListaDeMensagens((valorAtualDaLista) => {
                //console.log('valorAtualDaLista:', valorAtualDaLista);
                return [
                    novaMensagem,
                    ...valorAtualDaLista,
                ]
            });
        });

        return () => {
            subscription.unsubscribe();
        }

    }, [])


    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
            //id: listaDeMensagens.length + 1,
            de: usuarioLogado,
            texto: novaMensagem,
        }

        supabaseClient
            .from('mensagens')
            .insert([mensagem])
            .then(({ data }) => {
                //setListaDeMensagens([
                //    data[0],
                //    ...listaDeMensagens,
                //])
                //console.log('Criando mensagem: ', data)
            })

        setMensagem('')

        /**/
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[100],
                backgroundImage: `url(https://i.postimg.cc/FFW34Dkg/Praia.jpg)`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.primary['900'],

            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: "rgba(63, 145, 66, 0.75)",
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: "rgba(255, 255, 255, 0.35)",
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                    {/*Ta mudando o valor: {mensagem}*/}
                    <MessageList mensagens={listaDeMensagens} setMensagens={setListaDeMensagens} />
                    {/* {listaDeMensagens.map((mensagemAtual) => {
                        //console.log(mensagemAtual)
                        return (
                            <li key={mensagemAtual.id}>
                                {mensagemAtual.de}: {mensagemAtual.texto}
                            </li>
                        )
                    })} */}

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                                //console.log(event)
                                const valor = event.target.value
                                setMensagem(valor)
                            }}
                            onKeyPress={(event) => {

                                if (event.key === "Enter") {
                                    event.preventDefault()
                                    //console.log(event)
                                    handleNovaMensagem(mensagem)
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
                                backgroundColor: "rgba(255, 255, 255, 0.75)",
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[600],
                            }}
                        />

                        {/* CallBack */}

                        <ButtonSendSticker
                            onStickerClick={(sticker) => {
                                // console.log('[USANDO O COMPONENTE] Salva esse sticker no banco', sticker);
                                handleNovaMensagem(':sticker: ' + sticker);
                            }}
                        />

                        <Button
                            onClick={(event) => {
                                event.preventDefault()
                                //console.log('Enviando...')
                                handleNovaMensagem(mensagem)
                            }
                            }
                            variant='tertiary'
                            colorVariant='positive'
                            label='Enviar'

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
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='primary'
                    colorVariant='negative'
                    label='Sair'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    //console.log('MessageList', props);


    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            backgroundColor: appConfig.theme.colors.primary[400],
                            hover: {
                                backgroundColor: appConfig.theme.colors.primary[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${mensagem.de}.png`}
                            />
                            <Text tag="strong">
                                {mensagem.de}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                            <Button
                                onClick={(event) => {
                                    event.preventDefault()

                                    //console.log(mensagem)

                                    const filter = props.mensagens.filter((filtered) => filtered.id !== mensagem.id)

                                    supabaseClient
                                        .from('mensagens')
                                        .delete()
                                        .match({ id: mensagem.id })
                                        .then(() => {
                                            props.setMensagens(filter)
                                        })

                                    //console.log(props.mensagens)
                                    //console.log('id', mensagem.id)


                                }}
                                styleSheet={{
                                    height: '10px',
                                    marginLeft: '75%'
                                }}
                                variant='primary'
                                colorVariant='dark'
                                label='excluir'
                            />

                        </Box>

                        {/* [Declarativo] */}
                        {/* Condicional: {mensagem.texto.startsWith(':sticker:').toString()} */}
                        {mensagem.texto.startsWith(':sticker:')
                            ? (
                                <Image styleSheet={{
                                    maxWidth: '75px',
                                    maxHeight: '75px',
                                }} src={mensagem.texto.replace(':sticker:', '')} />
                            )
                            : (
                                mensagem.texto
                            )}
                        {/* if mensagem de texto possui stickers:
                           mostra a imagem
                        else 
                           mensagem.texto */}
                        {/* {mensagem.texto} */}
                    </Text>
                )
            })}

        </Box>
    )
}