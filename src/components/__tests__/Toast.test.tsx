import React from 'react';
import { render } from '@testing-library/react';
import ToastContainer from '../Toast';
import { ToastContext, ToastMessage } from '../../context/ToastContext';

describe('ToastContainer', () => {
   it('renders toasts from context', () => {
      const toasts = [{ id: 1, text: 'Hello', type: 'info' }] as ToastMessage[];
      const addToast = jest.fn();
      const { getByText } = render(
         <ToastContext.Provider value={{ toasts, addToast }}>
            <ToastContainer />
         </ToastContext.Provider>
      );
      expect(getByText('Hello')).toBeInTheDocument();
   });
});