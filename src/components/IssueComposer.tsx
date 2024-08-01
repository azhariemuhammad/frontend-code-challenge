import React from 'react'
import { Box, Button, Flex, FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react'

export const IssueComposer = () => {
  return (
    <Flex padding={8} flexDir='column' gap={4}>
      <Box textAlign='center'>
        <h2>New Issue</h2>
      </Box>
      <FormControl>
        <FormLabel>Title</FormLabel>
        <Input placeholder='Title' />
      </FormControl>
      <FormControl>
        <FormLabel>Issue Number</FormLabel>
        <Input placeholder='Issue Number' />
      </FormControl>
      <FormControl>
        <FormLabel>Issue Date</FormLabel>
        <Input type='date' name='Issue Date' />
      </FormControl>
      <FormControl>
        <FormLabel>Image URI</FormLabel>
        <Input placeholder='Image URI' />
      </FormControl>
      <FormControl>
        <FormLabel>Description</FormLabel>
        <Textarea placeholder='Description' />
      </FormControl>
      <Button>Save</Button>
    </Flex>
  )
}
