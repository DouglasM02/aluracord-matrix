import { createClient } from '@supabase/supabase-js';

const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
export function listenMessageOnRealTime(addMessage, listOfRemovedItem) {
  const listener = client
    .from('mensagens')
    .on('INSERT', (response) => {
      console.log('conteudo do insert', response);
      addMessage(response.new);
    })
    .on('DELETE', (deleted) => {
      console.log('conteudo do delete', deleted);
      listOfRemovedItem(deleted.old);
    })
    .subscribe();

  return listener;
}

export function listOfMessages() {
  const messages = client
    .from('mensagens')
    .select('*')
    .order('id', { ascending: false })
    .then(({ data }) => ({
      data,
    }));
  return messages;
}

export function handleNewMessage(newMessage, user) {
  console.log('new Message: ', newMessage);
  console.log('user: ', user);

  const messages = {
    de: user,
    texto: newMessage,
  };

  const nMessage = client
    .from('mensagens')
    .insert([messages])
    .then(({ data }) => {
      console.log(data);
      return data;
    })
    .catch((error) => { console.log(error); });

  return nMessage;
}

export function handleDeleteMessage(message) {
  const messageDelete = {
    id: message.id,
    de: message.de,
    texto: message.texto,
  };

  const deleted = client.from('mensagens')
    .delete()
    .match({ id: messageDelete.id })
    .then((response) => response)
    .catch((error) => { console.log(error); });

  return deleted;
}
