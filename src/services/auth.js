const ethers = require('ethers');

exports.verifyWalletSignature = (walletAddress, signature) => {
  const message = 'Iniciar sesión en PropFirm';
  const signerAddress = ethers.utils.verifyMessage(message, signature);
  return signerAddress.toLowerCase() === walletAddress.toLowerCase();
};
