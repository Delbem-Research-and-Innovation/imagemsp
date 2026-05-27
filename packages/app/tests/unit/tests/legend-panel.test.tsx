/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { LegendPanel } from '@/components/map/LegendPanel';

jest.mock('@ttoss/geovis', () => ({
  GeoVisLegend: () => null,
}));

const renderPanel = (isOpen = true, onToggle = jest.fn()) =>
  render(
    <ChakraProvider value={defaultSystem}>
      <LegendPanel
        category="cumulative-total"
        group="65"
        isOpen={isOpen}
        onToggle={onToggle}
      />
    </ChakraProvider>
  );

describe('LegendPanel — toggle button', () => {
  it('toggle button has aria-label="Fechar painel" when open', () => {
    renderPanel(true);

    const toggleButton = screen.getByRole('button', { name: /fechar painel/i });

    expect(toggleButton).toBeInTheDocument();
  });

  it('toggle button has aria-label="Abrir painel" when closed', () => {
    renderPanel(false);

    const toggleButton = screen.getByRole('button', { name: /abrir painel/i });

    expect(toggleButton).toBeInTheDocument();
  });

  it('clicking the toggle button calls the onToggle callback once', () => {
    const onToggle = jest.fn();
    renderPanel(true, onToggle);

    fireEvent.click(screen.getByRole('button', { name: /fechar painel/i }));

    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('toggle button renders as a native <button> element, not a <div>', () => {
    renderPanel();

    const toggleButton = screen.getByRole('button', { name: /fechar painel/i });

    expect(toggleButton.tagName).toBe('BUTTON');
  });
});
