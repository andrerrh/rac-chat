import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { useState } from 'react';

import { RegisterPage } from './pages/RegisterPage.tsx';
import { LoginPage } from './pages/LoginPage.tsx';
import { Home } from './pages/Home.tsx';
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar.tsx';
import { AppSidebar } from './components/AppSidebar.tsx';
import { ProtectedRoute } from './components/ProtectedRoute.tsx';
import { ChatPage } from './pages/ChatPage.tsx';
import { SelectedUserProvider } from './components/SelectedUserProvider.tsx';

const queryClient = new QueryClient();

function App() {
  const [user, setUser] = useState<{ username: string | null; avatar: string | null } | null>(null);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SelectedUserProvider>
          <SidebarProvider>
            <AppSidebar
              user={user}
              setUser={setUser}
            />
            <SidebarTrigger />
            <Routes>
              <Route element={<ProtectedRoute setUser={setUser} />}>
                <Route path="/" element={<Home />} />
                <Route path="/chat" element={<ChatPage />} />
              </Route>
              <Route path="/login" element={<LoginPage
                user={user}
                setUser={setUser}
              />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
            <Toaster />
          </SidebarProvider>
        </SelectedUserProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App
