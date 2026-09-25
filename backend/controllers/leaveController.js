const {
    getLeaveTypes,
    createLeave,
    getLeavesByUserId,
    getLeaveById,
    getAllLeaves,
    updateLeaveStatus
} = require("../models/leaveModel");


// Get leave types
const leaveTypes = async (req, res) => {

    try {

        const types = await getLeaveTypes();

        res.json(types);

    } catch (error) {

        console.error("Leave types error:", error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};


// Apply leave
const applyLeave = async (req, res) => {

    try {

        const {
            leave_type_id,
            start_date,
            end_date,
            reason
        } = req.body;


        if (
            !leave_type_id ||
            !start_date ||
            !end_date ||
            !reason
        ) {

            return res.status(400).json({
                message: "All leave fields are required"
            });
        }


        if (new Date(start_date) > new Date(end_date)) {

            return res.status(400).json({
                message: "End date cannot be before start date"
            });
        }


        const result = await createLeave(

            req.user.id,

            leave_type_id,

            start_date,

            end_date,

            reason
        );


        res.status(201).json({

            message: "Leave applied successfully",

            leaveId: result.insertId
        });

    } catch (error) {

        console.error("Apply leave error:", error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};


// Employee leave history
const leaveHistory = async (req, res) => {

    try {

        const leaves =
            await getLeavesByUserId(req.user.id);

        res.json(leaves);

    } catch (error) {

        console.error("Leave history error:", error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};


// Get one leave
const getLeave = async (req, res) => {

    try {

        const leave =
            await getLeaveById(
                req.params.id,
                req.user.id
            );


        if (!leave) {

            return res.status(404).json({
                message: "Leave request not found"
            });
        }


        res.json(leave);

    } catch (error) {

        console.error("Get leave error:", error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};


// Admin: get all leaves
const adminLeaves = async (req, res) => {

    try {

        const leaves = await getAllLeaves();

        res.json(leaves);

    } catch (error) {

        console.error("Admin leaves error:", error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};


// Admin: approve leave
const approveLeave = async (req, res) => {

    try {

        const result =
            await updateLeaveStatus(
                req.params.id,
                "Approved"
            );


        if (result.affectedRows === 0) {

            return res.status(404).json({
                message: "Leave request not found"
            });
        }


        res.json({
            message: "Leave approved successfully"
        });

    } catch (error) {

        console.error("Approve leave error:", error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};


// Admin: reject leave
const rejectLeave = async (req, res) => {

    try {

        const result =
            await updateLeaveStatus(
                req.params.id,
                "Rejected"
            );


        if (result.affectedRows === 0) {

            return res.status(404).json({
                message: "Leave request not found"
            });
        }


        res.json({
            message: "Leave rejected successfully"
        });

    } catch (error) {

        console.error("Reject leave error:", error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};


module.exports = {
    leaveTypes,
    applyLeave,
    leaveHistory,
    getLeave,
    adminLeaves,
    approveLeave,
    rejectLeave
};