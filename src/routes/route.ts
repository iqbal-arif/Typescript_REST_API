/************IMPORTS */
/**Typescript REQUEST & RESPONSE from express */
import { Request, Response } from 'express';

export function root(request: Request, response: Response) {
  /**All request.Method and response.Method for HTTP  */
  response.status(200).send('<h1>Express Server is Up and Running.</h1>');
}
