import Router from '~/router';
import { Header } from './components';
import { QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { queryClient } from '~/api/query-client.ts';
import { ThemeProvider } from 'styled-components';
import { theme } from '~/common/styles';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Header />
        <Router />
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
