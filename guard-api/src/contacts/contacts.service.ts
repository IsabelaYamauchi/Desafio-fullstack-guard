import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Contact } from './entities/contact.entity';
import { CreateContactDto } from 'src/dto/create-contacts.dto';
import { UpdateContactDto } from 'src/dto/update-contacts.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueryFailedError } from 'typeorm/error/QueryFailedError';
import { encrypt, decrypt } from '../cripto.utils';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}

  private throwNotFoundError(): never {
    throw new NotFoundException('Contact not found');
  }

  findAll() {
    return this.contactRepository.find().then((list) => list.map((c) => this.mapToDto(c)));
  }

  async findOne(id: number) {
    const contact = await this.contactRepository.findOne({ where: { id } });
    if (!contact) return this.throwNotFoundError();
    return this.mapToDto(contact);
  }

  async create(dto: CreateContactDto) {
    const toSave = {
      ...dto,
      email: encrypt(dto.email),
      phone: encrypt(dto.phone),
    };
    const entity = this.contactRepository.create(toSave);
    const saved = await this.contactRepository.save(entity);
    return this.mapToDto(saved);
  }

  async update(id: number, updateContactDto: UpdateContactDto) {
    const contact = await this.contactRepository.findOneBy({ id });
    if (!contact) return this.throwNotFoundError();

    if (updateContactDto.name !== undefined) contact.name = updateContactDto.name;
    if (updateContactDto.email !== undefined) contact.email = encrypt(updateContactDto.email);
    if (updateContactDto.phone !== undefined) contact.phone = encrypt(updateContactDto.phone);

    try {
      const saved = await this.contactRepository.save(contact);
      return this.mapToDto(saved);
    } catch (error) {
      if (error instanceof QueryFailedError && (error as any).code === '23505') {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  async remove(id: number) {
    const contact = await this.contactRepository.findOneBy({ id });
    if (!contact) return this.throwNotFoundError();
    await this.contactRepository.remove(contact);
    return { id };
  }

  private mapToDto(contact: Contact) {
    return {
      ...contact,
      email: decrypt(contact.email),
      phone: decrypt(contact.phone),
    };
  }
}
