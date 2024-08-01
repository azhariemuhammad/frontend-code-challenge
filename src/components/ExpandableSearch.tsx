import React, { useState, useRef } from 'react'
import { Box, Input, InputGroup, InputRightElement, IconButton } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

const ExpandableSearch = ({ onSubmit }: { onSubmit: (title: string) => void }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const inputRef = useRef(null)

  const handleExpand = () => {
    setIsExpanded(true)
    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)
  }

  const handleCollapse = () => {
    setIsExpanded(false)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(inputRef.current?.value || '')
    handleExpand()
  }

  return (
    <Box position='relative' width={isExpanded ? '250px' : '40px'} transition='width 0.3s'>
      <form onSubmit={handleSubmit}>
        <InputGroup>
          <Input
            ref={inputRef}
            type='text'
            placeholder='Search by title...'
            pr='4.5rem'
            opacity={isExpanded ? 1 : 0}
            transition='opacity 0.3s'
            onBlur={handleCollapse}
          />

          <InputRightElement h='40px'>
            <IconButton
              aria-label='Search'
              h='40px'
              size='md'
              icon={<SearchIcon />}
              onClick={handleExpand}
              bg={!isExpanded ? 'gray.200' : 'transparent'}
            />
          </InputRightElement>
        </InputGroup>
      </form>
    </Box>
  )
}

export default ExpandableSearch
