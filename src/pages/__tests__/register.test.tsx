import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegisterPage from '../register';
import { ToastContext } from '../../context/ToastContext';
import { useRouter } from 'next/router';

jest.mock('@/lib/api');
jest.mock('next/router', () => ({ useRouter: jest.fn() }));

describe('RegisterPage', () => {
   const addToast = jest.fn();
   const push = jest.fn();
   beforeEach(() => {
      (useRouter as jest.Mock).mockReturnValue({ push });
   });

   it('submits registration form and redirects', async () => {
      render(
         <ToastContext.Provider value={{ toasts: [], addToast }}>
            <RegisterPage />
         </ToastContext.Provider>
      );

      fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: 'user1' } });
      fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'user1@example.com' } });
      fireEvent.change(screen.getByPlaceholderText(/Phone/i), { target: { value: '1234567890' } });
      fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'pass123' } });
      fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));

      await waitFor(() => expect(addToast).toHaveBeenCalledWith(
         'Account created successfully! Please log in.',
         'success'
      ));
      expect(push).toHaveBeenCalledWith('/login');
   });
});