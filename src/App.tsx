import React from 'react'
import { routes } from './routes'
import './styles.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AlertProvider } from './components/AlertContext'

const App = () => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      }),
  )
  return (
    <QueryClientProvider client={queryClient}>
      <AlertProvider>{routes}</AlertProvider>
    </QueryClientProvider>
  )
}

export default App
