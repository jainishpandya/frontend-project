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
      const clubId = req.params.clubId;

      if (!clubId) {
        return res.status(400).json({
          success: false,
          message: "Club ID is required"
        });
      }

      const { count, rows: books } = await book.findAndCountAll({
        where: {
          clubID: clubId
        },
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
          books: [],
          message: "No books found in this club. Start adding books to build your collection!"
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
      const { title, author, ISBN, clubuserId, categoryId, languageId, } = req.body;

      if (!title || !author || !ISBN || !clubuserId || !categoryId || !languageId) {
        return res.status(400).json({
          success: false,
          message: "All fields are required"
        });
      }

      const findClubUser = await clubuser.findByPk(clubuserId);
      if (!findClubUser) {
        return res.status(404).json({
          success: false,
          message: "user not found"
        });
      }

      const newBook = await book.create({
        title: title,
        author: author,
        ISBN: ISBN,
        clubuserId: clubuserId,
        categoryId: categoryId,
        languageId: languageId
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