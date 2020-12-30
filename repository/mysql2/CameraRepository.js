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

exports.createCamera = (newEmpData) => {
};

exports.updateCamera = (empId, empData) => {
};

exports.deleteCamera = (empId) => {
};

