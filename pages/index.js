import React, { useEffect } from 'react';
import { Box } from '@skynexui/components';
import appConfig from '../config.json';
import FormIndex from '../src/components/FormIndex';
import PhotoArea from '../src/components/PhotoArea';
import handleApiGit from '../services/handleApiGit';

export default function PaginaInicial() {
  // const username = 'DouglasM02';
  const [username, setUsername] = React.useState('');
  const [data, setData] = React.useState('');
  const [flag, setFlag] = React.useState(false);

  let dados = null;

  useEffect(() => {
    dados = handleApiGit(username);
    if (dados !== null) {
      dados
        .then((response) => { setData(response); })
        .catch((error) => { console.log(error); });
    }
  }, [username]);

  return (

    <Box
      styleSheet={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: "url('https://i.postimg.cc/cJqNKW3d/jonathan-borba-y-VRl-Zojv-Gy0-unsplash-1.jpg')",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Box
        styleSheet={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: {
            xs: 'column',
            sm: 'row',
          },
          width: '100%',
          maxWidth: '700px',
          borderRadius: '5px',
          padding: '32px',
          margin: '16px',
          boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
          backgroundColor: appConfig.theme.colors.primary['800'],
        }}
      >
        {/* Formulário */}
        <FormIndex username={username} setUsername={setUsername} setFlag={setFlag} />
        {/* Formulário */}

        {/* Photo Area */}
        <PhotoArea username={username} data={data} />
        {/* Photo Area */}
      </Box>

    </Box>

  );
}
