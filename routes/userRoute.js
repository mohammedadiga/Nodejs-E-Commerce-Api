const express = require('express');
const { getAllUser, getaUser, updatedUser, deleteUser, blockUser, unblockUser, getWashlist } = require("../controller/userController");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

exports.router = router;

router.get("/all-users", getAllUser);
router.get("/get-user", authMiddleware, isAdmin, getaUser);
router.get("/wishlist", authMiddleware, isAdmin, getWashlist);

router.put("/edit-user", authMiddleware, updatedUser);
router.delete("/:id", deleteUser);

router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);


module.exports = router;