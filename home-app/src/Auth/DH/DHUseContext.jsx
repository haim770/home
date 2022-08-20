import React, { useReducer, createContext, useContext } from "react";
import dhReducer, { initialState } from "./DHReducer";
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
        PKA: state.PKA,
      },
    });
  };

  // Starting new chat
  const encryptAES = (messageToEncrypt) => {
    dispatch({
      type: "ENCRYPT_AES",
      payload: {
        messageUse: messageToEncrypt,
        sharedSecretKey: state.sharedSecretKey,
      },
    });
  };
  // Starting new chat
  const decryptAES = (messageToDEcrypt) => {
    dispatch({
      type: "DECRYPT_AES",
      payload: {
        messageUse: messageToDEcrypt,
        sharedSecretKey: state.sharedSecretKey,
      },
    });
  };

  // the values we want to make global
  const value = {
    messageUse: state.useMessage,
    alicePKA: state.alicePublicKey,

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

