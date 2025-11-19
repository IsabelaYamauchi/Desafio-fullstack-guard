import { randomBytes, createCipheriv, createDecipheriv, scryptSync } from 'crypto';

//gerar chave 32bytes
const key = scryptSync(process.env.CRYPTO_KEY ?? 'dev-secret', 'salt', 32);

export function encrypt(text: string) {
  //IV = vetor de inicialização
  const iv = randomBytes(12);

  // AES GCM => para cifrar e gerar tag de autenticação
  const cipher = createCipheriv('aes-256-gcm', key, iv);
  const enc = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();

  return Buffer.concat([iv, tag, enc]).toString('base64');
}

export function decrypt(payload: string) {
  // converte de base64 para bytes
  const data = Buffer.from(payload, 'base64');

  // iv ocupa os primeiros 12 bytes
  const iv = data.subarray(0, 12);

  // tag de autenticação ocupa os próximos bytes
  const tag = data.subarray(12, 28);

  //restante
  const enc = data.subarray(28);

  // cria o decipher AES-256-GCM com a mesma chave e iv
  const decipher = createDecipheriv('aes-256-gcm', key, iv);

  // injeta a tag para validar integridade
  decipher.setAuthTag(tag);

  // decipher.update(enc) = devolve parte dos bytes e decipher.final() devolve o resto
  //Buffer une as partes 
  const dec = Buffer.concat([decipher.update(enc), decipher.final()]);
  //retorna o texto original 
  return dec.toString('utf8');
}
