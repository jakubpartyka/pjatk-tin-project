exports.showEncounterList = (req, res, next) => {
    res.render('pages/encounter/encounter-list', {navLocation: 'encounter' });
}

exports.showAddEncounterForm = (req, res, next) => {
    res.render('pages/encounter/encounter-form', {navLocation: 'encounter' });
}

exports.showEncounterDetails = (req, res, next) => {
    res.render('pages/encounter/encounter-info', {navLocation: 'encounter' });
}
