import { Box, Text, TextField, Image, Button, Icon } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/router';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker';
import { Skeleton } from '@mui/material';

// Como fazer AJAX: https://medium.com/@omariosouto/entendendo-como-fazer-ajax-com-a-fetchapi-977ff20da3c6
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)


function escutaMensagensEmTempoReal(adicionaMensagem, listaComItemRemovido) {
    return supabaseClient
        .from('mensagens')
        .on('INSERT', (respostaLive) => {
            adicionaMensagem(respostaLive.new);
        })
        .on('DELETE', (deleted) => {
            //console.log(deleted)
            listaComItemRemovido(deleted.old)
        })
        .subscribe();
}

export default function ChatPage() {
    // Sua lógica vai aqui
    const roteamento = useRouter();
    const usuarioLogado = roteamento.query.username;
    const [mensagem, setMensagem] = React.useState('')
    const [listaDeMensagens, setListaDeMensagens] = React.useState([])
    const [overBoolean, setOverBoolean] = React.useState(false)
    const [dataLoaded,setDataLoaded] = React.useState(false)
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
                setDataLoaded(true)
            })

            const subscription = escutaMensagensEmTempoReal((novaMensagem) => {

            setDataLoaded(false)
            //console.log('Nova mensagem:', novaMensagem);
            //console.log('listaDeMensagens:', listaDeMensagens);
            // Quero reusar um valor de referencia (objeto/array) 
            // Passar uma função pro setState

            // setListaDeMensagens([
            //     novaMensagem,
            //     ...listaDeMensagens
            // ])
            setListaDeMensagens((valorAtualDaLista) => {
                setDataLoaded(true)
                //console.log('valorAtualDaLista:', valorAtualDaLista);
                return [
                    novaMensagem,
                    ...valorAtualDaLista,
                ]
            });
        },
            (deleted) => {
                setDataLoaded(false)
                //console.log('Id: ', deleted.id)
                setListaDeMensagens((novaLista) => {
                    //console.log('nova lista', novaLista)

                    const filter = novaLista.filter((filtered) => filtered.id !== deleted.id)

                    //console.log('filtrado ', filter)
                    setDataLoaded(true)
                    return [
                        ...filter
                    ]

                })

            });

        return () => {
            subscription.unsubscribe();
        }

    }, [])


    function handleNovaMensagem(novaMensagem) {
        setDataLoaded(false)
        const mensagem = {
            //id: listaDeMensagens.length + 1,
            de: usuarioLogado,
            texto: novaMensagem,
        }

        supabaseClient
            .from('mensagens')
            .insert([mensagem])
            .then(({ data }) => {
                setDataLoaded(true)
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
                    <MessageList
                        mensagens={listaDeMensagens}
                        setMensagens={setListaDeMensagens}
                        overBoolean={overBoolean}
                        setOverBoolean={setOverBoolean}
                        data={dataLoaded}
                        setData={setDataLoaded}
                    />
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
            {!props.data
            ? (
                <Box>
                    <Skeleton variant="rect" width={300} height={200} />
                </Box>
            ):
            (
                <>

                {props.mensagens.map((mensagem) => {
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
                            backgroundColor: appConfig.theme.colors.primary[500],
                            hover: {
                                backgroundColor: appConfig.theme.colors.primary[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: '10px',
                                padding: '7px 3px',
                                borderBottom: `3px solid ${appConfig.theme.colors.primary['400']}`
                            }}
                        >

                            <Box
                                styleSheet={{
                                    marginRight: '7px',
                                    borderRight: `solid 2px ${appConfig.theme.colors.primary['400']}`
                                }}

                                onMouseEnter={() => {
                                    //console.log('Adentrou aqui')

                                    props.setOverBoolean(!props.overBoolean)
                                }}

                                onMouseLeave={() => {
                                    props.setOverBoolean(!props.overBoolean)
                                }}

                            >
                                {!props.overBoolean && (
                                    <Image
                                        styleSheet={{
                                            width: '35px',
                                            height: '35px',
                                            borderRadius: '50%',
                                            display: 'inline-block',
                                            marginRight: '5px',
                                            /*hover: {
                                                marginLeft: 'auto',
                                                marginRight: 'auto',
                                                transform: 'scale(2.5)',
                                                borderRadius: '0',
                                                transition: '1.5s ease',
                                            }*/
                                        }}

                                        src={`https://github.com/${mensagem.de}.png`}
                                    />
                                )}

                                {props.overBoolean && (
                                    <Box
                                        styleSheet={{
                                            position:'relative',
                                            display: 'flex',
                                            padding: '5px',
                                            marginLeft: 'auto',
                                            marginRight: 'auto',
                                            flexDirection: 'column',

                                            backgroundColor: `${appConfig.theme.colors.primary['500']}`,
                                            border: `2px solid ${appConfig.theme.colors.primary['500']}`,
                                            hover: {
                                                transform: 'scale(1.5)',
                                                transition: '2s ease',
                                            },

                                        }}
                                    >
                                        <a 
                                        href={`https://github.com/${mensagem.de}`}

                                        style={{
                                                    marginLeft:'10px',
                                                    marginRight:'auto',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    color: 'white',
                                                    textDecoration: 'none'
                                                }}
                                        
                                        >
                                        <Image
                                            styleSheet={{
                                                width: '35px',
                                                height: '35px',
                                                borderRadius: '50%',
                                                display: 'inline-block',
                                                marginRight: '5px',
                                                marginBottom: '5px',
                                            }}

                                            src={`https://github.com/${mensagem.de}.png`}
                                        />
                                        <Box tag="span" styleSheet={{
                                            display:'flex',
                                            flexDirection:'row',
                                            fontSize: '10px'
                                        }}>
                                                <Icon name="FaGithub"
                                                    styleSheet={{
                                                        marginRight: '5px',
                                                    }} />
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
                                    //marginRight: '10px',
                                    color: appConfig.theme.colors.neutrals[100],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>

                            <Button
                                iconName="times"
                                variant='tertiary'
                                styleSheet={{
                                    maxWidth: '35px',
                                    maxHeight: '35px',
                                    marginLeft: 'auto',
                                    paddingRight: '3px',
                                    color: `${appConfig.theme.colors.neutrals['050']}`,
                                    hover: {
                                        transition: '.50s ease',
                                        backgroundColor: `${appConfig.theme.colors.neutrals['050']}`,
                                        color: `${appConfig.theme.colors.primary['500']}`
                                    }
                                }}
                                //deleteIcon={<DeleteIcon />}
                                onClick={(event) => {
                                    event.preventDefault()

                                    //console.log(mensagem)

                                    //const filter = props.mensagens.filter((filtered) => filtered.id !== mensagem.id)

                                    supabaseClient
                                        .from('mensagens')
                                        .delete()
                                        .match({ id: mensagem.id })
                                        .then(() => {
                                            //props.setMensagens(filter)
                                        })
                                    //console.log(props.mensagens)
                                    //console.log('id', mensagem.id)
                                }}

                            />

                        </Box>

                        {/* [Declarativo] */}
                        {/* Condicional: {mensagem.texto.startsWith(':sticker:').toString()} */}
                        {
                            mensagem.texto.startsWith(':sticker:')
                                ? (
                                    <Image styleSheet={{
                                        maxWidth: '75px',
                                        maxHeight: '75px',
                                    }} src={mensagem.texto.replace(':sticker:', '')} />
                                )
                                : (
                                    mensagem.texto
                                )
                        }
                        {/* if mensagem de texto possui stickers:
                           mostra a imagem
                        else 
                           mensagem.texto */}
                        {/* {mensagem.texto} */}
                    </Text>


                )
            })}




                </>
            ) }
            

        </Box >
    )
}