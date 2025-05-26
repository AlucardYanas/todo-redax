import { DragHandleIcon, CheckIcon, DeleteIcon } from '@chakra-ui/icons';
import { Box, Flex, Text, IconButton, useColorModeValue } from '@chakra-ui/react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';

import { deleteTodo, toggleTodoStatus } from '../../redux/actions/todoActions';
import type { CardType } from '../../types/CardTypes';
import { useAppDispatch } from '../hooks/reduxHooks';

interface Props {
  todo: CardType;
}

const SortableTodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useAppDispatch();
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

  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Box
      ref={setNodeRef}
      style={style}
      p={4}
      mb={2}
      bg={bg}
      borderWidth="1px"
      borderColor={borderColor}
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
              color={todo.status === 'completed' ? 'gray.500' : 'inherit'}
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
  );
};

export default SortableTodoItem;
