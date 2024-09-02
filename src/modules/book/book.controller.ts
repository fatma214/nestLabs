import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { BookService } from './book.service';
 
import { CreateBookDTO } from './dto/book.dto';
import { Book } from 'src/core/schemas/book.schema';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async createBook(@Body() createBookDTO: CreateBookDTO): Promise<Book> {
    return await this.bookService.createBook(createBookDTO);
  }

  @Get()
  async getAllBooks(): Promise<Book[]> {
    return await this.bookService.getAllBooks();
  }

  @Get(':id')
  async getBookById(@Param('id') id: string): Promise<Book> {
    return await this.bookService.getBookById(id);
  }

  // @Delete(':id')
  // async deleteBook(@Param('id') id: string): Promise<Book> {
  //   return await this.bookService.deleteBook(id);
  // }
}
