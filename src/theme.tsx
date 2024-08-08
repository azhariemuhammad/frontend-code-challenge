import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
  },
  colors: {
    notion: {
      50: '#F7F6F3',
      100: '#EBECED',
      200: '#D3D5D9',
      300: '#B1B4BB',
      400: '#898D96',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'normal',
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: '600',
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: 'notion.50',
        color: 'notion.900',
      },
    },
  },
})
