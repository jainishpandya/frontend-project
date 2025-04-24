import React from 'react';
import { Op } from 'sequelize';

import book from '../db/models/book.js';
import clubuser from '../db/models/clubuser.js';

const bookController = {
  bookDetails: async (req, res) => {
    try {
      const page = parseInt(req.query.page) - 1 || 0;
      const limit = parseInt(req.query.limit) || 10;
      const search = req.query.search || "";
      const { clubuserId } = req.params;

      // Check if ISBN is provided
      if (!clubuserId) {
        return res.status(400).json({
          success: false,
          message: "User ID and Club Details is required"
        });
      }

      // Finding book by ISBN
      const bookByISBN = await book.findOne({
        where: {
          clubuserId: clubuserId
        },  
        attributes: ['title', 'ISBN', 'author'],

      });

      if (!bookByISBN) {
        return res.status(404).json({
          success: false,
          message: "Book not found"
        });
      }

      // Finding all books with search criteria
      const { count, rows: booklist } = await book.findAndCountAll({
        where: {
          [Op.or]: [
            { title: { [Op.like]: `%${search}%` } },
            { author: { [Op.like]: `%${search}%` } },
            
          ]
        },
        attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
        order: [['title', 'ASC']],
        offset: page * limit,
        limit: limit
      });

      const response = {
        success: true,
        total: count,
        page: page + 1,
        limit: limit,
        bookDetails: bookByISBN,
        books: booklist
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
        const { title, author, ISBN, clubId, categoryId, languageId, userId  } = req.body;

        if (!title || !author || !ISBN || !clubId || !categoryId || !languageId || !userId) {
          return res.status(400).json({
            success: false,
            message: "All fields are required"
          });
        }

        const findClubUser = await clubuser.findByPk(clubId);
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
          clubId: clubId,
          userId: userId,
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