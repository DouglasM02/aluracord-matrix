import React from 'react';
import appConfig from '../../config.json';

export default function Titulo(props) {
  const Tag = props.tag || 'h1';
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>
        {`
            ${Tag} {
                color: ${appConfig.theme.colors.primary['200']};
                font-size: 24px;
                font-weight: 600;
                margin-bottom: 3px;
            }
            `}

      </style>
    </>
  );
}
