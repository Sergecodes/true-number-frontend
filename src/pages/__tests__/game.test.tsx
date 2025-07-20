import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AuthContext, User } from '../../context/AuthContext';
import { ToastContext } from '../../context/ToastContext';
import GamePage from '..';

jest.mock('@/lib/api', () => ({ post: () => ({ data: { generatedNumber: 80, result: 1, newBalance: 150 } }) }));

describe('GamePage', () => {
   it('plays game and shows a winning toast', async () => {
      const user = { username: '', email: '', phone: '', role: 'client', balance: 100 } as User;
      const addToast = jest.fn();

      render(
         <AuthContext.Provider value={{ user, token: 't', login: jest.fn(), logout: jest.fn() }}>
            <ToastContext.Provider value={{ toasts: [], addToast }}>
               <GamePage />
            </ToastContext.Provider>
         </AuthContext.Provider>
      );

      fireEvent.click(screen.getByRole('button', { name: /Generate Number/i }));
      await waitFor(() => expect(addToast).toHaveBeenCalledWith(
         expect.stringContaining('You won!'),
         'success'
      ));
      expect(user.balance).toBe(150);
   });
});