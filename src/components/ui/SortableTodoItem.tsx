import { DragHandleIcon, CheckIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Text,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
} from '@chakra-ui/react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { memo, useState } from 'react';

import { deleteTodo, toggleTodoStatus, updateTodo } from '../../redux/actions/todoActions';
import type { CardType } from '../../types/CardTypes';
import { useAppDispatch } from '../hooks/reduxHooks';

interface Props {
  todo: CardType;
}

const SortableTodoItem = ({ todo }: Props) => {
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(todo.description);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: todo.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
    position: 'relative' as const,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleEdit = () => {
    dispatch(
      updateTodo({
        id: todo.id,
        updates: {
          title: editedTitle,
          description: editedDescription,
        },
      }),
    );
    onClose();
  };

  return (
    <>
      <Box
        ref={setNodeRef}
        style={style}
        p={4}
        mb={2}
        bg="white"
        borderWidth="1px"
        borderColor="gray.200"
        borderRadius="lg"
        boxShadow="sm"
        _hover={{ boxShadow: 'md' }}
      >
        <Flex align="center" justify="space-between">
          <Flex align="center" flex={1}>
            <IconButton
              {...attributes}
              {...listeners}
              aria-label="Drag handle"
              icon={<DragHandleIcon />}
              variant="ghost"
              size="sm"
              mr={3}
              cursor="grab"
              _active={{ cursor: 'grabbing' }}
            />
            <Box flex={1}>
              <Text
                fontSize="lg"
                fontWeight="medium"
                textDecoration={todo.status === 'completed' ? 'line-through' : 'none'}
                color={todo.status === 'completed' ? 'gray.500' : 'gray.800'}
              >
                {todo.title}
              </Text>
              <Text
                fontSize="sm"
                color={todo.status === 'completed' ? 'gray.500' : 'gray.600'}
                textDecoration={todo.status === 'completed' ? 'line-through' : 'none'}
              >
                {todo.description}
              </Text>
            </Box>
          </Flex>
          <Flex>
            <IconButton
              aria-label="Edit todo"
              icon={<EditIcon />}
              colorScheme="blue"
              variant="ghost"
              size="sm"
              mr={2}
              onClick={onOpen}
            />
            <IconButton
              aria-label={todo.status === 'completed' ? 'Mark as active' : 'Mark as completed'}
              icon={<CheckIcon />}
              colorScheme={todo.status === 'completed' ? 'green' : 'gray'}
              variant="ghost"
              size="sm"
              mr={2}
              onClick={() => dispatch(toggleTodoStatus(todo.id))}
            />
            <IconButton
              aria-label="Delete todo"
              icon={<DeleteIcon />}
              colorScheme="red"
              variant="ghost"
              size="sm"
              onClick={() => dispatch(deleteTodo(todo.id))}
            />
          </Flex>
        </Flex>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Редактировать задачу</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Заголовок</FormLabel>
              <Input
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                placeholder="Введите заголовок"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Описание</FormLabel>
              <Textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                placeholder="Введите описание"
              />
            </FormControl>

            <Flex justify="flex-end" mt={6} gap={2}>
              <Button onClick={onClose}>Отмена</Button>
              <Button colorScheme="blue" onClick={handleEdit}>
                Сохранить
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default memo(SortableTodoItem);
