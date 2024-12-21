export interface UserContextProps {
    walletAddress: string | null;
    isAuthenticated: boolean;
    userRole: string | null; // Ejemplo: rol del usuario (admin, usuario, etc.)
    setWalletAddress: (address: string | null) => void;
    setUserRole: (role: string) => void;
    logout: () => void;
  }
  