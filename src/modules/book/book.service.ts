// src/modules/book/book.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
 
import { Book } from 'src/core/schemas/book.schema';
import { CreateBookDTO } from './dto/book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<Book>,
  ) {}

  async createBook(createBookDto: CreateBookDTO){
    const createdBook = new this.bookModel(createBookDto);
    return createdBook.save();
  }

  async getAllBooks(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async getBookById(bookId: string): Promise<Book> {
    const book = await this.bookModel.findById(bookId).exec();
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  async updateBook(bookId: string, updateBookDto: CreateBookDTO): Promise<Book> {
    const updatedBook = await this.bookModel.findByIdAndUpdate(bookId, updateBookDto, { new: true }).exec();
    if (!updatedBook) {
      throw new NotFoundException('Book not found');
    }
    return updatedBook;
  }

  async deleteBook(bookId: string): Promise<void> {
    const result = await this.bookModel.deleteOne({ _id: bookId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Book not found');
    }
  }
}
