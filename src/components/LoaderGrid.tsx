import { Grid, GridItem, Skeleton } from '@chakra-ui/react'

export const LoaderGrid = () => {
  return (
    <Grid templateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6} w='full'>
      {Array.from({ length: 20 }).map((_, i) => (
        <GridItem key={i} w='full' h={{ sm: 'auto', md: 'auto' }}>
          <Skeleton key={i} minH='300px' w='100%' />
        </GridItem>
      ))}
    </Grid>
  )
}
