const db = require('../../config/mysql2/db');

exports.getCameras = () => {
    return db.promise().query('SELECT * FROM Camera')
        .then( (results, fields) => {
            console.log(results[0]);
            return results[0];
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.getCameraById = (camId) => {
    const query = `SELECT c.id as id, c.alias, c.location, c.manufacturer, c.resolution
    FROM Camera c  
    where c.id = ?`
    return db.promise().query(query, [camId])
        .then( (results, fields) => {
            const firstRow = results[0][0];
            if(!firstRow) {
                return {};
            }
            // noinspection UnnecessaryLocalVariableJS
            const cam = {
                id: parseInt(camId),
                alias: firstRow.alias,
                location: firstRow.location,
                manufacturer: firstRow.manufacturer,
                resolution: firstRow.resolution
            }

            return cam;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.createCamera = (newCamData) => {
    console.log('createCamera');
    console.log(newCamData);
    const sql = 'INSERT into Camera (alias, location, manufacturer, resolution) VALUES (?, ?, ?, ?)';
    return db.promise().execute(sql, [newCamData.alias, newCamData.location, newCamData.manufacturer, newCamData.resolution]);
};

exports.updateCamera = (camId, camData) => {
    const sql = `UPDATE Camera set id = ?, location = ?, manufacturer = ?, resolution = ? where id = ?`;
    return db.promise().execute(sql, [camData.id, camData.location, camData.manufacturer, camData.resolution, camId]);
};

exports.deleteCamera = (camId) => {
    const sql = 'DELETE FROM Camera WHERE id = ?'
    return db.promise().execute(sql, [camId]);
};

