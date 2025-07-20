import React from 'react';
import { render } from '@testing-library/react';
import Navbar from '../Navbar';
import { AuthContext, User } from '../../context/AuthContext';

describe('Navbar', () => {
   it('shows login/register when no user', () => {
      const { getByText } = render(
         <AuthContext.Provider value={{ user: null, token: null, login: jest.fn(), logout: jest.fn() }}>
            <Navbar />
         </AuthContext.Provider>
      );
      getByText('Login'); getByText('Register');
   });

   it('shows admin panel link for admin user', () => {
      const user = { _id: 'a', username: 'a', email: '', phone: '', role: 'admin', balance: 0 } as User;
      const { getByText } = render(
         <AuthContext.Provider value={{ user, token: 't', login: jest.fn(), logout: jest.fn() }}>
            <Navbar />
         </AuthContext.Provider>
      );
      getByText('Admin Panel');
   });
});