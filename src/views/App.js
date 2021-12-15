import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { theme } from 'styles/theme';

const Text = styled.p`
  color: ${({ theme }) => theme.colors.red};
  font-family: 'Roboto';
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Text>Hello world</Text>
    </ThemeProvider>
  );
}

export default App;
