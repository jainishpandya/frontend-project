import React from 'react';
import { Op } from 'sequelize';
import book from '../db/models/book.js';
import category from '../db/models/category.js';
import language from '../db/models/language.js';
import jwt from '../jwt.js';

const bookController = {
  bookDetails: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const search = req.query.search || '';
      const clubId = req.params.clubId;
 // Default to null if not authenticated
      const token = req.body.token || req.query.token|| req.headers['authorization']?.split(' ')[1];
      //  const userId = jwt.getUserIdFromToken(token); // Extract token from headers or body/query
      console.log("Token:", token);
      // if (token) {
      //   try {
      //     const userId = jwt.getUserIdFromToken(token);
      //   } catch (error) {
      //     // Silently handle token errors - the user is just not authenticated
      //     console.log("Token error:", error.message);
      //   }
      // }
      
      if (!clubId) {
        return res.status(400).json({
          success: false,
          message: "Club id is required"
        });
      }

      const whereClause = {
        clubId: clubId,
        // userId: userId,
        ...(search && {
          [Op.or]: [
            { title: { [Op.iLike]: `%${search}%` } },
            { author: { [Op.iLike]: `%${search}%` } }
          ]
        })
      };

      const { count, rows: books } = await book.findAndCountAll({
        where: whereClause,
        attributes: ['id','userId', 'title', 'ISBN', 'author', 'IsAvailable'],
        include: [
          {
            model: category,
            attributes: ['CategoryName'],
          },
          {
            model: language,
            attributes: ['LanguageName'],
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
          books: []
        });
      }

      const response = {
        success: true,
        total: count,
        page: page,
        limit: limit,
        books: books
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

  // Add more methods as needed
  AddBooks: async (req, res) => {
    try {
      const { title, author, ISBN, clubId, userId, categoryId, languageId } = req.body;

      if (!title || !author || !ISBN || !clubId || !userId || !categoryId || !languageId) {
        return res.status(400).json({
          success: false,
          message: "All fields are required"
        });
      }

      const newBook = await book.create({
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
  }
};

export default bookController;