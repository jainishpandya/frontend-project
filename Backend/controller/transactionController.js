import { Op } from "sequelize";
import book from "../db/models/book.js";
import transaction from "../db/models/transaction.js";
import jwt from "../jwt.js";

const TransactionController = {
    borrowRequest: async (req, res) => {
        try {
            
            const { bookId, clubId, token } = req.body;

            const BorrowerId = jwt.getUserIdFromToken(token);

            if (!BorrowerId) {
               console.log("Error in authenticating User");
               return res.status(403).json({
                    success: false,
                    message: "Access forbidden"
               })
            }


            if (!bookId || !BorrowerId) {
                return res.status(400).json({
                    success: false,
                    message: "Book ID and User ID are required"
                });
            }

            const checkbook = await book.findOne({
                where: {
                    id: bookId,
                }
            });
            console.log("Checkbook", checkbook);

            if (!checkbook) {
                return res.status(404).json({
                    success: false,
                    message: "Book not available"
                });
            }

            // Transaction when the book is at the owner.
            if (checkbook.IsAvailable === true && checkbook.locationId == null) {
                
                const NewTransaction = await transaction.create({
                    bookId: checkbook.id,
                    lenderId: checkbook.userId,
                    borrowerId: borrowerId,
                    clubId: clubId,
                    status: 1,
                     requestDate: new Date() 
                })

                if (!NewTransaction) {
                    console.error('Error creating transaction');
                    return res.status(500).json({
                        success: false,
                        message: "Internal Server Error"
                    });
                } else {
                    res.status(200).json({
                        success: true,
                        message: "Borrow request sent successfully",
                        transaction: NewTransaction
                    });
                }
            }
            // Transaction when the book is at the club.
             else if (checkbook.IsAvailable === true && checkbook.locationId != null) {
                // Transaction when the book is at the club.
                const NewTransaction = await transaction.create({
                    bookId: checkbook.id,
                    lenderId: checkbook.userId,
                    borrowerId: BorrowerId,
                    clubId: clubId,
                    status: 4,
                    RequestDate: new Date() 
                })

                if (!NewTransaction) {
                    console.error('Error creating transaction');
                    return res.status(500).json({
                        success: false,
                        message: "Internal Server Error"
                    });
                } else {
                    res.status(200).json({
                        success: true,
                        message: "Borrow request sent successfully",
                        transaction: NewTransaction
                    });
                }
                
            } else if (checkbook.IsAvailable === false && checkbook.locationId == null) {
                // Transaction when the book is borrowed by someone else.

                const lender = await transaction.findOne({
                    where: {
                        bookId: bookId,
                        status: 1
                    }
                })

                const NewTransaction = await transaction.create({
                    bookId: checkbook.id,
                    LenderId: checkbook.userId,
                    BorrowerId: BorrowerId,
                    clubId: clubId,
                    status: 1,
                     requestDate: new Date() 
                })

                if (!NewTransaction) {
                    console.error('Error creating transaction');
                    return res.status(500).json({
                        success: false,
                        message: "Internal Server Error"
                    });
                } else {
                    res.status(200).json({
                        success: true,
                        message: "Borrow request sent successfully",
                        transaction: NewTransaction
                    });
                }
                
            }

            
        } catch (error) {
            console.error('Error processing borrow request:', error);
            res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
    },
    RequestApproval: async (req, res) => {
        try {
            const { transactionId } = req.body;
            const token = req.header['authorization'];
            const userId = jwt.getUserIdFromToken(token);
            if (!userId) {
                console.log("Error in authenticating User");
                return res.status(403).json({
                    success: false,
                    message: "Access forbidden"
                })
            }


            if (!transactionId) {
                return res.status(400).json({
                    success: false,
                    message: "Transaction ID and status are required"
                });
            }

            const transactionToUpdate = await transaction.findOne({
                where: {
                    id: transactionId
                }
            });

            if (!transactionToUpdate) {
                return res.status(404).json({
                    success: false,
                    message: "Transaction not found"
                });
            }

            // Check if the user is the lender of the transaction
            if (transactionToUpdate.lenderId !== userId) {
                return res.status(403).json({
                    success: false,
                    message: "You are not authorized to approve this transaction"
                });
            }
            const fetchBook = await book.findOne({
                where: {
                    id: transactionToUpdate.bookId
                }
            })

            if (!fetchBook) {
                console.log("cannot fetch the book you want to approve");
                res.status(500).json({
                    success: false,
                    message: "Internal Server Error"
                })
            }

            fetchBook.IsAvailable = false;
            fetchBook.locationId = null;

            // Update the book's availability status

            transactionToUpdate.status = 2; // Assuming 2 is the status for approved

            const updatedTransaction = await transactionToUpdate.save();
            const updatedBook = await fetchBook.save();



            if (updatedTransaction && updatedBook) {
                res.status(200).json({
                    success: true,
                    message: "Transaction status updated successfully",
                    transaction: updatedTransaction
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: "Internal Server Error"
                });
            }
        } catch (error) {
            console.error('Error updating transaction status:', error);
            res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
    },
    BookDropped: async (req, res) => {
        try {
            const { transactionId, clubId } = req.body;
            const token = req.header['authorization'];
            const userId = jwt.getUserIdFromToken(token);
            if (!userId) {
                console.log("Error in authenticating User");
                return res.status(403).json({
                    success: false,
                    message: "Access forbidden"
                })
            }
            if (!transactionId) {
                return res.status(400).json({
                    success: false,
                    message: "Transaction ID and status are required"
                });
            }

            const transactionToUpdate = await transaction.findOne({
                where: {
                    id: transactionId
                }
            });

            // Check if the user is the lender of the transaction
            if (transactionToUpdate.lenderId !== userId) {
                return res.status(403).json({
                    success: false,
                    message: "You are not authorized to approve this transaction"
                });
            }



            transactionToUpdate.status = 4; // Assuming 4 is the status for Book Dropped

           
            const updatedTransaction = await transactionToUpdate.save();
    

            if (updatedTransaction && updatedBook) {
                res.status(200).json({
                    success: true,
                    message: "Transaction status updated successfully",
                    transaction: updatedTransaction
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: "Internal Server Error"
                });
            }

        } catch (error) {
            console.error('Error updating transaction status:', error);
            res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
    },

    BookPicked: async(req, res) => {
        try {
            const { transactionId, token } = req.body;

            const userId = jwt.getUserIdFromToken(token);
            if (!userId) {
                console.log("Error in authenticating User");
                return res.status(403).json({
                    success: false,
                    message: "Access forbidden"
                })
            }
            if (!transactionId) {
                return res.status(400).json({
                    success: false,
                    message: "Transaction ID and status are required"
                });
            }
            const transactionToUpdate = await transaction.findOne({
                where: {
                    id: transactionId
                }
            });
            // Check if the user is the lender of the transaction
            if (transactionToUpdate.borrowerId !== userId) {
                return res.status(403).json({
                    success: false,
                    message: "You are not authorized to approve this transaction"
                });
            }

            transactionToUpdate.status = 5; // Assuming 5 is the status for Book Picked

            const updatedTransaction = await transactionToUpdate.save();

            if (updatedTransaction) {
                res.status(200).json({
                    success: true,
                    message: "Transaction status updated successfully",
                    transaction: updatedTransaction
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: "Internal Server Error"
                });
            }

        } catch (error) {
            console.log("Error in updating transaction status", error);
            res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
    },

    getBorrowedBooks: async (req, res) => {
        try {
            const { token } = req.body;

            console.log(token)
            const userId = jwt.getUserIdFromToken(token);

            if (!userId) {
                console.log("Error in authenticating User");
                return res.status(403).json({
                    success: false,
                    message: "Access Forbidden"
                })
            }
            console.log("user Id ", userId);
            

            const BorrowedBookList = await transaction.findAll({
                where: {
                    borrowerId: userId,
                    status: {
                        [Op.in]: ['5','6']
                    }
                }, include: [
                    {
                        model: book,
                        as: 'book'
                    }
                ]
            });

            if (!BorrowedBookList) {
                console.log('cannot fetch the borrowed book list'); 
                return res.status(500).json({
                    success: false,
                    message: "Internal Server Error"
                });
            }

            return res.status(200).json({
                success: true,
                list: BorrowedBookList
            })
            
        } catch (error) {
            console.log("Errror in the borrowed book list section", error);
            res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
    },
    getBorrowingTransactionList: async (req, res) => {
        try {
            const { token } = req.body;

            console.log(token)
            const userId = jwt.getUserIdFromToken(token);

            if (!userId) {
                console.log("Error in authenticating User");
                return res.status(403).json({
                    success: false,
                    message: "Access Forbidden"
                })
            }
            console.log("user Id ", userId);
            

            const BorrowedBookList = await transaction.findAll({
                where: {
                    borrowerId: userId,
                    status: {
                        [Op.in]: ['1','2','4']
                    }
                }, include: [
                    {
                        model: book,
                        as: 'book'
                    }
                ]
            });

            if (!BorrowedBookList) {
                console.log('cannot fetch the borrowed book list'); 
                return res.status(500).json({
                    success: false,
                    message: "Internal Server Error"
                });
            }

            return res.status(200).json({
                success: true,
                list: BorrowedBookList
            })
            
        } catch (error) {
            console.log("Errror in the borrowed book list section", error);
            res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
    },

    getLendingTransactionList: async (req, res) => {
        try {
            const { token } = req.body;

            console.log(token)
            const userId = jwt.getUserIdFromToken(token);

            if (!userId) {
                console.log("Error in authenticating User");
                return res.status(403).json({
                    success: false,
                    message: "Access Forbidden"
                })
            }
            console.log("user Id ", userId);
            

            const LendedBookList = await transaction.findAll({
                where: {
                    lenderId: userId,
                    status: {
                        [Op.in]: ['1','2']
                    }
                }, include: [
                    {
                        model: book,
                        as: 'book'
                    }
                ]
            });

            if (!LendedBookList) {
                console.log('cannot fetch the lended book list'); 
                return res.status(500).json({
                    success: false,
                    message: "Internal Server Error"
                });
            }

            return res.status(200).json({
                success: true,
                list: LendedBookList
            })
            
        } catch (error) {
            console.log("Errror in the borrowed book list section", error);
            res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
    },
    

}




export default TransactionController;