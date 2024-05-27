import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from 'typeorm';
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

const algorithm = 'aes-256-cbc';
const password = 'sua-senha-ou-chave-mestra';
const iv = randomBytes(16);
const key = 'd85117047fd06d3afa79b6e44ee3a52eb426fc24c3a2e3667732e8da0342b4da';
console.log(key)
// const key = 'sua-chave-secreta'; // Substitua pela sua chave secreta

const ENCRYPTED_PREFIX:string = 'ENCRYPTED::';
const ENCRYPTED_PREFIX_LENGTH = ENCRYPTED_PREFIX.length;

const encrypt = (text) => {
    console.log('text', text)
  const cipher = createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return ENCRYPTED_PREFIX + encrypted;
};

const decrypt = (text) => {
  if (text.startsWith(ENCRYPTED_PREFIX)) {
    text = text.slice(ENCRYPTED_PREFIX_LENGTH); // Remove o prefixo
    const decipher = createDecipheriv(algorithm, Buffer.from(key), iv);
    let decrypted = decipher.update(text, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } else {
    // Se não começar com o prefixo, o valor não está criptografado
    return text;
  }
};

export function EncryptedColumn() {
  return function (target, propertyName) {
    const original = Reflect.getMetadata('design:type', target, propertyName);

    BeforeInsert()(target, propertyName);
    BeforeUpdate()(target, propertyName);

    Object.defineProperty(target, propertyName, {
      get: function () {
        const encryptedValue = this[`${propertyName}`];
        if (encryptedValue) {
          return decrypt(encryptedValue);
        }
        return encryptedValue;
      },
      set: function (value) {
        this[`${propertyName}`] = encrypt(value);
      },
    });

    Column({ type: 'text' })(target, `${propertyName}`);
  };
}
