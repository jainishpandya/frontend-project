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

      const token = req.body.token || req.query.token || req.headers['authorization']?.split(' ')[1];
      console.log("Token:", token);

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
        })
      }; // <-- this closing } was missing

      const { count, rows: books } = await book.findAndCountAll({
        where: whereClause,
        attributes: ['id', 'userId', 'title', 'ISBN', 'author', 'IsAvailable'],
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

      const message = search.trim() !== '' && count === 0 ? "No books found matching your search" : "No books found in this club";
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
