const jwt = require("jsonwebtoken");
const { verifyWalletSignature } = require("../services/auth");

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

exports.login = async (req, res) => {
  try {
    const { walletAddress, signature } = req.body;

    const isValid = verifyWalletSignature(walletAddress, signature);
    if (!isValid) {
      return res.status(401).json({ message: "Firma inválida" });
    }

    const token = jwt.sign({ walletAddress }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error en el inicio de sesión", error });
  }
};

exports.profile = (req, res) => {
  res.json({ walletAddress: req.user.walletAddress });
};