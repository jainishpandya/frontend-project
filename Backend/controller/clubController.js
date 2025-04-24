import { Op } from 'sequelize';
import club from '../db/models/club.js';
import user from '../db/models/user.js';
import cloudinary from "../utils/cloudinary.js";
import clubuser from '../db/models/clubuser.js';

const createClub = async (req, res) => {
    try {
        const { club_name, club_contact_email, club_location } = req.body;
        
        const findClub = await club.findOne({
            where: {
                club_name: club_name
            }
        });
        
        if (findClub) {
            return res.status(409).json({ message: "club with this name already exists", success: false })
        }
        
        const upload = await cloudinary.uploadFile(req.file.path, "bookcircle/club", club_name);
        const newClub = await club.create({
            club_name: club_name,
            club_contact_email: club_contact_email,
            club_thumbnail_url: upload.secure_url,
            club_status: true,
            club_location: club_location,
        });

        if (!newClub) {
            return res.status(400).json({
                success: true,
                message: "failed to create the club",
            })
        }

        res.status(201).json({
            success: true,
            message: "Club Creation Successful"
        })
    } catch (error) {
        console.error('Club Creation Error: ', error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const editClub = async (req, res) => {
    try {
        
        const club_id = req.body.club_id;

        const record = await club.findByPk(club_id);

        if(record){
            const updatedClub = await club.update(
                {
                    club_name: req.body.club_name || record.club_name,
                    club_contact_email: req.body.club_contact_email || record.club_contact_email,
                    club_location: req.body.club_location || record.club_location,
                    updatedAt: Date.now
                },{ where: { id: club_id }
            })

            if (updatedClub) {
                res.status(200).json({ success: true, message : "Club Updated Successfully"}) 
            } else {
                res.status(500).json({success: false, message: "internal serer error"});
            }
        } else {
            res.status(404).json({ success: false , messaeg: "Could not find the Club"})
        }
    } catch (error) {
        console.error('Club Updation Error: ', error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const deleteClub = async (req, res) => {
    try {
        const { Club_id } = req.body;

        const updatedClub = await club.update(
            {
                club_status: false
            },
            {
                where: {
                    id: Club_id
                }
            }
        )

        if(updatedClub){
            res.status(200).json({success: true, message: "club deleted successfully"});
        } else {
            res.status(404).json({success: false, message: 'Club Not Found'})
        }
    } catch (error) {
        console.error('Club deletetion Error: ', error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const reviveClub = async (req, res) => {
    try {
        const { Club_id } = req.body;

        const updatedClub = await club.update(
            {
                club_status: true
            },
            {
                where: {
                    id: Club_id
                }
            }
        )

        if(updatedClub){
            res.status(200).json({success: true, message: "Club Revived Successfully"});
        } else {
            res.status(404).json({success: false, message: 'Club Not Found'})
        }
    } catch (error) {
        console.error('Club deletetion Error: ', error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const listClub = async (req, res) => {
    try {
        const page = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 5;
        const search = req.query.search || "";

        const listclub = await club.findAndCountAll({
            where: {
                club_name: { [Op.iLike]: `%${search}%` }
            },
            order: [['club_name', 'ASC']],
            limit: limit,
            offset: page * limit
        })

        const response = {
            success: true,
            page: page + 1,
            limit,
            listclub
        }

        res.status(200).json(response);

    } catch (error) {
        console.log('Club Listing Error', error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const memberList = async(req, res) => {
    try {
        const page = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 5;
        const search = req.query.search || "";
        const { clubId } = req.body;

        

        const { count, rows: users } = await user.findAndCountAll({
            include: [
                {
                        model: clubuser,
                        where: { clubId: clubId },
                        attributes: ['clubId', 'role', 'createdAt', 'updatedAt'],
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
            listuser: users
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


const clubdetails = async (req, res) => {
    try {
        const clubId = req.body.clubId;

        if (!clubId) {
            return res.status(400).json({ success: false, message: "Club ID is required" });
        }

        const clubDetails = await club.findByPk(clubId)

        if(clubDetails){
            res.status(200).json({success: true, message: "Club Details Fetched Successfully", club: clubDetails})
        } else {
            res.status(404).json({success: false, message: "Club Not Found"})
        }
    } catch (error) {
        console.error('Club Details Fetching Error: ', error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


export default {createClub, editClub, listClub, deleteClub, reviveClub, memberList, clubdetails};
