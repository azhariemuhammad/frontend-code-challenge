import React from 'react'
import { List } from '../components/IssueList'
import { Box, Text, Button, Flex, ModalOverlay, ModalContent, Modal } from '@chakra-ui/react'
import { IssueComposer } from '../components/IssueComposer'
import { useQuery } from '@tanstack/react-query'
import { config } from '../config'
import { useCreateNewIssue } from '../hooks/useCreateNewIssue'
import ExpandableSearch from '../components/ExpandableSearch'
import { useAlertContext } from '../components/AlertContext'

export const Issues = () => {
  const { addAlert } = useAlertContext()
  const [query, setQuery] = React.useState('')
  const queryResult = useQuery({
    queryKey: ['issues', query],
    queryFn: () =>
      fetch(`${config.apiUrl}/api/v1/issues?q=${query}`)
        .then(res => res.json())
        .catch(err => {
          console.error(err)
          addAlert({
            status: 'error',
            message: 'Error fetching issues',
          })
        }),
  })

  const isSearching = query !== ''

  const createNewIssue = useCreateNewIssue()
  const { data, isLoading, refetch } = queryResult

  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <>
      <Box my={8}>
        <Flex justifyContent='space-between' alignItems='center' gap={4} m={4} flexWrap={'wrap'}>
          <Text fontWeight='extrabold' fontSize='2xl'>
            Past Issues
          </Text>
          <Flex gap={2}>
            <ExpandableSearch onSubmit={(title: string) => setQuery(title)} />
            <Button bgColor='blue.400' color='white' onClick={() => setIsOpen(true)}>
              New Issue
            </Button>
          </Flex>
        </Flex>
        {isLoading && <p>Loading...</p>}
        {isSearching && data?.issues.length === 0 ? (
          <Box h='2rem' textAlign='center' w='full' mt='8'>
            <Text fontSize='xl' fontWeight='medium' mb={4}>
              No results found for "{query}"
            </Text>
            <Button
              onClick={() => {
                setQuery('')
                refetch()
              }}
            >
              Refresh
            </Button>
          </Box>
        ) : (
          <List refetch={refetch} issues={data?.issues || []} />
        )}
      </Box>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <IssueComposer
            onSubmit={issue => {
              setIsOpen(false)
              createNewIssue(issue, () => {
                refetch()
                addAlert({
                  status: 'success',
                  message: 'Issue created successfully',
                })
              })
            }}
          />
        </ModalContent>
      </Modal>
    </>
  )
}
