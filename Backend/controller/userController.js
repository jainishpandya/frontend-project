/* eslint-disable no-unused-vars */
import cloudinary from '../utils/cloudinary.js';
import { Op } from 'sequelize';
import user from '../db/models/user.js';
import clubuser from '../db/models/clubuser.js';
import club from '../db/models/club.js';
import jwt from '../jwt.js';

const listusers = async (req, res) => {
    try {
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

    } catch (error) {
        console.error('Error fetching users: ', error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const userDetail = async (req, res) => {
    try {
        const token = req.body.token;

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Token is required"
            });
        }
        // Verify the token
        
        const userId = jwt.getUserIdFromToken(token)
        console.log("User ID : ", userId);
        const userDetails = await user.findByPk(userId);

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

const setProfileImage = async (req, res) => {
    try {
        const { userId } = req.body;

        console.log("USER Id : ", userId);
        
        const findUser = await user.findOne({
    where:{id: parseInt(userId)}});

        if (!findUser) {
            console.log("User not found : ", findUser);
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const upload = await cloudinary.uploadFile(req.file.path, "bookcircle/profile", userId);
        console.log("Upload : ", upload);
        
        findUser.profile_image = upload.url;
        await findUser.save();
        res.status(200).json({
            success: true,
            message: "Profile picture updated successfully",
            profile_image: findUser.profile_image
        });
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}


const clubList = async(req, res) => {
    try {
        const page = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 5;
        const search = req.query.search || "";

        
        const { userId } = req.params;
        const { clubId } = req.body;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required"
            });
        }

        //Json Structure
        const { count, rows: clubs } = await clubuser.findAndCountAll({
            model: clubuser,
            where: { userId: userId },
            attributes: ['clubId', 'role'],
            include: [
                {
                    model: club,
                    attributes: [ 'club_name'],
                }
            ]
        })
        
        
        

        const response = {
            success: true,
            page: page + 1,
            limit,
            total: count,
            listclubs: clubs
        };

        res.status(200).json(response);

    } catch (error) {
        console.log('Club Member Listing Error', error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export default { listusers, userDetail, clubList, setProfileImage };
