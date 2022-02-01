import {
  Box, Text, Image,
} from '@skynexui/components';
import React from 'react';
import appConfig from '../../config.json';

export default function PhotoArea(props) {
  const { username } = props;
  const { data } = props;

  return (

    <Box
      styleSheet={{
        display: username.length > 2 ? 'flex' : 'none',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '200px',
        padding: '16px',
        backgroundColor: appConfig.theme.colors.primary['800'],
        border: '1px solid',
        borderColor: appConfig.theme.colors.secondary['500'],
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
      />

      <Box styleSheet={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}
      >
        <Text
          variant="body4"
          styleSheet={{
            width: `${username.length - 1}em`,
            color: appConfig.theme.colors.tertiary['050'],
            backgroundColor: appConfig.theme.colors.tertiary['900'],
            padding: '3px 10px',
            borderRadius: '1000px',
            marginBottom: '7px',
          }}
        >
          {username}
        </Text>

        {/* colocando a quantidade de pessoas que segue e pessoas que seguem ele */}
        <Text
          variant="body4"
          styleSheet={{
            color: appConfig.theme.colors.tertiary['050'],
            backgroundColor: appConfig.theme.colors.tertiary['900'],
            padding: '3px 10px',
            borderRadius: '1000px',
            marginBottom: '7px',
          }}
        >
          Seguindo
          {' '}
          {data.followers}
        </Text>

        <Text
          variant="body4"
          styleSheet={{
            color: appConfig.theme.colors.tertiary['050'],
            backgroundColor: appConfig.theme.colors.tertiary['900'],
            padding: '3px 10px',
            borderRadius: '1000px',
          }}
        >
          Seguido por
          {' '}
          {data.following}
        </Text>

      </Box>

    </Box>

  );
}
