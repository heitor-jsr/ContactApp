import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../../assets/styles/global';
import dafaultTheme from '../../assets/styles/themes/default';
import Header from '../Header';
import { Container } from './styles';
import Routes from '../../Routes';
import ToastContainer from '../Toast/ToastContainer';

function App() {
  return (
    <ThemeProvider theme={dafaultTheme}>
      <GlobalStyles />
      <ToastContainer />
      <Container>
        <Header />
        <Routes />
      </Container>
    </ThemeProvider>

  );
}

export default App;
