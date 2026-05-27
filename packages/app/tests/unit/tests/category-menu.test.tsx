/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { CategoryMenu } from '@/components/map/CategoryMenu';

const renderMenu = (
  category: Parameters<typeof CategoryMenu>[0]['category'] = 'cumulative-total',
  group: Parameters<typeof CategoryMenu>[0]['group'] = '65',
  onCategoryChange = jest.fn(),
  onGroupChange = jest.fn()
) =>
  render(
    <ChakraProvider value={defaultSystem}>
      <CategoryMenu
        category={category}
        group={group}
        onCategoryChange={onCategoryChange}
        onGroupChange={onGroupChange}
      />
    </ChakraProvider>
  );

describe('CategoryMenu — menu items', () => {
  it('renders all menu items as native <button> elements, not <div>', () => {
    renderMenu();

    const buttons = screen.getAllByRole('button');

    expect(buttons.length).toBeGreaterThan(0);
    buttons.forEach((btn) => {
      expect(btn.tagName).toBe('BUTTON');
    });
  });

  it('active item has aria-pressed="true" and data-active attribute', () => {
    renderMenu('cumulative-total', '65');

    const activeButtons = screen.getAllByRole('button', { pressed: true });

    expect(activeButtons.length).toBeGreaterThan(0);
    activeButtons.forEach((btn) => {
      expect(btn).toHaveAttribute('data-active');
    });
  });

  it('inactive items have aria-pressed="false" and no data-active attribute', () => {
    renderMenu('cumulative-total', '65');

    const allButtons = screen.getAllByRole('button');
    const inactiveButtons = allButtons.filter(
      (btn) => btn.getAttribute('aria-pressed') === 'false'
    );

    expect(inactiveButtons.length).toBeGreaterThan(0);
    inactiveButtons.forEach((btn) => {
      expect(btn).not.toHaveAttribute('data-active');
    });
  });

  it('clicking an inactive category item calls onCategoryChange', () => {
    const onCategoryChange = jest.fn();
    const onGroupChange = jest.fn();
    renderMenu('cumulative-total', '65', onCategoryChange, onGroupChange);

    const inactiveButtons = screen
      .getAllByRole('button')
      .filter((btn) => btn.getAttribute('aria-pressed') === 'false');

    fireEvent.click(inactiveButtons[0]);

    expect(onCategoryChange).toHaveBeenCalled();
  });
});
