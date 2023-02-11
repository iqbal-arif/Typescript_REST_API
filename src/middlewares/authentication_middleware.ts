import { NextFunction, Request, Response } from 'express';
import { logger } from '../logger';
const JWT_SECRET = process.env.JWT_SECRET; //JSON Secret code
const jwt = require('jsonwebtoken'); // JSON Library

export function checkIfAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  // Retrieving authJwtToken (authorization header) from header. It Includes requester ID and Email in the payload
  const authJwtToken = request.headers.authorization;

  if (!authJwtToken) {
    logger.info(`The authentication JWT is not present, access denied.`);
    response.sendStatus(403);
    return;
  }

  checkJwtValidity(authJwtToken)
    .then((user) => {
      logger.info(`Authentication JWT successfully decoded:`, user);
      request['user'] = user;

      next();
    })
    .catch((err) => {
      logger.error(
        `Could not validate the authentication JWT, access denied.`,
        err
      );
      response.sendStatus(403);
    });
}
//   Decode JSONWEBTOKEN To Validate the Signature

async function checkJwtValidity(authJwtToken: string) {
  const user = await jwt.verify(authJwtToken, JWT_SECRET);

  logger.info('Found user details in JWT:', user);

  return user;
}
