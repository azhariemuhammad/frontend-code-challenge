import React from 'react'
import { IssueList } from '../components/IssueList'
import { Box, Button, Flex, ModalOverlay, ModalContent, Modal } from '@chakra-ui/react'
import { IssueComposer } from '../components/IssueComposer'

export const Issues = () => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <>
      <Box>
        <Flex justifyContent='space-between' alignItems='center' gap={4} m={4}>
          <h2>Past Issues</h2>
          <Button onClick={() => setIsOpen(true)}>New Issue</Button>
        </Flex>
        <IssueList />
      </Box>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <IssueComposer />
        </ModalContent>
      </Modal>
    </>
  )
}
