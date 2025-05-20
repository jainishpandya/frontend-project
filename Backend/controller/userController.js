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

// For fetching user details and store it to Redux store
const userDetail = async (req, res) => {
    try {
        const token = req.body.token;

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Token is required"
            });
        }

        const userId = jwt.getUserIdFromToken(token)
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
            where: { id: parseInt(userId) }
        });

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


const clubList = async (req, res) => {
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
                    attributes: ['club_name'],
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

const memberDetails = async (req, res) => {
    try {
        const { userId, role } = req.body;

        if (role === undefined || role === null) {
            return res.status(400).json({
                success: false,
                message: "Role is required"
            });
        }

        if (role != 0) {
            return res.status(400).json({
                success: false,
                message: "This role is not authorized for this action"
            });
        }

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required"
            });
        }

        const userData = await user.findOne({
            where: { id: userId },
            attributes: ['id', 'name', 'email', 'phone_no'],
            include: [
                {
                    model: clubuser,
                    include: [{ model: club, attributes: ['club_name', 'id'] }],
                    attributes: ['role', 'clubId']
                }
            ]
        });

        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, user: userData });
    } catch (err) {
        console.error("Error fetching member details:", err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

 const editMemberDetails = async (req, res) => {
    try {
      const { role, userId, name, phone_no, updates } = req.body;
  
      if (role != 0) {
        return res.status(403).json({ success: false, message: "Unauthorized access" });
      }
  
      if (!userId) {
        return res.status(400).json({ success: false, message: "User ID is required" });
      }
  
      // ✅ Update user info
      await user.update(
        { name, phone_no },
        { where: { id: userId } }
      );
  
      // ✅ Update club roles or remove club membership
      if (Array.isArray(updates)) {
        for (const entry of updates) {
          const { clubId, newRole, remove } = entry;
  
          if (remove) {
            await clubuser.destroy({ where: { userId, clubId } });
          } else {
            await clubuser.update(
              { role: newRole },
              { where: { userId, clubId } }
            );
          }
        }
      }
  
      res.status(200).json({ success: true, message: "Member details updated successfully" });
    } catch (err) {
      console.error("Error updating member details:", err);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };  


export default { listusers, userDetail, clubList, setProfileImage, memberDetails , editMemberDetails};
