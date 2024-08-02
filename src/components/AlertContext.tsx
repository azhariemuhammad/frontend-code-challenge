import React, { useEffect } from 'react'
import { Alert, AlertIcon, Box, Portal, Text } from '@chakra-ui/react'

type Alert = {
  status: 'success' | 'error'
  message: string
}

const AlertContext = React.createContext({
  alerts: [],
  addAlert: (alert: Alert) => null,
})

const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const [alerts, setAlerts] = React.useState<Alert | null>(null)

  const addAlert = (alert: Alert) => {
    setAlerts(alert)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlerts(null)
    }, 5000)
    return () => clearTimeout(timer)
  }, [alerts])

  return (
    <AlertContext.Provider value={{ alerts, addAlert }}>
      {alerts && (
        <Box position='fixed' bottom='20px' minW='250px' left={0} w='auto' zIndex={100}>
          <Alert
            status={alerts.status}
            variant='subtle'
            flexDirection='row'
            alignItems='center'
            justifyContent='left'
            textAlign='left'
            gap={2}
            w='full'
            p={4}
            borderTopRightRadius='lg'
            borderBottomRightRadius='lg'
          >
            <AlertIcon />
            <Text fontWeight='medium'>{alerts.message}</Text>
          </Alert>
        </Box>
      )}
      {children}
    </AlertContext.Provider>
  )
}

const useAlertContext = () => React.useContext(AlertContext)

export { AlertProvider, useAlertContext }
