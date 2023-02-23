import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../../assets/styles/global';
import dafaultTheme from '../../assets/styles/themes/default';
import Header from '../Header';
import { Container } from './styles';
import Routes from '../../Routes';

function App() {
  return (
    <ThemeProvider theme={dafaultTheme}>
      <GlobalStyles />
      <Container>
        <Header />
        <Routes />
      </Container>
    </ThemeProvider>

  );
}

export default App;
