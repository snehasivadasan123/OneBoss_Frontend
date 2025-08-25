export interface User {
  clientUuid: string,
  dealerAccountCode: string,
  email?: string,
  name?: string
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
export interface AuthContextType extends AuthState {
  login: (uuid: string, dealerAccountCode: string) => void;
  logout: () => void;
  clearError: () => void;
}