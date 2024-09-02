import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateCartDTO } from './dto/cart.dto';
import { Cart } from 'src/core/schemas/cart.schema';
import { Book } from 'src/core/schemas/book.schema';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<Cart>,
    @InjectModel(Book.name) private bookModel: Model<Book>,
  ) {}

  async createCart(createCartDTO: CreateCartDTO) {
    const { userId } = createCartDTO;

    const existingCart = await this.cartModel.findOne({ user: userId });

    if (existingCart) {
      throw new ConflictException('Cart already exists for this user.');
    }

    const newCart = new this.cartModel({
      user: userId,
      books: [],
      totalPrice: 0,
      numOfCartItems: 0,
    });

    await newCart.save();

    return {
      message: 'Cart created successfully',
      data: newCart,
    };
  }

  async getCartByUserId(userId: string) {
    const cart = await this.cartModel.findOne({ user: userId }).populate({
      path: 'books._id',
      model: 'Book',
    });

    if (!cart) {
      throw new NotFoundException('Cart not found for this user.');
    }

    return {
      message: 'Cart retrieved successfully',
      data: cart,
    };
  }

  async addToCart(userId: string, bookId: string) {
    const userObjectId = new Types.ObjectId(userId);
    const bookObjectId = new Types.ObjectId(bookId);

    // Check if the book exists
    const book = await this.bookModel.findById(bookObjectId);
    console.log(book);

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    // Find the cart for the user
    let cart = await this.cartModel.findOne({ user: userObjectId });

    if (!cart) {
      // If cart doesn't exist, create a new one
      cart = new this.cartModel({
        user: userObjectId,
        books: [{ _id: bookObjectId, quantity: 1 }],
        totalPrice: book.price,
        numOfCartItems: 1,
      });
    } else {
      // Check if the book already exists in the cart
      const existingBook = cart.books.find(
        (book) => book._id.toString() === bookObjectId.toString(),
      );

      if (existingBook) {
        // If book exists, increase quantity
        existingBook.quantity += 1;
      } else {
        // If book doesn't exist, add it to the cart
        cart.books.push({ _id: bookObjectId, quantity: 1 });
      }

      // Update total price and number of items
      cart.totalPrice += book.price;
      cart.numOfCartItems += 1;
    }

    // Save the updated cart
    await cart.save();

    return {
      message: 'Book added to cart successfully',
      data: cart,
    };
  }

  async updateCartQuantity(userId: string, bookId: string, quantity: number) {
    const userObjectId = new Types.ObjectId(userId);
    const bookObjectId = new Types.ObjectId(bookId);

    // Check if the book exists
    const book = await this.bookModel.findById(bookObjectId);
    if (!book) {
      throw new NotFoundException('Book not found');
    }

    // Find the cart for the user
    const cart = await this.cartModel.findOne({ user: userObjectId });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    // Check if the book exists in the cart
    const existingBook = cart.books.find(
      (book) => book._id.toString() === bookObjectId.toString(),
    );
    if (!existingBook) {
      throw new NotFoundException('Book not found in cart');
    }

    // Update the quantity or remove the book if quantity is 0
    if (quantity <= 0) {
      cart.books = cart.books.filter(
        (book) => book._id.toString() !== bookObjectId.toString(),
      );
    } else {
      existingBook.quantity = quantity;
    }

    // Recalculate the total price and number of items
    let totalPrice = 0;
    let numOfCartItems = 0;

    for (const book of cart.books) {
      const bookDetails = await this.bookModel.findById(book._id);
      if (bookDetails && bookDetails.price) {
        totalPrice += bookDetails.price * book.quantity;
        numOfCartItems += book.quantity;
      }
    }

    cart.totalPrice = totalPrice;
    cart.numOfCartItems = numOfCartItems;

    // Save the updated cart
    await cart.save();

    return {
      message: 'Cart updated successfully',
      data: cart,
    };
  }

 
  async removeBookFromCart(userId: string, bookId: string) {
    const userObjectId = new Types.ObjectId(userId);
    const bookObjectId = new Types.ObjectId(bookId);
  
    // Find the cart for the user
    const cart = await this.cartModel.findOne({ user: userObjectId });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
  
    // Check if the book exists in the cart
    const existingBookIndex = cart.books.findIndex(
      (book) => book._id.toString() === bookObjectId.toString(),
    );
    if (existingBookIndex === -1) {
      throw new NotFoundException('Book not found in cart');
    }
  
    // Remove the book from the cart
    const [removedBook] = cart.books.splice(existingBookIndex, 1);
  
    // Recalculate the total price and number of items
    cart.totalPrice -= removedBook.quantity * (await this.bookModel.findById(removedBook._id)).price;
    cart.numOfCartItems -= removedBook.quantity;
  
    // Save the updated cart
    await cart.save();
  
    return {
      message: 'Book removed from cart successfully',
      data: cart,
    };
  }
  

  

 
}
