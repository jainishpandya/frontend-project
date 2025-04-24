import React from 'react';
import { Op } from 'sequelize';

import book from '../db/models/book.js';
import clubuser from '../db/models/clubuser.js';

const bookController = {
  bookDetails: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1; 
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const search = req.query.search || '';
      const clubId = req.params.clubId;

      if (!clubId) {
        return res.status(400).json({
          success: false,
          message: "Club id is required"
        });
      }

      const whereClause = {
        clubId: clubId,
        ...(search && {
          [Op.or]: [
            { title: { [Op.iLike]: `%${search}%` } },
            { author: { [Op.iLike]: `%${search}%` } }
          ]
        })
      };

      const { count, rows: books } = await book.findAndCountAll({
        where: whereClause,
        attributes: ['id', 'title', 'ISBN', 'author', 'IsAvailable'],
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