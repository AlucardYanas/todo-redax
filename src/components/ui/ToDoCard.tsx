import { Box, Text, IconButton, Flex, Checkbox } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import React, { FC, memo, useCallback, lazy, Suspense, ChangeEvent } from 'react';
import type { CardType } from '../../types/CardTypes';
import useEditModal from '../hooks/useEditModal';

const EditModal = lazy(() => import('./EditModal'));

interface ToDoCardProps {
  card: CardType;
  deleteHandler: (id: number) => void;
  updateStatusHandler: (id: number) => void;
  editHandler: (id: number, updatedCard: CardType) => void;
}

const ToDoCard: FC<ToDoCardProps> = memo(
  ({ card, deleteHandler, updateStatusHandler, editHandler }): JSX.Element => {
    const isCompleted = card.status === 'completed';
    const {
      isOpen,
      onOpen,
      onClose,
      handleSave,
      title,
      setTitle,
      description,
      setDescription,
      status,
      setStatus,
    } = useEditModal(card, editHandler);

    const handleTitleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>): void => setTitle(e.target.value),
      [setTitle],
    );

    const handleDescriptionChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>): void => setDescription(e.target.value),
      [setDescription],
    );

    const handleStatusChange = useCallback(
      (e: ChangeEvent<HTMLSelectElement>): void => setStatus(e.target.value as CardType['status']),
      [setStatus],
    );

    const handleDelete = useCallback((): void => deleteHandler(card.id), [deleteHandler, card.id]);
    const handleStatusUpdate = useCallback(
      (): void => updateStatusHandler(card.id),
      [updateStatusHandler, card.id],
    );

    return (
      <>
        <Box
          w="100%"
          borderBottom="1px"
          borderColor="gray.200"
          py={4}
          px={2}
          _hover={{ bg: 'gray.50' }}
          transition="all 0.2s"
        >
          <Flex align="center" justify="space-between" maxW="100%">
            <Flex align="center" flex={1} minW={0}>
              <Checkbox
                isChecked={isCompleted}
                onChange={handleStatusUpdate}
                colorScheme="green"
                size="lg"
                flexShrink={0}
              />
              <Box ml={4} flex={1} minW={0}>
                <Text
                  variant="cardTitle"
                  textDecoration={isCompleted ? 'line-through' : 'none'}
                  color={isCompleted ? 'gray.400' : 'gray.700'}
                >
                  {card.title}
                </Text>
                <Text variant="cardDescription">{card.description}</Text>
              </Box>
            </Flex>
            <Flex gap={2} flexShrink={0}>
              <IconButton
                aria-label="Edit todo"
                icon={<EditIcon />}
                variant="ghost"
                colorScheme="blue"
                size="sm"
                onClick={onOpen}
              />
              <IconButton
                aria-label="Delete todo"
                icon={<DeleteIcon />}
                variant="ghost"
                colorScheme="red"
                size="sm"
                onClick={handleDelete}
              />
            </Flex>
          </Flex>
        </Box>

        {isOpen && (
          <Suspense fallback={null}>
            <EditModal
              isOpen={isOpen}
              onClose={onClose}
              title={title}
              description={description}
              status={status}
              handleTitleChange={handleTitleChange}
              handleDescriptionChange={handleDescriptionChange}
              handleStatusChange={handleStatusChange}
              handleSave={handleSave}
            />
          </Suspense>
        )}
      </>
    );
  },
);

ToDoCard.displayName = 'ToDoCard';

export default ToDoCard;
