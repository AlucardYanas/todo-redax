import { Box, Button, FormControl, FormLabel, Input, Textarea, VStack } from '@chakra-ui/react';
import { FC, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import useCards from '../hooks/useCards';

const PostToDo: FC = () => {
  const { cardSubmitHandler } = useCards();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    cardSubmitHandler(e);
    navigate('/');
  };

  return (
    <Box maxW="xl" mx="auto" p={4}>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Заголовок</FormLabel>
            <Input name="title" placeholder="Введите заголовок задачи" />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Описание</FormLabel>
            <Textarea
              name="description"
              placeholder="Введите описание задачи"
              resize="vertical"
              minH="100px"
            />
          </FormControl>

          <Button type="submit" colorScheme="pink" w="full">
            Создать задачу
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default PostToDo;
