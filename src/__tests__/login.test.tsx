import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import LoginPage from '../pages/login';
import { AuthContext } from '../context/AuthContext';

describe('LoginPage', () => {
   it('submits email and password', async () => {
      const login = jest.fn().mockResolvedValue(undefined);
      render(
         <AuthContext.Provider value={{ user: null, token: '', login, logout: jest.fn() }}>
            <LoginPage />
         </AuthContext.Provider>
      );
      act(() => {
         fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'test@example.com' } });
         fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'pass123' } });
         fireEvent.click(screen.getByRole('button', { name: /login/i }));
      });

      expect(login).toHaveBeenCalledWith('test@example.com', 'pass123');
   });
});