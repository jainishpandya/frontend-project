import { Op } from 'sequelize';
import Book from '../db/models/book.js';
import language from '../db/models/language.js';
import category from '../db/models/category.js';
import jwt from '../jwt.js';

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
      const clubId = req.params.clubId;

      if (!clubId) {
        return res.status(400).json({
          success: false,
          message: "Club id is required"
        });
      }

      const whereClause = {
        clubId: clubId,
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

      const { count, rows: books } = await Book.findAndCountAll({
        where: whereClause,
        attributes: ['id', 'userId', 'title', 'ISBN', 'author', 'IsAvailable'],
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
        order: [['title', 'ASC']],
        offset: offset,
        limit: limit
      });

      if (!books.length) {
        return res.status(200).json({
          success: true,
          total: count,
          page: page,
          limit: limit,
          books: [],
        });
      }

      const response = {
        success: true,
        total: count,
        page: page,
        limit: limit,
        books: books,
      };
      res.status(200).json(response);
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

  myBooks: async (req, res) => {

    try{
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const search = req.query.search || '';
      const status = req.query.status || 'all';
      const categories = req.query.categories ? JSON.parse(req.query.categories) : [];
      const languages = req.query.languages ? JSON.parse(req.query.languages) : [];
      const clubId = req.params.clubId;
      

      const token = req.query.token;
      if (!token) {
        return res.status(400).json({
          success: false,
          message: "Token is required"
        });
      }
      const userId = jwt.getUserIdFromToken(token)
      console.log("User Id : ",userId)

      const whereClause = {
        clubId: clubId,
        userId: userId,
        ...(search.trim() !== '' && {
          [Op.or]: [
            { title: { [Op.iLike]: `%${search}%` } },
            { author: { [Op.iLike]: `%${search}%` } }
          ]
        }),
        
      };

      const {count, rows: books} = await Book.findAndCountAll({
        where: whereClause,
        attributes: ['id','userId','title','ISBN','author','IsAvailable'],
        order: [['title', 'ASC']],
        offset: offset,
        limit: limit

        
      });

      const response ={
        success:true,
        total:count,
        page:page,
        limit:limit,
        books:books
        
      };
      res.status(200).json(response);

    
    }
    catch(error){
      console.error('Error fetching book details:', error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error"
      });
    }
  }
};

export default bookController;