import React from "react";
import CryptoJS from "crypto-js";
export const DH_Example = () => {
  /**
   * Diffie Hellman Key Exchange.
   * INTRO -
   * for simplfiy this algorithem we will choose this PK - 95,150,999
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

  /**
   * Find Primitive Root of PK - in our test case its 95150999
   * Definition:
   * Given a prime number n, the task is to find its primitive root under modulo n.
   * The primitive root of a prime number n is an integer r between[1, n-1] such that the values of r^x(mod n) where x is in the range[0, n-2] are different.
   * Return -1 if n is a non-prime number.
   *
   * RESORCE:
   * https://cp-algorithms.com/algebra/primitive-root.html
   *
   */

  /**
   * Varibales
   */
  const p = PKA;
  const g = findPrimitive(p);
  const alicePrivateKey = getRandPrime(2, p);
  const bobPrivateKey = getRandPrime(2, p);

  const alicePublicKey = power(g, alicePrivateKey, p);
  const bobPublicKey = power(g, bobPrivateKey, p);

  const sharedSecretKey_Bob = "" + power(alicePublicKey, bobPrivateKey, p);
  const sharedSecretKey_Alice = "" + power(bobPublicKey, alicePrivateKey, p);

  const cryptMessage = encryptAES("This is a Test", sharedSecretKey_Alice);
  const decryptMessage = decryptAES(cryptMessage, sharedSecretKey_Bob);
  return (
    <div>
      <p>p = {p}</p>
      <p>g = {g}</p>
      <p>Alice Private key = {alicePrivateKey}</p>
      <p>Bob Private key = {bobPrivateKey}</p>
      <p>-----------------------------------------</p>
      <p>Alice Calculate Public key = {alicePublicKey}</p>
      <p>Bob Calculate Public key = {bobPublicKey}</p>
      <p>-----------------------------------------</p>
      <p>Alice Shared Secret key = {sharedSecretKey_Alice}</p>
      <p>Bob Shared Secret key = {sharedSecretKey_Bob}</p>
      <p>-----------------------------------------</p>
      <p>encrypt message = {cryptMessage.toString()}</p>
      <p>decrypt message = {decryptMessage.toString()}</p>
    </div>
  );
};

const PKA = 95150999; // public key

export function generateAlicePrivateKey() {
  /**
   * Varibales
   */
  const p = PKA;
  const alicePrivateKey = getRandPrime(2, p);
  return alicePrivateKey;
}

export function generateAlicePKA(){
  /**
   * Varibales
   */
  const p = PKA;
  const g = findPrimitive(p);
  const alicePrivateKey = getRandPrime(2, p);
  const alicePublicKey = power(g, alicePrivateKey, p);

  return alicePublicKey;
}

export function generateSharedPrivateKey() {
  /**
   * Varibales
   */
  const p = PKA;
  const g = findPrimitive(p);
  const alicePrivateKey = getRandPrime(2, p);
  const alicePublicKey = power(g, alicePrivateKey, p);

  return alicePublicKey;
}
  /*
   * Encrypt a derived hd private key with a given pin and return it in Base64 form
   */
 export const encryptAES = (text, key) => {
   return CryptoJS.AES.encrypt(text, key).toString();
 };
  /**
   * Decrypt an encrypted message
   * @param encryptedBase64 encrypted data in base64 format
   * @param key The secret key
   * @return The decrypted content
   */
 export const decryptAES = (encryptedBase64, key) => {
    const decrypted = CryptoJS.AES.decrypt(encryptedBase64, key);
    if (decrypted) {
      try {
        const str = decrypted.toString(CryptoJS.enc.Utf8);
        if (str.length > 0) {
          return str;
        } else {
          return "error 1";
        }
      } catch (e) {
        return "error 2";
      }
    }
    return "error 3";
  };


    /**
   * Generate random Prime number in range
   *
   */

const getRandPrime = (min, max) => {
    let rnd = Math.floor(Math.random() * (max - min) + min);
    if (isPrime(rnd)) return rnd;
    return getRandPrime(min, max);
  };

    // Returns true if n is prime
function isPrime(n) {
  // Corner cases
  if (n <= 1) return false;
  if (n <= 3) return true;

  // This is checked so that we can skip
  // middle five numbers in below loop
  if (n % 2 === 0 || n % 3 === 0) return false;

  for (let i = 5; i * i <= n; i = i + 6)
    if (n % i === 0 || n % (i + 2) === 0) return false;

  return true;
}

  /* Iterative Function to calculate (x^n)%p in
O(logy) */
  /**
   * Modular exponentiation
   * https://en.wikipedia.org/wiki/Modular_exponentiation
   * @param {*} x
   * @param {*} y
   * @param {*} p
   * @returns
   */
function power(x, y, p) {
  let res = 1; // Initialize result

  x = x % p; // Update x if it is more than or
  // equal to p

  while (y > 0) {
    // If y is odd, multiply x with result
    if (y & 1) res = (res * x) % p;

    // y must be even now
    y = y >> 1; // y = y/2
    x = (x * x) % p;
  }
  return res;
}

  // Utility function to store prime factors of a number
function findPrimefactors(s, n) {
  // Print the number of 2s that divide n
  while (n % 2 === 0) {
    s.add(2);
    n = n / 2;
  }

  // n must be odd at this point. So we can skip
  // one element (Note i = i +2)
  for (let i = 3; i <= Math.sqrt(n); i = i + 2) {
    // While i divides n, print i and divide n
    while (n % i === 0) {
      s.add(i);
      n = n / i;
    }
  }

  // This condition is to handle the case when
  // n is a prime number greater than 2
  if (n > 2) s.add(n);
}

  // Function to find smallest primitive root of n
function findPrimitive(n) {
  let s = new Set();

  // Check if n is prime or not
  if (isPrime(n) === false) return -1;

  // Find value of Euler Totient function of n
  // Since n is a prime number, the value of Euler
  // Totient function is n-1 as there are n-1
  // relatively prime numbers.
  let phi = n - 1;

  // Find prime factors of phi and store in a set
  findPrimefactors(s, phi);

  // Check for every number from 2 to phi
  for (let r = 2; r <= phi; r++) {
    // Iterate through all prime factors of phi.
    // and check if we found a power with value 1
    let flag = false;
    for (let it of s) {
      // Check if r^((phi)/primefactors) mod n
      // is 1 or not
      if (power(r, phi / it, n) === 1) {
        flag = true;
        break;
      }
    }

    // If there was no power with value 1.
    if (flag === false) return r;
  }

  // If no primitive root found
  return -1;
}
  /**
   * End find Primitive root
   */
