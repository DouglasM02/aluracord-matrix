import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router'

import appConfig from '../config.json'


function Titulo(props) {
  //console.log(props)
  const Tag = props.tag || 'h1'
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
                ${Tag} {
                    color: '#EFF6E0';
                    font-size: 24px;
                    font-weight: 700;
                }
                `}</style>
    </>
  );
}

//function HomePage() {
//  return (
//    <div>
//        {/*<GlobalStyle />*/}
//        <GlobalStyle />
//        <Title tag="h2">Boas vindas de volta!</Title>
//        <h2>Discord - Alura Matrix</h2>
//    </div>
//  )
//}

//export default HomePage

// Fazendo uma função para consumir API GIT
function chamadaApiGit(user) {
  return fetch(`https://api.github.com/users/${user}`)
    .then((response) => {
      return response.json()

    })
    .then((response) => {
      return response
    })
    .catch((error) => {
      console.log(error)
    })
}


export default function PaginaInicial() {



  //const username = 'DouglasM02';
  const [username, setUsername] = React.useState('')
  const [data, setData] = React.useState('')
  const roteamento = useRouter()

  let dados = null

  // Usando useEffect para consumir a API na pagina inicial cada vez que a página renderizar
  useEffect(() => {
    dados = chamadaApiGit(username)
    dados.then((response) => {
      setData(response)
    }).catch((error) => {
      console.log(error)
    })
  }, [username])

  console.log(data)


  return (




    <>
      {/*<GlobalStyle />*/}
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          //backgroundColor: appConfig.theme.colors.primary[500],
          //backgroundImage: 'url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)',
          backgroundImage: "url('https://i.postimg.cc/cJqNKW3d/jonathan-borba-y-VRl-Zojv-Gy0-unsplash-1.jpg')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#rgba(2, 58, 83, 0.5)',
          backgroundBlendMode: 'multiply',
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
            width: '100%', maxWidth: '700px',
            borderRadius: '5px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: "#023A53",
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={(event) => {
              event.preventDefault()
              console.log('Alguém submeteu o form')
              roteamento.push(`/chat?username=${username}`)
            }}
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >
            <Titulo style={{
              color: '#EFF6E0',
            }} tag="h2">Boas vindas de volta!</Titulo>
            <Text variant="body3" styleSheet={{ marginBottom: '40px', color: '#598392' }}>
              {appConfig.name}
            </Text>

            <TextField
              value={username}
              onChange={(event) => {
                console.log('usuario digitou', event.target.value)

                //adquirir o valor do parametro event.
                const value = event.target.value
                // colocar o valor na função de estado do React, para que este possa fazer a alteração do valor onde for necessário
                setUsername(value)
              }}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: '#023A53',
                  mainColor: '#AEC3B0',
                  mainColorHighlight: '#598392',
                  backgroundColor: "rgba(174, 195, 176, 0.75)",
                },
              }}
            />
            <Button
              type='submit'
              label='Entrar'
              fullWidth
              buttonColors={{
                contrastColor: '#124559',
                mainColor: '#598392',
                mainColorLight: '#AEC3B0',
                mainColorStrong: '#AEC3B0',
              }}
            />
          </Box>
          {/* Formulário */}


          {/* Photo Area */}
          <Box
            styleSheet={{
              display: username.length > 2 ? 'flex' : 'none',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: "#124559",
              border: '1px solid',
              borderColor: '#598392',
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px',
            }}
          >

            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
              }}
              src={data.avatar_url}
            //{`https://github.com/${username}.png`}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: '#023A53',
                backgroundColor: '#AEC3B0',
                padding: '3px 10px',
                borderRadius: '1000px',
                marginBottom: '7px'
              }}
            >
              {username}
            </Text>

            {/* colocando a quantidade de pessoas que segue e pessoas que seguem ele */}
            <Text
              variant="body4"
              styleSheet={{
                color: '#023A53',
                backgroundColor: '#AEC3B0',
                padding: '3px 10px',
                borderRadius: '1000px',
                marginBottom: '7px'
              }}
            >
              Seguindo {data.followers}
            </Text>

            <Text
              variant="body4"
              styleSheet={{
                color: '#023A53',
                backgroundColor: '#AEC3B0',
                padding: '3px 10px',
                borderRadius: '1000px',
              }}
            >
              Seguido por {data.following}
            </Text>

          </Box>
          {/* Photo Area */}
        </Box>

      </Box>
    </>
  );
}