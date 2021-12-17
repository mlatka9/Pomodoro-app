export const theme = {
  colors: {
    red: '#F87070',
    lightRed: '#ff9494',
    blue: '#70F3F8',
    purple: '#D881F8',
    grey: '#D7E0FF',
    darkBlue: '#1E213F',
    white: '#FFFFFF',
    lightGrey: '#EFF1FA',
    black: '#161932',
  },
  fonts: {
    mainFont: 'Kumbh Sans',
  },
};

const customColorsPalette = {
  red: {
    primary: '#F87070',
    light: '#F87070',
  },
  aquamarine: {
    primary: '#70F3F8',
    light: '#92f9fc',
  },
  purple: {
    primary: '#D881F8',
    light: '#e4a2fc',
  },
};

export const getCustomTheme = (customFont, customColor) => {
  return {
    ...theme,
    colors: {
      ...theme.colors,
      red: customColorsPalette[customColor].primary,
      lightRed: customColorsPalette[customColor].light,
    },
    fonts: {
      ...theme.fonts,
      mainFont: [customFont],
    },
  };
};
