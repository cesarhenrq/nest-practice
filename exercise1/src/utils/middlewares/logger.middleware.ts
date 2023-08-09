import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Base URL: ', req.baseUrl);
    console.log('Hostname: ', req.hostname);
    console.log('IP: ', req.ip);
    console.log('Method: ', req.method);
    next();
  }
}
