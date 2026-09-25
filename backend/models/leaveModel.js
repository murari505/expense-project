const db = require("../config/db");


// Get all leave types
const getLeaveTypes = () => {

    return new Promise((resolve, reject) => {

        const sql = `
            SELECT
                id,
                name,
                description
            FROM leave_types
            ORDER BY id
        `;

        db.query(sql, (err, results) => {

            if (err) {
                reject(err);
                return;
            }

            resolve(results);
        });
    });
};


// Apply for leave
const createLeave = (
    userId,
    leaveTypeId,
    startDate,
    endDate,
    reason
) => {

    return new Promise((resolve, reject) => {

        const sql = `
            INSERT INTO leaves
            (
                user_id,
                leave_type_id,
                start_date,
                end_date,
                reason
            )
            VALUES (?, ?, ?, ?, ?)
        `;

        db.query(
            sql,
            [
                userId,
                leaveTypeId,
                startDate,
                endDate,
                reason
            ],
            (err, result) => {

                if (err) {
                    reject(err);
                    return;
                }

                resolve(result);
            }
        );
    });
};


// Get employee leave history
const getLeavesByUserId = (userId) => {

    return new Promise((resolve, reject) => {

        const sql = `
            SELECT
                l.id,
                l.start_date,
                l.end_date,
                l.reason,
                l.status,
                l.created_at,
                lt.name AS leave_type
            FROM leaves l
            JOIN leave_types lt
                ON l.leave_type_id = lt.id
            WHERE l.user_id = ?
            ORDER BY l.created_at DESC
        `;

        db.query(sql, [userId], (err, results) => {

            if (err) {
                reject(err);
                return;
            }

            resolve(results);
        });
    });
};


// Get one leave by ID
const getLeaveById = (leaveId, userId) => {

    return new Promise((resolve, reject) => {

        const sql = `
            SELECT
                l.id,
                l.user_id,
                l.start_date,
                l.end_date,
                l.reason,
                l.status,
                l.created_at,
                lt.name AS leave_type
            FROM leaves l
            JOIN leave_types lt
                ON l.leave_type_id = lt.id
            WHERE l.id = ?
            AND l.user_id = ?
        `;

        db.query(
            sql,
            [leaveId, userId],
            (err, results) => {

                if (err) {
                    reject(err);
                    return;
                }

                resolve(results[0]);
            }
        );
    });
};


// Admin: get all leaves
const getAllLeaves = () => {

    return new Promise((resolve, reject) => {

        const sql = `
            SELECT
                l.id,
                u.name AS employee_name,
                u.email,
                u.department,
                lt.name AS leave_type,
                l.start_date,
                l.end_date,
                l.reason,
                l.status,
                l.created_at
            FROM leaves l
            JOIN users u
                ON l.user_id = u.id
            JOIN leave_types lt
                ON l.leave_type_id = lt.id
            ORDER BY l.created_at DESC
        `;

        db.query(sql, (err, results) => {

            if (err) {
                reject(err);
                return;
            }

            resolve(results);
        });
    });
};


// Admin: approve/reject leave
const updateLeaveStatus = (leaveId, status) => {

    return new Promise((resolve, reject) => {

        const sql = `
            UPDATE leaves
            SET status = ?
            WHERE id = ?
        `;

        db.query(
            sql,
            [status, leaveId],
            (err, result) => {

                if (err) {
                    reject(err);
                    return;
                }

                resolve(result);
            }
        );
    });
};


module.exports = {
    getLeaveTypes,
    createLeave,
    getLeavesByUserId,
    getLeaveById,
    getAllLeaves,
    updateLeaveStatus
};