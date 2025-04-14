import { Op } from 'sequelize';
import user from '../db/models/user.js';
import User from '../db/models/user.js';

const listusers = async (req, res) => {
    try{
        const page = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 5;
        const search = req.query.search || "";

        const userlist = await user.findAndCountAll({
            where: {
                name: { [Op.iLike]: `%${search}%` },
            },
            order: [['name', 'ASC']],
            limit: limit,
            offset: page * limit,
        });

        const response = {
            success: true,
            page: page + 1,
            limit,
            userlist
        };
        res.status(200).json(response);

    }catch(error){
        console.error('Error fetching users: ', error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const userDetail = async (req, res) => {
    try {
        const user_id = req.params.id;

        const userDetails = await user.findByPk(user_id);

        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            user: userDetails
        });

    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


export default { listusers, userDetail };