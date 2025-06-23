import { Op, where } from 'sequelize';
import Book from '../db/models/book.js';
import language from '../db/models/language.js';
import category from '../db/models/category.js';
import jwt from '../jwt.js';
import transaction from '../db/models/transaction.js';

const bookController = {
  bookDetails: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const search = req.query.search || '';
      const status = req.query.status || 'all';
      const categories = req.query.categories ? JSON.parse(req.query.categories) : [];
      const languages = req.query.languages ? JSON.parse(req.query.languages) : [];
      const clubId = parseInt(req.query.clubId);
      const role = req.body.role;
      const sortField = req.query.sortField || 'title';
      const sortOrder = req.query.sortOrder || 'ASC';
      
      const allowedSortFields = ['title', 'createdAt', 'IsAvailable'];
      const allowedSortOrders = ['ASC', 'DESC'];


      if (!allowedSortFields.includes(sortField)) {
        return res.status(400).json({
          success: false,
          message: "Invalid sort field"
        });
      }

      if (!allowedSortOrders.includes(sortOrder)) {
        return res.status(400).json({
          success: false,
          message: "Invalid sort order"
        });
      }
      let whereClause = {
        ...(search.trim() !== '' && {
          [Op.or]: [
            { title: { [Op.iLike]: `%${search}%` } },
            { author: { [Op.iLike]: `%${search}%` } }
          ]
        }),
        ...(status !== 'all' && {
          IsAvailable: status === 'available'
        }),
        ...(categories.length > 0 && {
          categoryId: {
            [Op.in]: categories
          }
        }),
        ...(languages.length > 0 && {
          languageId: {
            [Op.in]: languages
          }
        }),
      };

      if (role != 0) {
        if (!clubId) {
          return res.status(400).json({
            success: false,
            message: "Club ID is required"
          });
        }
        whereClause = {
          ...whereClause,
          clubId: clubId
        };
      }

      const { count, rows: books } = await Book.findAndCountAll({
        where: whereClause,
        attributes: ['id', 'userId', 'title', 'ISBN', 'author', 'IsAvailable', 'createdAt'],
        include: [
          {
            model: category,
            attributes: ['CategoryName']
          },
          {
            model: language,
            attributes: ['LanguageName']
          }
        ],
        order: [[sortField, sortOrder]],
        offset: offset,
        limit: limit
      });

      return res.status(200).json({
        success: true,
        total: count,
        page: page,
        limit: limit,
        sortField: sortField,
        sortOrder: sortOrder,
        books: books
      });

    } catch (error) {
      console.error('Error fetching book details:', error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error"
      });
    }
  },

  AddBooks: async (req, res) => {
    try {
      const { title, author, ISBN, clubId, token, categoryId, languageId } = req.body;

      if (!title || !author || !ISBN || !clubId || !token || !categoryId || !languageId) {
        return res.status(400).json({
          success: false,
          message: "All fields are required"
        });
      }

      const userId = jwt.getUserIdFromToken(token);


      const newBook = await Book.create({
        title: title,
        author: author,
        ISBN: ISBN,
        clubId: clubId,
        userId: userId,
        categoryId: categoryId,
        languageId: languageId,
        IsAvailable: true
      });

      if (newBook) {
        return res.status(201).json({
          success: true,
          message: "Book added successfully",
          book: newBook
        });
      }
    } catch (error) {
      console.error('Error adding book:', error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error"
      });
    }
  },

  EditBook: async (req, res) => {
    try {
      const { title, author, ISBN, clubId, token, categoryId, languageId } = req.body;
      // console.log("request body:", req.body);

      const bookId = req.params.bookId;

      if (!title || !author || !ISBN || !categoryId || !languageId || !clubId || !token) {
        return res.status(400).json({
          success: false,
          message: "All fields are required"
        });
      }
      if (!bookId) {
        return res.status(400).json({
          success: false,
          message: "Book ID is required"
        });
      }
      const userId = jwt.getUserIdFromToken(token);

      const existingBook = await Book.findOne({
        where: {
          id: bookId,
          userId: userId,
          clubId: clubId
        }
      });

      if (!existingBook) {
        return res.status(404).json({
          success: false,
          message: "Book not found"
        });
      }

      const updatedBook = await Book.update({
        title: title,
        author: author,
        ISBN: ISBN,
        categoryId: categoryId,
        languageId: languageId,
      }, {
        where: {
          id: bookId,
          userId: userId,
          clubId: clubId
        },
        returning: true
      })

      if (!updatedBook[0]) {
        return res.status(400).json({
          success: false,
          message: "Failed to update book"
        });
      }

      return res.status(200).json({
        success: true,
        message: "Book updated successfully",
        book: updatedBook[1][0]
      });

    } catch (error) {
      console.error('Error editing book:', error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error"
      });
    }
  },

  myBooks: async (req, res) => {

    try {
      const clubId = parseInt(req.query.clubId);
      const token = req.query.token;

      if (!token) {
        return res.status(400).json({
          success: false,
          message: "Token is required"
        });
      }

      const userId = parseInt(jwt.getUserIdFromToken(token));

      console.log("User Id : ", userId);
      console.log("userid type : ", typeof (userId));

      const fetchedbooks = await Book.findAll({
        where: {
          clubId: clubId,
          userId: userId,
        },
        include: [
          {
            model: category,
            as: 'category',
            attributes: ['id', 'CategoryName']
          },
          {
            model: language,
            as: 'language',
            attributes: ['id', 'LanguageName']
          }
        ]
      });

      const response = {
        success: true,
        books: fetchedbooks
      };
      res.status(200).json(response);

    }
    catch (error) {
      console.error('Error fetching book details:', error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error"
      });
    }
  },

  dashboardData: async (req, res) => {
    try {
      const clubId = parseInt(req.query.clubId);
      const token = req.query.token;

      if (!token) {
        return res.status(400).json({
          success: false,
          message: "Token is required"
        });
      }

      if (!clubId) {
        return res.status(400).json({
          success: false,
          message: "Club ID is required"
        });
      }

      const userId = parseInt(jwt.getUserIdFromToken(token));

      const booksReadCount = await transaction.count({
        where: {
          borrowerId: userId,
          status: '7'
        }
      });
      // console.log("Books Read Count : ", booksReadCount);

      const booksListedCount = await Book.count({
        where: {
          userId: userId,
          clubId: clubId
        }
      });
      // console.log("Books Listed Count : ", booksListedCount);

      const booksBorrowedCount = await transaction.count({
        where: {
          borrowerId: userId,
          clubId: clubId,
          status: {
            [Op.in]: ['5', '6']
          }
        }
      });
      // console.log("Books Borrowed Count : ", booksBorrowedCount);

      return res.status(200).json({
        success: true,
        booksReadCount,
        booksListedCount,
        booksBorrowedCount
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error"
      });
    }
  },
};

export default bookController;