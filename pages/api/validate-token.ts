import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

// Clave secreta para firmar los tokens JWT (debe ser igual a la usada en authenticate.ts)
const SECRET_KEY = "mi_clave_secreta_super_segura";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Token no proporcionado" });
    }

    const token = authHeader.split(" ")[1];

    try {
      // Verificamos y decodificamos el token
      const decoded = jwt.verify(token, SECRET_KEY);
      return res.status(200).json({ valid: true, decoded });
    } catch (error) {
      console.error(error);
      return res.status(401).json({ error: "Token inválido o expirado" });
    }
  } else {
    return res.status(405).json({ error: "Método no permitido" });
  }
}
