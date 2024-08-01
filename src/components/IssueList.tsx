import { Container, Flex, Grid, ModalOverlay, ModalContent, Modal, GridItem } from '@chakra-ui/react'
import { IssueCard } from './IssueCard'
import { IssueList } from '../types'
import { IssueComposer } from './IssueComposer'
import { useState } from 'react'
import { useUpdateNewIssue } from '../hooks/useUpdateNewIssue'
import { useDeleteIssue } from '../hooks/useDeleteIssue'

export const List = ({ issues, refetch }: { issues: IssueList; refetch: () => void }) => {
  const [selectedIssue, setSelectedIssue] = useState('')
  const updateIssue = useUpdateNewIssue()
  const deleteIssue = useDeleteIssue()

  const handleOpenEditor = (id: string) => {
    setSelectedIssue(id)
  }

  const handleDeleteIssue = (id: string) => {
    deleteIssue(id, () => {
      refetch()
    })
  }

  return (
    <>
      <Container maxW='container.xl' padding='2'>
        <Flex justifyContent='center' alignItems='center' flexDirection='column' gap={6}>
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
        </Flex>
      </Container>
      {selectedIssue && (
        <Modal isOpen={Boolean(selectedIssue)} onClose={() => setSelectedIssue('')}>
          <ModalOverlay />
          <ModalContent>
            <IssueComposer
              onSubmit={updatedIssue => {
                updateIssue(updatedIssue, () => {
                  setSelectedIssue('')
                  refetch()
                })
              }}
              defaultState={issues.find(issue => issue.id === selectedIssue)}
            />
          </ModalContent>
        </Modal>
      )}
    </>
  )
}
