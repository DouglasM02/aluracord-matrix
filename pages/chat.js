import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box } from '@skynexui/components';
import appConfig from '../config.json';
import {
    listOfMessages, handleNewMessage, handleDeleteMessage, listenMessageOnRealTime,
} from '../services/handleSupaBase';
import BuildOfChat from '../src/components/BuildOfChat';

export default function ChatPage(props) {
    const roteamento = useRouter();
    const usuarioLogado = roteamento.query.username;
    const [mensagem, setMensagem] = useState('');
    const [listaDeMensagens, setListaDeMensagens] = useState('');
    const [overBoolean, setOverBoolean] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);

    const content = {
        usuarioLogado,
        mensagem,
        listaDeMensagens,
        overBoolean,
        dataLoaded,
    };

    useEffect(() => {
        const listMessages = listOfMessages();
        listMessages
            .then(({ data }) => {
                setListaDeMensagens(data);
                setDataLoaded(true);
            });

        const subscription = listenMessageOnRealTime(
            (newMessage) => {
                setDataLoaded(false);
                setListaDeMensagens((valueFromNow) => {
                    setDataLoaded(true);

                    return [
                        newMessage,
                        ...valueFromNow,
                    ];
                });
            },
            (deleted) => {
                setDataLoaded(false);

                console.log(deleted);

                setListaDeMensagens((newList) => {
                    const filter = newList.filter((filtered) => filtered.id !== deleted.id);

                    setDataLoaded(true);

                    return [...filter];
                });
            },
        );

        return () => { subscription.unsubscribe(); };
    }, []);

    return (
        <Box styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage: 'url(\'https://i.postimg.cc/cJqNKW3d/jonathan-borba-y-VRl-Zojv-Gy0-unsplash-1.jpg\')',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: appConfig.theme.colors.primary['700'],
            backgroundBlendMode: 'multiply',
            color: appConfig.theme.colors.secondary['300'],

        }}
        >

            <BuildOfChat
                setMensagem={setMensagem}
                setListaDeMensagens={setListaDeMensagens}
                setOverBoolean={setOverBoolean}
                setData={setDataLoaded}
                content={content}
            />

        </Box>
    );
}
