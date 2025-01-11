import { DEFAULT_THEME, MantineTheme} from '@mantine/core';

const PRIMARY_BG = '#012966';
const SECONDARY_BG = '#2BC016';
const SECONDARY_OUTLINE = '';
const APP_THEME = Object.assign({}, DEFAULT_THEME);

APP_THEME.fontFamily = 'FiraGO';
APP_THEME.headings = {
  ...APP_THEME.headings,
  sizes: {
    ...APP_THEME.headings.sizes,
  },
};
APP_THEME.colors = {
  ...APP_THEME.colors,
  extra: [
    '#5461F8',
    '#27ad14',
    '#229a12',
    '#1e860f',
    '#1a730d',
    '#16600b',
    '#114d09',
    '#0d3a07',
    '#092604',
    '#041302',
    '#012966',
  ],
  secondary: [
    '#2bc016',
    '#27ad14',
    '#229a12',
    '#1e860f',
    '#1a730d',
    '#16600b',
    '#114d09',
    '#0d3a07',
    '#092604',
    '#041302',
    '#000000',
    '#4A4A4A',
    '#5461F8',
  ],
  primary: [
    '#001029',
    '#01255c',
    '#012152',
    '#011d47',
    '#01193d',
    '#011533',
    PRIMARY_BG,
    '#000c1f',
    '#000814',
    '#00040a',
    '#000000',
  ],
};
APP_THEME.primaryColor = 'primary';
APP_THEME.components = {
  Button: {
    styles: (theme: MantineTheme) => ({
      outline: {
        backgroundColor: "transparent",
        color: theme.colors.primary[7],
        borderColor: theme.colors.extra[0],
        borderWidth: '4px',
        borderRadius: '9px',
        '&:hover': {
          borderColor: theme.colors.extra[1],
        },
      },
      // root: {
      //   borderColor: theme.colors.extra[0],
      //   borderWidth: '4px',
      //   borderRadius: '9px',
      //   '&:hover': {
      //     borderColor: theme.colors.extra[1],
      //   },
      // },
      // outline: {
      //   borderColor: theme.colors.extra[0],
      //   borderWidth: '4px',
      //   borderRadius: '9px',
      // },
    }),
  },
};

export default APP_THEME;
