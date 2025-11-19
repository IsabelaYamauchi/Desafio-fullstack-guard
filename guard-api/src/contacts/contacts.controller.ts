import { Controller,Body, Get, Param, Post, Patch, Query, Delete, ParseIntPipe, UsePipes } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from 'src/dto/create-contacts.dto';
import { UpdateContactDto } from 'src/dto/update-contacts.dto';

@Controller('contacts')
export class ContactsController {

    constructor(private readonly contactsService:ContactsService) {}


    @Get()
    findAll(@Query() pagination: any) {
        const { limit = 10, offset = 0 } = pagination;
        return this.contactsService.findAll();
    }

    @Get(':id')
    @UsePipes(ParseIntPipe)
    findOne(@Param('id', ParseIntPipe) id: number) {
       return this.contactsService.findOne(id);
    }

    @Post()
    create(@Body() createContactDto: CreateContactDto) {
    return this.contactsService.create(createContactDto);
}


    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateContactDto: UpdateContactDto) {
    return this.contactsService.update(id, updateContactDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
  return this.contactsService.remove(id);
    }


}
