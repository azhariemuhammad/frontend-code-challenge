import React from 'react'
import { Box, Button, Flex, Stack, Text, FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react'
import { Issue } from '../types'

type IssueComposerProps = {
  defaultState?: Issue
  onSubmit: (issue: Issue) => void
}

export const IssueComposer = ({ defaultState, onSubmit }: IssueComposerProps) => {
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
        description: formData.get('description') ?? '',
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
      <form ref={formRef} onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input isRequired defaultValue={defaultState?.title} name='title' placeholder='Title' />
          </FormControl>
          <FormControl>
            <FormLabel>Issue Number</FormLabel>
            <Input
              type='number'
              isRequired
              defaultValue={defaultState?.issueNumber}
              name='issueNumber'
              placeholder='Issue Number'
            />
          </FormControl>
          <FormControl>
            <FormLabel>Issue Date</FormLabel>
            <Input isRequired defaultValue={defaultState?.issueDate} type='date' name='issueDate' />
          </FormControl>
          <FormControl>
            <FormLabel>Image URI</FormLabel>
            <Input isRequired defaultValue={defaultState?.imageUri} name='imageUri' placeholder='Image URI' />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea defaultValue={defaultState?.description} name='description' placeholder='Description' />
          </FormControl>
        </Stack>
        <Flex justifyContent='flex-end' mt='2'>
          <Button bgColor='blue.400' color='white' type='submit'>
            {defaultState ? 'Update' : 'Submit'}
          </Button>
        </Flex>
      </form>
    </Flex>
  )
}
