import React from 'react';
import { render } from '@testing-library/react';
import Card from '../Card';

describe('Card', () => {
   it('renders children inside a white card', () => {
      const { getByText, container } = render(<Card><span>Test</span></Card>);
      expect(getByText('Test')).toBeInTheDocument();
      expect(container.firstChild).toHaveClass('bg-white', 'shadow-lg', 'rounded-lg');
   });
});