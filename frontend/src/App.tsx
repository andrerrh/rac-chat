import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

import { RegisterPage } from './pages/RegisterPage.tsx';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RegisterPage />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App
