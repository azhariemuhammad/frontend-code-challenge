import { Container, Flex, Grid } from '@chakra-ui/react'
import React from 'react'
import { IssueCard } from './IssueCard'

export const IssueList = () => {
  return (
    <Container maxW='container.xl' padding='0'>
      <Flex justifyContent='center' alignItems='center' flexDirection='column' gap={6}>
        <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(4, 1fr)' }} gap={6}>
          {Array.from(Array(10).keys()).map(i => (
            <IssueCard key={i} />
          ))}
        </Grid>
      </Flex>
    </Container>
  )
}
