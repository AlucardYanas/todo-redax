import { Box, Button, Text, Flex, Link as ChakraLink } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import React, { FC } from 'react';
import ToDoCard from '../ui/ToDoCard';
import useCards from '../hooks/useCards';

const ToDoPage: FC = () => {
  const {
    filteredCards,
    deleteHandler,
    editHandler,
    filterHandler,
    updateStatusHandler,
    selectedStatus,
    deleteAllCards,
  } = useCards();

  return (
    <Box maxW="100%" overflow="hidden">
      <Flex justifyContent="space-between" mb={6}>
        <Flex gap={2}>
          <Button
            variant={selectedStatus === 'all' ? 'solid' : 'ghost'}
            onClick={() => filterHandler('all')}
            colorScheme="gray"
          >
            All
          </Button>
          <Button
            variant={selectedStatus === 'active' ? 'solid' : 'ghost'}
            onClick={() => filterHandler('active')}
            colorScheme="gray"
          >
            Active
          </Button>
          <Button
            variant={selectedStatus === 'completed' ? 'solid' : 'ghost'}
            onClick={() => filterHandler('completed')}
            colorScheme="gray"
          >
            Completed
          </Button>
        </Flex>
        <Flex gap={2}>
          <Button colorScheme="red" variant="ghost" onClick={deleteAllCards}>
            Удалить все
          </Button>
          <ChakraLink as={RouterLink} to="/create">
            <Button colorScheme="pink" variant="ghost">
              Create New
            </Button>
          </ChakraLink>
        </Flex>
      </Flex>

      {selectedStatus ? (
        <Box>
          {filteredCards.map((el) => (
            <ToDoCard
              key={el.id}
              card={el}
              deleteHandler={deleteHandler}
              updateStatusHandler={updateStatusHandler}
              editHandler={editHandler}
            />
          ))}
          <Text mt={4} color="gray.500">
            {filteredCards.length} items left
          </Text>
        </Box>
      ) : (
        <Text mt={4} color="gray.500">
          Please select a status to view the cards.
        </Text>
      )}
    </Box>
  );
};

export default ToDoPage;
