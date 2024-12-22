import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { ethers } from "ethers";

// Clave secreta para firmar los tokens JWT
const SECRET_KEY = "mi_clave_secreta_super_segura";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { walletAddress, signature } = req.body;

    if (!walletAddress || !signature) {
      return res.status(400).json({ error: "Wallet address y firma son requeridos" });
    }

    try {
      // Mensaje que el usuario debió haber firmado
      const message = "Autenticación en PropFirm";

      // Verificamos la firma con ethers.js
      const recoveredAddress = ethers.verifyMessage(message, signature);

      if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
        return res.status(401).json({ error: "Firma inválida" });
      }

      // Generamos el token JWT
      const token = jwt.sign({ walletAddress }, SECRET_KEY, { expiresIn: "1h" });

      return res.status(200).json({ token });
    } catch (error) {
      console.error("Error al autenticar:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  } else {
    return res.status(405).json({ error: "Método no permitido" });
  }
}
