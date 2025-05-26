import { Box, Button, Input, Stack, Link as ChakraLink, Flex } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import React, { FC, FormEvent } from 'react';
import useCards from '../hooks/useCards';

const PostToDo: FC = () => {
  const { cardSubmitHandler } = useCards();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    cardSubmitHandler(e);
    navigate('/');
  };

  return (
    <Box>
      <Box onSubmit={handleSubmit} as="form" mt={3}>
        <Stack spacing={4}>
          <Input
            name="title"
            placeholder="What needs to be done?"
            size="lg"
            variant="flushed"
            fontSize="2xl"
            _placeholder={{ color: 'gray.300' }}
            required
          />
          <Input
            name="description"
            placeholder="Add description"
            size="md"
            variant="flushed"
            required
          />
          <Input name="status" type="hidden" value="active" />
          <Flex justify="space-between" mt={4}>
            <ChakraLink as={RouterLink} to="/">
              <Button colorScheme="gray" variant="ghost">
                Back to List
              </Button>
            </ChakraLink>
            <Button type="submit" colorScheme="pink">
              Create Todo
            </Button>
          </Flex>
        </Stack>
      </Box>
    </Box>
  );
};

export default PostToDo;
