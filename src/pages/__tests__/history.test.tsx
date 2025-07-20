import { render, screen, waitFor } from '@testing-library/react';
import HistoryPage from '../history';
import { AuthContext, User } from '../../context/AuthContext';
import api from '@/lib/api';

jest.mock('@/lib/api');

describe('HistoryPage', () => {
   it('renders history records', async () => {
      const records = [
         { _id: '1', generatedNumber: 70, result: 1, balanceChange: 24, newBalance: 150, createdAt: '2025-07-19T12:00:00Z' }
      ];
      (api.get as jest.Mock).mockResolvedValue({ data: records });

      render(
         <AuthContext.Provider value={{ user: { username: '', email: '', phone: '', role: 'client', balance: 150 } as User, token: 't', login: jest.fn(), logout: jest.fn() }}>
            <HistoryPage />
         </AuthContext.Provider>
      );

      await waitFor(() => expect(screen.getByText(/24/)).toBeInTheDocument());
      expect(screen.getByText(/150/)).toBeInTheDocument();
   });
});