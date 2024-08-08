import {
  Container,
  Flex,
  Box,
  Grid,
  ModalOverlay,
  ModalContent,
  Modal,
  GridItem,
  Button,
  Text,
  HStack,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'
import { format } from 'date-fns'
import { IssueCard } from './IssueCard'
import { IssueComposer } from './IssueComposer'
import { useState } from 'react'
import { useUpdateNewIssue } from '../hooks/useUpdateNewIssue'
import { useDeleteIssue } from '../hooks/useDeleteIssue'
import { useAlertContext } from './AlertContext'
import { LoaderGrid } from './LoaderGrid'
import { IssueList } from '../types'
import { CalendarIcon } from '@chakra-ui/icons'
import { useTranslation } from 'react-i18next'

type ViewSwitchProps = {
  isGrid: boolean
  onToggle: () => void
}

type IssueListProps = {
  issues: IssueList
  refetch: () => void
  isLoading: boolean
}

const ViewSwitch = ({ isGrid, onToggle }: ViewSwitchProps) => {
  return (
    <Flex
      as='button'
      bg='gray.100'
      borderRadius='md'
      p='2px'
      width='64px'
      height='28px'
      alignItems='center'
      justifyContent='space-between'
      position='relative'
      onClick={onToggle}
      transition='all 0.2s'
      _hover={{ bg: 'gray.200' }}
    >
      <Box
        position='absolute'
        left={isGrid ? '2px' : '34px'}
        bg='white'
        borderRadius='sm'
        width='28px'
        height='24px'
        transition='left 0.2s'
        boxShadow='sm'
      />
      <Flex justify='center' align='center' width='30px' height='24px' zIndex={1}>
        <svg width='16' height='16' viewBox='0 0 16 16' fill='currentColor'>
          <path d='M1 1h6v6H1zM9 1h6v6H9zM1 9h6v6H1zM9 9h6v6H9z' fillOpacity={isGrid ? '0.7' : '0.3'} />
        </svg>
      </Flex>
      <Flex justify='center' align='center' width='30px' height='24px' zIndex={1}>
        <svg width='16' height='16' viewBox='0 0 16 16' fill='currentColor'>
          <path d='M1 2h14v3H1zM1 7h14v3H1zM1 12h14v3H1z' fillOpacity={!isGrid ? '0.7' : '0.3'} />
        </svg>
      </Flex>
    </Flex>
  )
}

export const List = ({ issues, refetch, isLoading }: IssueListProps) => {
  const { t } = useTranslation()
  const { addAlert } = useAlertContext()
  const [selectedIssue, setSelectedIssue] = useState('')
  const updateIssue = useUpdateNewIssue()
  const deleteIssue = useDeleteIssue()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleOpenEditor = (id: string) => {
    setSelectedIssue(id)
    onOpen()
  }

  const handleDeleteIssue = (id: string) => {
    deleteIssue(id, () => {
      refetch()
      addAlert({
        status: 'success',
        message: t('issueDeletedSuccessfully'),
      })
    })
  }

  const onSuccessUpdateIssue = () => {
    addAlert({
      status: 'success',
      message: t('issueUpdatedSuccessfully'),
    })
    onClose()
    refetch()
  }

  const renderGridView = () => (
    <Grid templateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6} w='full'>
      {issues.map(({ id, title, imageUri, issueNumber, issueDate }) => (
        <GridItem key={id} w='full' h={{ sm: 'auto', md: 'auto' }}>
          <IssueCard
            title={title}
            issueNumber={issueNumber}
            issueDate={issueDate}
            imageUri={imageUri}
            onOpenEditor={() => handleOpenEditor(id)}
            onDeleteIssue={() => handleDeleteIssue(id)}
          />
        </GridItem>
      ))}
    </Grid>
  )

  const renderListView = () => (
    <VStack spacing={4} align='stretch' w='full'>
      {issues.map(({ id, title, issueNumber, issueDate }) => {
        const date = new Date(issueDate)
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' })
        const monthName = date.toLocaleDateString('en-US', { month: 'short' })
        const dayNumber = date.getDate().toString().padStart(2, '0')
        return (
          <Box key={id} p={4} borderWidth={1} borderRadius='md' boxShadow='sm'>
            <Flex justifyContent='space-between' gap={6}>
              <Box w='fit-content'>
                <Text fontSize='sm' color='gray.500' textAlign='center'>
                  {monthName}
                </Text>
                <Text fontSize='3xl' fontWeight='bold' color='orange.500'>
                  {dayNumber}
                </Text>
              </Box>
              <HStack justify='space-between' w='full'>
                <VStack align='start' spacing={1}>
                  <Text fontWeight='bold'>{title}</Text>
                  <Text fontSize='sm' color='notion.400'>
                    Issue: {issueNumber}
                  </Text>
                  <Flex gap={2} alignItems='center' fontSize='sm' color='notion.400'>
                    <CalendarIcon />
                    <Text>{format(new Date(issueDate), 'MMM yyyy')}</Text>
                  </Flex>
                </VStack>
                <HStack>
                  <Button size='sm' colorScheme='blue' onClick={() => handleOpenEditor(id)}>
                    {t('edit')}
                  </Button>
                  <Button size='sm' colorScheme='gray' onClick={() => handleDeleteIssue(id)}>
                    {t('delete')}
                  </Button>
                </HStack>
              </HStack>
            </Flex>
          </Box>
        )
      })}
    </VStack>
  )

  return (
    <>
      <Container maxW='container.xl' padding='2'>
        <Flex justifyContent='flex-end' alignItems='center' mb={4}>
          <ViewSwitch
            isGrid={viewMode === 'grid'}
            onToggle={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          />
        </Flex>
        <Flex justifyContent='center' alignItems='center' flexDirection='column' gap={6}>
          {isLoading && viewMode === 'grid' && <LoaderGrid />}
          {!isLoading && viewMode === 'grid' && renderGridView()}
          {!isLoading && viewMode === 'list' && renderListView()}
        </Flex>
      </Container>
      <Modal isOpen={isOpen} onClose={onClose} size='3xl'>
        <ModalOverlay />
        <ModalContent>
          <IssueComposer
            onCancel={onClose}
            onSubmit={updatedIssue => {
              updateIssue(updatedIssue, onSuccessUpdateIssue)
            }}
            defaultState={issues.find(issue => issue.id === selectedIssue)}
          />
        </ModalContent>
      </Modal>
    </>
  )
}
