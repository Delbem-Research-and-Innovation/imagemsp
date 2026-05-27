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

const renderPanel = (onClose = jest.fn()) =>
  render(
    <ChakraProvider value={defaultSystem}>
      <LegendPanel category="cumulative-total" group="65" onClose={onClose} />
    </ChakraProvider>
  );

describe('LegendPanel — close button', () => {
  it('close button has aria-label="Fechar painel"', () => {
    renderPanel();

    const closeButton = screen.getByRole('button', { name: /fechar painel/i });

    expect(closeButton).toBeInTheDocument();
  });

  it('clicking the close button calls the onClose callback once', () => {
    const onClose = jest.fn();
    renderPanel(onClose);

    fireEvent.click(screen.getByRole('button', { name: /fechar painel/i }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('close button renders as a native <button> element, not a <div>', () => {
    renderPanel();

    const closeButton = screen.getByRole('button', { name: /fechar painel/i });

    expect(closeButton.tagName).toBe('BUTTON');
  });
});
