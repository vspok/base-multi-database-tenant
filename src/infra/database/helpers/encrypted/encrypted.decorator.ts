import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import crypto from 'crypto';

export function EncryptedField() {
  return function (target: Object, propertyKey: string) {
    const ivLength = 16; // Tamanho do vetor de inicialização

    // Getter para descriptografar o campo ao carregá-lo da base de dados
    function get() {
      const encryptedValue = this[propertyKey];
      if (encryptedValue) {
        const secret = 'chave_secreta'; // Substitua pela chave segura
        const iv = Buffer.from(encryptedValue.slice(0, ivLength), 'hex');
        const encryptedText = encryptedValue.slice(ivLength);

        const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secret), iv);
        const decrypted = decipher.update(encryptedText, 'hex', 'utf8') + decipher.final('utf8');
        return decrypted;
      }
      return null;
    }

    // Setter para criptografar o campo antes de inserir ou atualizar
    function set(newValue: string) {
      const secret = 'chave_secreta'; // Substitua pela chave segura
      const iv = crypto.randomBytes(ivLength);
      const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secret), iv);
      const encryptedValue = iv.toString('hex') + cipher.update(newValue, 'utf8', 'hex') + cipher.final('hex');
      this[propertyKey] = encryptedValue;
    }

    Object.defineProperty(target, propertyKey, {
      get: get,
      set: set,
      enumerable: true,
      configurable: true,
    });
  };
}
