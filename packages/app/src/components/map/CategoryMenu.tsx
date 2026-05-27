'use client';

import { Box, Button, Text } from '@chakra-ui/react';
import React from 'react';

import type { Category, Group } from '@/lib/indicators';

const CATEGORY_OPTIONS: { value: Category; label: string }[] = [
  { value: 'cumulative-total', label: 'taxa cumulativa (% do total)' },
  { value: 'cumulative-65plus', label: 'proporção cumulativa (% da pop 65+)' },
  { value: '5year-65plus', label: 'faixa (% da pop 65+)' },
];

export const GROUP_OPTIONS: Record<Category, { value: Group; label: string }[]> = {
  'cumulative-total': [
    { value: '65', label: '65 anos ou mais' },
    { value: '70', label: '70 anos ou mais' },
    { value: '75', label: '75 anos ou mais' },
  ],
  'cumulative-65plus': [
    { value: '70', label: '70 anos ou mais' },
    { value: '75', label: '75 anos ou mais' },
  ],
  '5year-65plus': [
    { value: '65-69', label: '65 a 69 anos' },
    { value: '70-74', label: '70 a 74 anos' },
    { value: '75', label: '75 anos ou mais' },
  ],
};

interface CategoryMenuProps {
  category: Category;
  group: Group;
  onCategoryChange: (c: Category) => void;
  onGroupChange: (g: Group) => void;
  isOpen: boolean;
}

export const CategoryMenu = ({
  category,
  group,
  onCategoryChange,
  onGroupChange,
  isOpen,
}: CategoryMenuProps) => {
  /** Espelha o offset responsivo do painel da legenda */
  const leftOffset = 'clamp(0.75rem, 5vw, 16rem)';

  const [fading, setFading] = React.useState(false);

  const handleCategoryChange = (newCategory: Category) => {
    setFading(true);
    setTimeout(() => {
      onCategoryChange(newCategory);
      onGroupChange(GROUP_OPTIONS[newCategory][0].value);
      requestAnimationFrame(() => setFading(false));
    }, 200);
  };

  const handleGroupChange = (newGroup: Group) => {
    setFading(true);
    setTimeout(() => {
      onGroupChange(newGroup);
      requestAnimationFrame(() => setFading(false));
    }, 200);
  };

  return (
  <Box
    as="aside"
    position="absolute"
    top="120px"
    left={leftOffset}
    overflow="visible"
    zIndex={30}
    data-theme="light"
  >
    {/* Clipping wrapper — controls slide animation and clips hidden content */}
    <Box
      overflow="hidden"
      width={isOpen ? '300px' : '0'}
      style={{ transition: 'width 0.3s ease' }}
    >
    <Box
      width="300px"
      bg="white"
      color="gray.900"
      p={4}
      display="flex"
      flexDirection="column"
      gap={5}
      maxHeight="80vh"
      overflowY="auto"
      opacity={fading || !isOpen ? 0 : 1}
      border="1px solid #e3dede"
      pointerEvents={isOpen ? undefined : 'none'}
      aria-hidden={!isOpen}
      style={{ transition: 'opacity 0.2s ease' }}
    >
        <Box>
          <Text
            fontSize="xs"
            fontWeight="semibold"
            color="gray.700"
            textTransform="uppercase"
            letterSpacing="wider"
            mb={2}
          >
            Variáveis
          </Text>
          {CATEGORY_OPTIONS.map((opt) => {
            const active = category === opt.value;
            return (
              <Button
                key={opt.value}
                variant="ghost"
                size="sm"
                width="100%"
                justifyContent="flex-start"
                fontWeight={active ? 'semibold' : 'normal'}
                color={active ? 'blue.800' : 'gray.800'}
                bg={active ? 'blue.50' : undefined}
                data-active={active ? '' : undefined}
                aria-pressed={active}
                onClick={() => handleCategoryChange(opt.value)}
                _hover={{ bg: '#f5f1f1', color: 'blue.800' }}
                _focusVisible={{ outline: '2px solid', outlineColor: 'blue.800', outlineOffset: '1px' }}
                minH="44px"
                px={3}
                mb="2px"
              >
                {opt.label}
              </Button>
            );
          })}
        </Box>

        <Box>
          <Text
            fontSize="xs"
            fontWeight="semibold"
            color="gray.700"
            textTransform="uppercase"
            letterSpacing="wider"
            mb={2}
          >
            Faixa etária
          </Text>
          {GROUP_OPTIONS[category].map((opt) => {
            const active = group === opt.value;
            return (
              <Button
                key={opt.value}
                variant="ghost"
                size="sm"
                width="100%"
                justifyContent="flex-start"
                fontWeight={active ? 'semibold' : 'normal'}
                color={active ? 'blue.800' : 'gray.800'}
                bg={active ? 'blue.50' : undefined}
                data-active={active ? '' : undefined}
                aria-pressed={active}
                onClick={() => handleGroupChange(opt.value)}
                _hover={{ bg: '#f5f1f1', color: 'blue.800' }}
                _focusVisible={{ outline: '2px solid', outlineColor: 'blue.800', outlineOffset: '1px' }}
                minH="44px"
                px={3}
                mb="2px"
              >
                {opt.label}
              </Button>
            );
          })}
        </Box>
      </Box>
    </Box>
  </Box>
  );
};
