const express = require('express');
const { creatCoupon, getAllCoupon, getaCoupon, updateCoupon, deleteCoupon } = require('../controller/couponController');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');


const router = express.Router();


router.post('/', authMiddleware, isAdmin, creatCoupon);

router.get('/', getAllCoupon);
router.get('/:id', getaCoupon);

router.put('/:id', authMiddleware, isAdmin, updateCoupon);

router.delete('/:id', authMiddleware, isAdmin, deleteCoupon);

module.exports = router;