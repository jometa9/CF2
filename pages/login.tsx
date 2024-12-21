import { useUser } from "../context/UserContext";
import { ethers } from "ethers";

const Login = () => {
  const { authenticate } = useUser();

  const connectAndAuthenticate = async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      alert("MetaMask no está instalado. Por favor, instálalo.");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum as any);
      const signer = await provider.getSigner();
      const walletAddress = await signer.getAddress();

      const message = "Autenticación en PropFirm";
      const signature = await signer.signMessage(message);

      await authenticate(walletAddress, signature);
    } catch (error) {
      console.error("Error al autenticar:", error);
      alert("Hubo un error al autenticar.");
    }
  };

  return (
    <div>
      <button onClick={connectAndAuthenticate}>Conectar y Autenticar Wallet</button>
    </div>
  );
};

export default Login;
