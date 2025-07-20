import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from '../Button';

describe('Button', () => {
   it('renders with text and responds to click', () => {
      const onClick = jest.fn();
      const { getByText } = render(<Button onClick={onClick}>Click me</Button>);
      const btn = getByText('Click me');
      expect(btn).toBeInTheDocument();
      fireEvent.click(btn);
      expect(onClick).toHaveBeenCalledTimes(1);
   });
});