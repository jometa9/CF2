import { useRouter } from "next/router";
import { ethers } from "ethers";

const Login = () => {
  const router = useRouter();

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask no está instalado.");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum as any);
      const signer = await provider.getSigner();
      const walletAddress = await signer.getAddress();

      const message = "Autenticación en PropFirm";
      const signature = await signer.signMessage(message);

      const res = await fetch("/api/authenticate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ walletAddress, signature }),
      });

      if (res.ok) {
        const { token } = await res.json();
        localStorage.setItem("token", token);
        router.push("/dashboard");
      } else {
        const { error } = await res.json();
        alert(error);
      }
    } catch (error) {
      console.error("Error al conectar la wallet:", error);
    }
  };

  return (
    <div>
      <button onClick={connectWallet}>Conectar Wallet</button>
    </div>
  );
};

export default Login;
