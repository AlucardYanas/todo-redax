import { Box } from '@chakra-ui/react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import React from 'react';

import SortableTodoItem from './SortableTodoItem';
import { reorderTodos } from '../../redux/actions/todoActions';
import type { CardType } from '../../types/CardTypes';
import { useAppDispatch } from '../hooks/reduxHooks';

interface Props {
  todos: CardType[];
}

export const SortableTodoList: React.FC<Props> = ({ todos }) => {
  const dispatch = useAppDispatch();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = todos.findIndex((todo) => todo.id === active.id);
      const newIndex = todos.findIndex((todo) => todo.id === over.id);
      const newTodos = arrayMove(todos, oldIndex, newIndex);
      dispatch(reorderTodos(newTodos));
    }
  };

  return (
    <Box w="100%">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={todos.map((todo) => todo.id)}
          strategy={verticalListSortingStrategy}
        >
          {todos.map((todo) => (
            <SortableTodoItem key={todo.id} todo={todo} />
          ))}
        </SortableContext>
      </DndContext>
    </Box>
  );
};
