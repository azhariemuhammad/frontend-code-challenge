import React from 'react'
import { Box, Button, Flex, Text, Input, GridItem, Grid, Image } from '@chakra-ui/react'
import { Issue } from '../types'

type IssueComposerProps = {
  defaultState?: Issue
  onSubmit: (issue: Issue) => void
  onCancel: () => void
}

export const IssueComposer = ({ defaultState, onSubmit, onCancel }: IssueComposerProps) => {
  const formRef = React.useRef<HTMLFormElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formRef.current) {
      const formData = new FormData(formRef.current)
      const issue = {
        title: formData.get('title') ?? '',
        issueNumber: formData.get('issueNumber') ?? '',
        issueDate: formData.get('issueDate') ?? '',
        imageUri: formData.get('imageUri') ?? '',
      }

      onSubmit({ ...defaultState, ...issue } as unknown as Issue)
    }
  }

  return (
    <Flex padding={8} flexDir='column' gap={4}>
      <Box textAlign='center'>
        <Text fontSize='lg' fontWeight='medium'>
          {defaultState?.id ? 'Update Issue' : 'New Issue'}
        </Text>
      </Box>
      <Box as='form' ref={formRef} onSubmit={handleSubmit}>
        <Input
          defaultValue={defaultState?.title}
          variant='unstyled'
          placeholder='Untitled'
          fontSize='2xl'
          fontWeight='bold'
          name='title'
          mb={4}
          p={4}
        />
        <Grid templateColumns='minmax(120px, 1fr) 3fr' gap={4} p={4} alignItems='center'>
          <GridItem>
            <Text fontWeight='medium' color='notion.600'>
              Issue Number
            </Text>
          </GridItem>
          <GridItem>
            <Input
              defaultValue={defaultState?.issueNumber}
              variant='flushed'
              name='issueNumber'
              placeholder='Enter issue number'
            />
          </GridItem>
          <GridItem>
            <Text fontWeight='medium' color='notion.600'>
              Issue Date
            </Text>
          </GridItem>
          <GridItem>
            <Input defaultValue={defaultState?.issueDate} variant='flushed' type='date' name='issueDate' />
          </GridItem>
          <GridItem>
            <Text fontWeight='medium' color='notion.600'>
              Image URI
            </Text>
          </GridItem>
          <GridItem>
            <Input
              defaultValue={defaultState?.imageUri}
              variant='flushed'
              name='imageUri'
              placeholder='Enter image URI'
            />
          </GridItem>
        </Grid>
        {defaultState?.imageUri && (
          <GridItem colSpan={2} mb={4} w='full'>
            <Image src={defaultState?.imageUri} alt='image' objectFit='fill' height='100%' width='100%' />
          </GridItem>
        )}
        <Flex justifyContent='flex-end' p={4} borderColor='gray.200'>
          <Button mr={3} onClick={onCancel} color='notion.600'>
            Cancel
          </Button>
          <Button colorScheme='blue' type='submit'>
            {defaultState?.id ? 'Update' : 'Create'}
          </Button>
        </Flex>
      </Box>
    </Flex>
  )
}
