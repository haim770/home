import React, { useReducer, createContext, useContext } from "react";
import dhReducer, { initialState } from "./DHReducer";
import CryptoJS from "crypto-js";
  /**
   * Diffie Hellman Key Exchange.
   * INTRO -
   * for simplify this algorithem we will choose this PK - 95,150,999
   * STEPS:
   * 1. Get p & g public keys, both must be prime numbers.
   * 2. g is primitive root of p.
   *  - Assume a prime number p
   *  - select g, primitive root of p -> g < p
   *  - g is primitive root of p if:
   *    * g mod p, g^2 mod p, g^3 mod p ... g^p-1 mod p
   *    * all this should result 1,2,3 ... q-1
   * 3. Alice and Bob will generate private keys.
   *    Alice a , Bob b
   *  - Keys must be prime
   *  - Keys must be smaller then p
   * 4. Calculate Privete key of Alice and Bob
   *  - KeyA = g ^ a mod p
   *  - KeyB - g ^ b mod p
   * 5. Result:
   *    Alice -> { a , KeyA }
   *    Bob   -> { b , KeyB }
   * 6. Lets Now generate the Shared key between Alice and Bob
   *    Alice will send to bob her Public key KeyA
   *    Bob Will send to alice his public key KeyB
   * 7. Alice Secret key = KeyB ^ a mod p
   *    Bob Secret key   = KeyA ^ b mod p
   *
   *
   * resource :
   * https://www.geeksforgeeks.org/implementation-diffie-hellman-algorithm/
   *
   *
   * Enryptin / Decription using ASE algorithm
   * Using  npm install crypto-js For JS
   * https://github.com/brainfoolong/cryptojs-aes-php for PHP
   */

const DHContext = createContext(initialState);

export const DHProvidor = ({ children }) => {
  const [state, dispatch] = useReducer(dhReducer, initialState);

  // Starting new chat
  const generateSharedKey = (bobPKA) => {
    dispatch({
      type: "GENERATE_SHARED_KEY",
      payload: {
        bobPKA: bobPKA,
        PKA: state.PKA,
        AlicePrivateKey: state.alicePrivateKey,
      },
    });
  };

  // Open user contacts list
  const generateAlicePKA = () => {
    dispatch({
      type: "GENERATE_ALICE_PKA",
      payload: {
        PKA: "95150999",
      },
    });
  };

  // Open user contacts list
  const setAlicePKA = (pvKey, PKA_ALICE) => {
    dispatch({
      type: "SET_ALICE_PKA",
      payload: {
        AlicePrivateKey: pvKey,
        alicePKA: PKA_ALICE,
      },
    });
  };

  // Open user contacts list
  const setPrivateShareKey = (shared_key) => {
    dispatch({
      type: "SET_SHARED_KEY",
      payload: {
        shared: shared_key,
      },
    });
  };

  // Starting new chat
  const encryptAES = (messageToEncrypt) => {
    const crypted = CryptoJS.AES.encrypt(
      JSON.stringify(messageToEncrypt),
      state.sharedSecretKey,
      { format: CryptoJSAesJson }
    ).toString();
    return crypted;
  };
  // Starting new chat
  const decryptAES = (messageEncrypted) => {
    try {
      const decrypted = JSON.parse(
        CryptoJS.AES.decrypt(messageEncrypted, state.sharedSecretKey, {
          format: CryptoJSAesJson,
        }).toString(CryptoJS.enc.Utf8)
      );
      return decrypted;
    } catch (err) {
      //console.log('error', err);
      //console.log("error messageEncrypted ", messageEncrypted);
      //console.log("secret key: ", state.sharedSecretKey);
    }
  };

  // the values we want to make global
  const value = {
    messageUse: state.useMessage,
    alicePKA: state.alicePublicKey,
    setPrivateShareKey,
    setAlicePKA,
    encryptAES,
    decryptAES,
    generateSharedKey,
    generateAlicePKA,
  };
  return <DHContext.Provider value={value}>{children}</DHContext.Provider>;
};

const useDH = () => {
    const context = useContext(DHContext);
    if(context === undefined){
        throw new Error(`useView must be used within ViewContext`);
    }
    return context;
}
export default useDH;

var CryptoJSAesJson = {
  stringify: function (cipherParams) {
    var j = { ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64) };
    if (cipherParams.iv) j.iv = cipherParams.iv.toString();
    if (cipherParams.salt) j.s = cipherParams.salt.toString();
    return JSON.stringify(j);
  },
  parse: function (jsonStr) {
    var j = JSON.parse(jsonStr);
    var cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.enc.Base64.parse(j.ct),
    });
    if (j.iv) cipherParams.iv = CryptoJS.enc.Hex.parse(j.iv);
    if (j.s) cipherParams.salt = CryptoJS.enc.Hex.parse(j.s);
    return cipherParams;
  },
};