import { AuthService } from './auth.service';
import { of } from 'rxjs';
import { AuthResponse, LoginRequest, RegisterRequest } from '../models/user.model';

describe('AuthService', () => {
  let service: AuthService;
  let httpClientSpy: any;

  const mockAuthResponse: AuthResponse = {
    token: 'fake-jwt-token',
    user: {
      userId: 'user-123',
      name: 'João Silva',
      email: 'joao@example.com',
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z'
    }
  };

  beforeEach(() => {
    httpClientSpy = {
      post: vitest.fn()
    };
    service = new AuthService(httpClientSpy as any);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login and store token and user in localStorage', () => {
    httpClientSpy.post.mockReturnValue(of(mockAuthResponse));
    const credentials: LoginRequest = { email: 'joao@example.com', password: 'password123' };

    service.login(credentials).subscribe();

    expect(localStorage.getItem('autocheck_token')).toBe('fake-jwt-token');
    expect(JSON.parse(localStorage.getItem('autocheck_user') || '{}').userId).toBe('user-123');
    expect(service.isAuthenticated).toBe(true);
  });

  it('should register and store token and user in localStorage', () => {
    httpClientSpy.post.mockReturnValue(of(mockAuthResponse));
    const data: RegisterRequest = { name: 'João Silva', email: 'joao@example.com', password: 'password123' };

    service.register(data).subscribe();

    expect(localStorage.getItem('autocheck_token')).toBe('fake-jwt-token');
    expect(service.isAuthenticated).toBe(true);
  });

  it('should logout and clear localStorage', () => {
    localStorage.setItem('autocheck_token', 'token');
    localStorage.setItem('autocheck_user', '{}');
    
    service.logout();

    expect(localStorage.getItem('autocheck_token')).toBeNull();
    expect(localStorage.getItem('autocheck_user')).toBeNull();
    expect(service.isAuthenticated).toBe(false);
  });
});
