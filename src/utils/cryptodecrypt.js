import * as CryptoJS from "crypto-js";

const getSecretKey = () => {
  const key = "c5ba0ffedc7f32698019ff7c15ca4ca7c394b7b5534a466e0ae59a73179bb662";
  if (!key) {
    throw new Error("Missing CRYPTO KEY");
  }
  return key;
};


export const decryptData = (encryptedregNo) => {
  try {
    if (!encryptedregNo || typeof encryptedregNo !== "string") {
      return null;
    }

    // ✅ FIX: Handle spaces that might have replaced '+' symbols
    const decoded = decodeURIComponent(encryptedregNo).replace(/ /g, '+');
    const SECRET_KEY = getSecretKey();

    // Decrypt
    const bytes = CryptoJS.AES.decrypt(decoded, SECRET_KEY);

    // Convert to text
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);

    // ✅ FIX: Check if result is empty (implies wrong key or corrupted data)
    if (!decrypted) {
        console.error("Decryption resulted in empty string");
        return null;
    }
    
    return decrypted;
  } catch (error) {
    console.error("❌ Decryption failed:", error.message);
    return null;
  }
};