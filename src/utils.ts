// ***** Node Crypto Module at Runtime
const crypto = require('crypto');
/****UTILITY Function to Convert callback based API Functions to Promise based API*/
const util = require('util');
/***HashPassword converted to promised based through Node Util by passing crypto param */
const hashPassword = util.promisify(crypto.pbkdf2);

export function isInteger(input: string) {
  /* ^ Start delimiter
       $ End delimiter
       \d Only matching decimal number
       + At least one digit
   Because of null coalescing operator , any null, undefined, or non decimal will return false
       */

  return input?.match(/^\d+$/) ?? false;
}
export async function calculatePasswordHash(
  plainTextPassword: string,
  passwordSalt: string
) {
  const passwordHash = await hashPassword(
    plainTextPassword,
    passwordSalt,
    1000,
    64,
    'sha512'
  );

  return passwordHash.toString('hex');
}
