export function isInteger(input: string) {
  /* ^ Start delimiter
       $ End delimiter
       \d Only matching decimal number
       + At least one digit
   Because of null coalescing operator , any null, undefined, or non decimal will return false
       */

  return input?.match(/^\d+$/) ?? false;
}
