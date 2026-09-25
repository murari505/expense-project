const express = require("express");

const {
    leaveTypes,
    applyLeave,
    leaveHistory,
    getLeave,
    adminLeaves,
    approveLeave,
    rejectLeave
} = require("../controllers/leaveController");

const {
    authenticateToken,
    requireAdmin
} = require("../middleware/authMiddleware");

const router = express.Router();


// Get leave types
// GET /api/leave-types
router.get(
    "/leave-types",
    leaveTypes
);


// Employee: apply leave
// POST /api/leaves
router.post(
    "/leaves",
    authenticateToken,
    applyLeave
);


// Employee: leave history
// GET /api/leaves
router.get(
    "/leaves",
    authenticateToken,
    leaveHistory
);


// Employee: get one leave
// GET /api/leaves/:id
router.get(
    "/leaves/:id",
    authenticateToken,
    getLeave
);


// Admin: all leaves
// GET /api/admin/leaves
router.get(
    "/admin/leaves",
    authenticateToken,
    requireAdmin,
    adminLeaves
);


// Admin: approve
// PUT /api/admin/leaves/:id/approve
router.put(
    "/admin/leaves/:id/approve",
    authenticateToken,
    requireAdmin,
    approveLeave
);


// Admin: reject
// PUT /api/admin/leaves/:id/reject
router.put(
    "/admin/leaves/:id/reject",
    authenticateToken,
    requireAdmin,
    rejectLeave
);


module.exports = router;