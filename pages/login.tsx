import { useState } from "react";
import { ethers } from "ethers";
import Link from "next/link"; // Asegúrate de importar Link correctamente desde Next.js.

const Login = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const connectWallet = async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      alert("MetaMask no está instalado. Por favor, instálalo.");
      return;
    }

    try {
      // Usar BrowserProvider en ethers.js v6
      const provider = new ethers.BrowserProvider(window.ethereum as any);

      // Solicitar acceso a la wallet
      const accounts = await provider.send("eth_requestAccounts", []); // Pedir acceso a la wallet
      console.log(accounts);
      const signer = await provider.getSigner(); // Obtener el signer
      const address = await signer.getAddress(); // Dirección conectada

      setWalletAddress(address); // Guardar la dirección en el estado
    } catch (error) {
      console.error("Error al conectar la wallet:", error);
      alert(
        "Hubo un error al conectar la wallet. Revisa la consola para más detalles."
      );
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      {walletAddress ? (
        <div>
          <p className="text-lg">Wallet conectada: {walletAddress}</p>
          <Link href="/dashboard">
            <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
              Ir al Dashboard
            </button>
          </Link>
          <button
            className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 ml-4"
            onClick={() => setWalletAddress(null)}
          >
            Desconectar Wallet
          </button>
        </div>
      ) : (
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={connectWallet}
        >
          Conectar Wallet
        </button>
      )}
    </div>
  );
};

export default Login;
