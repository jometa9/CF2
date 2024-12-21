// services/auth.ts
export const authenticateUser = async (walletAddress: string, signature: string) => {
    try {
      const response = await fetch("/api/authenticate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ walletAddress, signature }),
      });
  
      if (!response.ok) {
        throw new Error("Error en la autenticación");
      }
  
      const data = await response.json();
      return data; // { token: string }
    } catch (error) {
      console.error("Error en authenticateUser:", error);
      throw error;
    }
  };
  
  export const validateToken = async (token: string) => {
    try {
      const response = await fetch("/api/validate-token", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (!response.ok) {
        throw new Error("Token inválido");
      }
  
      const data = await response.json();
      return data; // { walletAddress: string }
    } catch (error) {
      console.error("Error en validateToken:", error);
      throw error;
    }
  };
  