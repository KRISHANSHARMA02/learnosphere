import * as CryptoJS from "crypto-js";

const getSecretKey = () => {
  const key = "c5ba0ffedc7f32698019ff7c15ca4ca7c394b7b5534a466e0ae59a73179bb662";
  if (!key) {
    throw new Error("Missing CRYPTO KEY");
  }
  return key;
};

export const encryptData = (regNo) => {
  const SECRET_KEY = getSecretKey();

  return encodeURIComponent(
    CryptoJS.AES.encrypt(regNo, SECRET_KEY).toString()
  );
};
