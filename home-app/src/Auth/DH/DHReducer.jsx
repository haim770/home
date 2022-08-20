import CryptoJS from "crypto-js";

// initial the view states
export const initialState = {
  alicePrivateKey: "",
  alicePublicKey: "",
  sharedSecretKey: "",
  /**
   * PKA - Public Key
   * For simplfy this algorithem we will choose PKA
   */
  PKA: "95150999",
  useMessage: "",
};

const dhReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "GENERATE_ALICE_PKA":
      const alicePrivateKey = generateAlicePrivateKey(payload.PKA);
      const alicePublicKey = generateAlicePKA(payload.PKA, alicePrivateKey);
      return {
        ...state,
        alicePrivateKey: alicePrivateKey,
        alicePublicKey: alicePublicKey,
      };

    case "GENERATE_SHARED_KEY":
      const ssk = generateSharedPrivateKey(
          payload.PKA,
          payload.bobPKA,
          payload.AlicePrivateKey
        );
      return {
        ...state,
        sharedSecretKey: ssk,
      };

    case "ENCRYPT_AES":
      return {
        ...state,
        useMessage: encryptAES(
          payload.messageUse,
          payload.sharedSecretKey
        ),
      };
    case "DECRYPT_AES":
      return {
        ...state,
        useMessage: decryptAES(payload.messageUse, payload.sharedSecretKey),
      };
    default:
      // only for the dev
      throw new Error(`No case for type ${type} in chat reducer`);
  }
};

export default dhReducer;

function generateAlicePrivateKey(p) {
  /**
   * Varibales
   */
  const alicePrivateKey = getRandPrime(2, p);
  return alicePrivateKey;
}

function generateAlicePKA(p,alicePrivateKey) {
  /**
   * Varibales
   */

  const g = findPrimitive(p);
  const alicePublicKey = power(g, alicePrivateKey, p);

  return alicePublicKey;
}

function generateSharedPrivateKey(p,bobPKA,alicePrivateKey) {
  return "" + power(bobPKA, alicePrivateKey, p);
}

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


/*
 * Encrypt a derived hd private key with a given pin and return it in Base64 form
 */
const encryptAES = (text, key) => {
    var JsonFormatter = CryptoJS.JsonFormatter;
    const crypted = CryptoJS.AES.encrypt(text, key, { format: JsonFormatter });
    console.log(crypted);
    //return tt;
};
/**
 * Decrypt an encrypted message
 * @param encryptedBase64 encrypted data in base64 format
 * @param key The secret key
 * @return The decrypted content
 */
const decryptAES = (encrypted, key) => {
  const decrypted = CryptoJS.AES.decrypt(encrypted, key);
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
