import { AddIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Heading, Select, Link as ChakraLink } from '@chakra-ui/react';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import useCards from '../hooks/useCards';
import { SortableTodoList } from '../ui/SortableTodoList';

const ToDoPage: React.FC = () => {
  const { filteredCards, filterHandler, selectedStatus } = useCards();

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg" color="gray.900">
          Todo List
        </Heading>
        <ChakraLink as={RouterLink} to="/create">
          <Button leftIcon={<AddIcon />} colorScheme="pink">
            Add Todo
          </Button>
        </ChakraLink>
      </Flex>

      <Flex mb={4}>
        <Select
          value={selectedStatus}
          onChange={(e) => filterHandler(e.target.value as 'all' | 'active' | 'completed')}
          w="200px"
          bg="white"
          color="gray.900"
          borderColor="gray.300"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </Select>
      </Flex>

      <SortableTodoList todos={filteredCards} />
    </Box>
  );
};

export default ToDoPage;
