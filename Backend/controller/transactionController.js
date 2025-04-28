import book from "../db/models/book";

const TransactionController = {
    borrowRequest: async (req, res) => {
        try {
            
            const { bookId, userId } = req.body;

            if (!bookId || !userId) {
                return res.status(400).json({
                    success: false,
                    message: "Book ID and User ID are required"
                });
            }

            const checkbook = await book.findOne({
                where: {
                    id: bookId,
                    IsAvailable: true
                }
            });

            if (!checkbook) {
                return res.status(404).json({
                    success: false,
                    message: "Book not available"
                });
            }
            
        } catch (error) {
            
        }
    }
}