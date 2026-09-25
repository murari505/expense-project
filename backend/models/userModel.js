const db = require("../config/db");


// Find user by email
const findUserByEmail = (email) => {

    return new Promise((resolve, reject) => {

        const sql = `
            SELECT
                id,
                name,
                email,
                password,
                role,
                department,
                created_at
            FROM users
            WHERE email = ?
        `;

        db.query(sql, [email], (err, results) => {

            if (err) {
                reject(err);
                return;
            }

            resolve(results[0]);
        });
    });
};


// Find user by ID
const findUserById = (id) => {

    return new Promise((resolve, reject) => {

        const sql = `
            SELECT
                id,
                name,
                email,
                role,
                department,
                created_at
            FROM users
            WHERE id = ?
        `;

        db.query(sql, [id], (err, results) => {

            if (err) {
                reject(err);
                return;
            }

            resolve(results[0]);
        });
    });
};


// Create user
const createUser = (name, email, password, department) => {

    return new Promise((resolve, reject) => {

        const sql = `
            INSERT INTO users
            (name, email, password, role, department)
            VALUES (?, ?, ?, 'employee', ?)
        `;

        db.query(
            sql,
            [name, email, password, department],
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
    findUserByEmail,
    findUserById,
    createUser
};