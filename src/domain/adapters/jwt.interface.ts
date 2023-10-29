export interface IJwtServicePayload {
  id: number;
  email: string;
  canReadMessage: boolean;
  master: boolean;
  profile: string;
  sla: string;
  name: string;
}

export abstract class IJwtService {
  abstract checkToken(token: string, secret: string): Promise<IJwtServicePayload>;
  abstract createToken(
    payload: IJwtServicePayload,
    secret: string,
    expiresIn: string,
  ): string;
}
