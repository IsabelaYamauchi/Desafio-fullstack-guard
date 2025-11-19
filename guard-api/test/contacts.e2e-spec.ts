import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { ContactsModule } from '../src/contacts/contacts.module';
import { Contact } from '../src/contacts/entities/contact.entity';
import { Repository } from 'typeorm';

describe('ContactsModule (e2e)', () => {
  let app: INestApplication;
  let rep: Repository<Contact>;
  let createdId: number;

  beforeAll(async () => {
    process.env.CRYPTO_KEY = process.env.CRYPTO_KEY ?? 'test-secret-key';

    //inicia os testes isolados
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Contact],
          synchronize: true,
        }),
        ContactsModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    // validações
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();

    // acessa o repositório e verifica se estão criptografados
    rep = moduleFixture.get<Repository<Contact>>(getRepositoryToken(Contact));
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /contacts - creates and returns decrypted; DB stores encrypted', async () => {
    const res = await request(app.getHttpServer())
      .post('/contacts')
      .send({ name: 'Ana', email: 'ana@example.com', phone: '+5511999999999' })
      .expect(201);

    // resposta sera descriptografada
    expect(res.body).toMatchObject({
      name: 'Ana',
      email: 'ana@example.com',
      phone: '+5511999999999',
    });
    expect(res.body.id).toBeDefined();
    createdId = res.body.id;

    // valores no banco de dados vao estar criptografado
    const stored = await rep.findOneBy({ id: createdId });
    expect(stored?.email).not.toEqual('ana@example.com');
    expect(stored?.phone).not.toEqual('+5511999999999');
  });

  it('GET /contacts - list returns decrypted', async () => {
    const res = await request(app.getHttpServer()).get('/contacts').expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    const item = res.body.find((c: any) => c.id === createdId);
    expect(item.email).toEqual('ana@example.com');
    expect(item.phone).toEqual('+5511999999999');
  });

  it('GET /contacts/:id - returns decrypted contact', async () => {
    const res = await request(app.getHttpServer()).get(`/contacts/${createdId}`).expect(200);
    expect(res.body.email).toEqual('ana@example.com');
  });

  it('PATCH /contacts/:id - updates and keeps decrypted response', async () => {
    await request(app.getHttpServer())
      .patch(`/contacts/${createdId}`)
      .send({ phone: '+5511988887777' })
      .expect(200);

    // descriptografado
    const res = await request(app.getHttpServer()).get(`/contacts/${createdId}`).expect(200);
    expect(res.body.phone).toEqual('+5511988887777');

    // banco de dados encripta
    const stored = await rep.findOneBy({ id: createdId });
    expect(stored?.phone).not.toEqual('+5511988887777');
  });

  it('DELETE /contacts/:id - removes contact', async () => {
    await request(app.getHttpServer()).delete(`/contacts/${createdId}`).expect(200);
    await request(app.getHttpServer()).get(`/contacts/${createdId}`).expect(404);
  });
});
