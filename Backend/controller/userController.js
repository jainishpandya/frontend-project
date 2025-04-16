/* eslint-disable no-unused-vars */
import { Op } from 'sequelize';
import user from '../db/models/user.js';
import cloudinary from '../utils/cloudinary.js';
import clubuser from '../db/models/clubuser.js';
import club from '../db/models/club.js';

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
        const userId = req.params.id;

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
        const { userId } = req.body;
        const { clubId } = req.body;

        

        const { count, rows: clubs } = await user.findAndCountAll({
            include: [
                {
                        model: clubuser,
                        where: { userId: userId },
                        attributes: ['clubId', 'role'],
                        include: [
                            {
                            model: club,
                            where:{ id: clubId},
                            attributes: ['id', 'club_name'],
                        }
                    ]
                },
            ],
            where: {
                name: { [Op.iLike]: `%${search}%` }
            },
            attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'setPasswordToken', 'setPasswordTokenExpiry','verificationToken', 'verificationTokenExpiry', 'deletedAt'] },
            order: [['name', 'ASC']],
            limit: limit,
            offset: page * limit,
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


export default { listusers, userDetail,clubList, setProfileImage };
