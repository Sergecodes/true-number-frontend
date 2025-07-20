import { render, screen } from '@testing-library/react';
import { AuthContext, User } from '../../context/AuthContext';
import ProfilePage from '../profile';

jest.mock('next/router', () => ({ useRouter: jest.fn() }));

describe('ProfilePage', () => {
  it('displays user information', () => {
    const user = { username: 'user1', email: 'u@a.com', phone: '123', role: 'client', balance: 100 } as User;
    render(
      <AuthContext.Provider value={{ user, token: 't', login: jest.fn(), logout: jest.fn() }}>
        <ProfilePage />
      </AuthContext.Provider>
    );

    expect(screen.getByText(/My Profile/i)).toBeInTheDocument();
    expect(screen.getByText(/user1/)).toBeInTheDocument();
    expect(screen.getByText(/u@a.com/)).toBeInTheDocument();
    expect(screen.getByText(/123/)).toBeInTheDocument();
    expect(screen.getByText(/100/)).toBeInTheDocument();
  });
});