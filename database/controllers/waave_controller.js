const { pool } = require('../models/waave');


const addUser = (req, res) => {
  console.log('Adding user ', req.body);
  if (req.body.id === '') {
    const addUserQuery = `INSERT INTO
    users (first_name, last_name, email, region_name, region_id, address, max_wave_ht, min_wave_ht)
    VALUES
    ('${req.body.firstName}', '${req.body.lastName}', '${req.body.email}', '${req.body.regionName}', '${req.body.regionId}', '${req.body.address}', ${req.body.maxWaveHt}, ${req.body.minWaveHt});
    SELECT currval(pg_get_serial_sequence('users','id'));`;
    pool.query(addUserQuery)
    .then((result) => {
      const newUser = {...req.body, id: result[1].rows[0].currval};
      console.log('AddUser result', newUser);
      res.status(201);
      res.send(newUser);
    })
  } else {
    const addUserQuery = `INSERT INTO
    users (id, first_name, last_name, email, region_name, region_id, address, max_wave_ht, min_wave_ht)
    VALUES
    (${req.body.id}, '${req.body.firstName}', '${req.body.lastName}', '${req.body.email}', '${req.body.regionName}', '${req.body.regionId}', '${req.body.address}', ${req.body.maxWaveHt}, ${req.body.minWaveHt})
    ON CONFLICT (id) DO UPDATE SET first_name=EXCLUDED.first_name, last_name=EXCLUDED.last_name, email=EXCLUDED.email, region_name=EXCLUDED.region_name, region_id=EXCLUDED.region_id, address=EXCLUDED.address, max_wave_ht=EXCLUDED.max_wave_ht, min_wave_ht=EXCLUDED.min_wave_ht;`;
    pool.query(addUserQuery)
    .then((result) => {
      console.log('AddUser result', req.body);
      res.status(201);
      res.send(req.body);
    })
  }
};
const addSession = (req, res) => {
  console.log('Adding session ', req.body);
  res.status(201);
  res.send('Added session!');
};

module.exports = {
  addUser,
  addSession
};