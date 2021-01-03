const db = require('../../config/mysql2/db');

exports.getEncounters = () => {
    return db.promise().query('SELECT * FROM Encounter')
        .then( (results, fields) => {
            console.log(results[0]);
            return results[0];
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.getEncounterById = (encId) => {
    console.log("Encounter Repo. get by ID: " + encId);
    const query = `SELECT *
    FROM Encounter  
    where id = ?`
    return db.promise().query(query, [encId])
        .then( (results, fields) => {
            const firstRow = results[0][0];
            if(!firstRow) {
                console.log("not a first row");
                return {};
            }
            // noinspection UnnecessaryLocalVariableJS
            const enc = {
                id: parseInt(encId),
                Car_registration: firstRow.Car_registration,
                Camera_id: firstRow.Camera_id,
                time: firstRow.time,
                authorized: firstRow.authorized,
                direction: firstRow.direction
            }
            console.log("query OK");
            console.log(enc);

            return enc;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.createEncounter = (newEncData) => {
    console.log('createEncounter');
    console.log(newEncData);
    const sql = 'INSERT into Encounter (Car_registration,Camera_id,time,authorized,direction) VALUES (?,?,?,?,?)';
    return db.promise().execute(sql, [newEncData.Car_registration, newEncData.Camera_id, newEncData.time,newEncData.authorized,newEncData.direction]);
};

exports.updateEncounter = (encId, encData) => {
    const sql = `UPDATE Encounter set id = ?, Car_registration = ?, Camera_id = ?, time = ?, authorized = ?, direction = ? WHERE id = ?`;
    return db.promise().execute(sql, [encData.id, encData.Car_registration, encData.Camera_id, encData.time, encData.authorized, encData.direction, encId]);
};

exports.deleteEncounter = (encId) => {
    const sql = 'DELETE FROM Encounter WHERE id = ?'
    return db.promise().execute(sql, [encId]);
};
