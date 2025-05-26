import { Global } from '@emotion/react';
import React from 'react';

const FontPreload: React.FC = () => {
  return (
    <Global
      styles={`
        @font-face {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-display: swap;
          src: local('Inter Regular'), local('Inter-Regular'),
               url('/fonts/Inter-Regular.woff2') format('woff2');
        }
        @font-face {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 500;
          font-display: swap;
          src: local('Inter Medium'), local('Inter-Medium'),
               url('/fonts/Inter-Medium.woff2') format('woff2');
        }
        @font-face {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 600;
          font-display: swap;
          src: local('Inter SemiBold'), local('Inter-SemiBold'),
               url('/fonts/Inter-SemiBold.woff2') format('woff2');
        }

        /* Предзагрузка критических шрифтов */
        @media screen and (min-width: 320px) {
          :root {
            font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          }
        }
      `}
    />
  );
};

export default FontPreload;
