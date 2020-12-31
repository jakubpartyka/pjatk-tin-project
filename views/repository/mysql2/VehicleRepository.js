const db = require('../../config/mysql2/db');

exports.getVehicles = () => {
    return db.promise().query('SELECT * FROM Vehicle')
        .then( (results, fields) => {
            console.log(results[0]);
            return results[0];
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.getVehicleById = (registration) => {
    console.log(registration);
    const query = `SELECT *
    FROM Vehicle  
    WHERE registration = ?`
    return db.promise().query(query, [registration])
        .then( (results, fields) => {
            const firstRow = results[0][0];
            if(!firstRow) {
                return {};
            }
            // noinspection UnnecessaryLocalVariableJS
            const veh = {
                registration: firstRow.registration,
                type: firstRow.type,
                color: firstRow.color
            }
            return veh;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.createVehicle = (newVehData) => {
    console.log('createVehicle');
    console.log(newVehData);
    const sql = 'INSERT into Vehicle (registration, type, color) VALUES (?, ?, ?)';
    return db.promise().execute(sql, [newVehData.registration, newVehData.type, newVehData.color]);
};

exports.updateVehicle = (registration, vehData) => {
    const sql = `UPDATE Vehicle set registration = ?, type = ?, color = ? where registration = ?`;
    return db.promise().execute(sql, [vehData.registration, vehData.type, vehData.color,vehData.registration]);
};

exports.deleteVehicle = (registration) => {
    const sql = 'DELETE FROM Vehicle WHERE registration = ?'
    return db.promise().execute(sql, [registration]);
};

