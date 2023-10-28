import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { VERSION } from '../../../version';

@Injectable()
export class VersaoMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    res.setHeader('versao', VERSION.version+'-'+VERSION.distance)
    next();
  }
}
