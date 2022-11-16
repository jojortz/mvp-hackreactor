const { pool } = require('../models/waave');


const addUser = (req, res) => {
  console.log('Adding user ', req.body);
  if (req.body.id === '') {
    const addUserQuery = `INSERT INTO
    users (first_name, last_name, email, address, max_wave_ht, min_wave_ht)
    VALUES
    ('${req.body.firstName}', '${req.body.lastName}', '${req.body.email}', '${req.body.address}', ${req.body.maxWaveHt}, ${req.body.minWaveHt});
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
    users (id, first_name, last_name, email, address, max_wave_ht, min_wave_ht)
    VALUES
    (${req.body.id}, '${req.body.firstName}', '${req.body.lastName}', '${req.body.email}', '${req.body.address}', ${req.body.maxWaveHt}, ${req.body.minWaveHt})
    ON CONFLICT (id) DO UPDATE SET first_name=EXCLUDED.first_name, last_name=EXCLUDED.last_name, email=EXCLUDED.email, address=EXCLUDED.address, max_wave_ht=EXCLUDED.max_wave_ht, min_wave_ht=EXCLUDED.min_wave_ht;`;
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
  if (req.body.id === '') {
    console.log('new session');
    const addSessionQuery = `INSERT INTO
    sessions (name, time, date, region_name, region_id, user_id)
    VALUES
    ('${req.body.name}', '${req.body.time}', '${req.body.day}', '${req.body.regionName}', '${req.body.regionId}', ${req.body.user_id});
    SELECT currval(pg_get_serial_sequence('sessions','id'));`;
    pool.query(addSessionQuery)
    .then((result) => {
      const newUser = {...req.body, id: result[1].rows[0].currval};
      console.log('AddUser result', newUser);
      res.status(201);
      res.send(newUser);
    })
  } else {
    const addSessionQuery = `INSERT INTO
    sessions (id, name, time, date, region_name, region_id, user_id)
    VALUES
    (${req.body.id}, '${req.body.name}', '${req.body.time}', '${req.body.day}', '${req.body.regionName}', '${req.body.regionId}', ${req.body.user_id});
    ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, time=EXCLUDED.time, date=EXCLUDED.date, region_name=EXCLUDED.region_name, region_id=EXCLUDED.region_id;`;
    pool.query(addSessionQuery)
    .then((result) => {
      console.log('AddSession result', req.body);
      res.status(201);
      res.send(req.body);
    })
  }
};

const getSessions = (req, res) => {
  console.log('Getting sessions', req.query.user_id);
  const sessionsQuery = `SELECT * FROM sessions
  WHERE user_id=${req.query.user_id} ORDER BY date ASC, time ASC;`;
  pool.query(sessionsQuery)
  .then((result) => {
    res.status(200);
    res.send(result.rows);
  })
  .catch(e => console.error(e.stack));
};

module.exports = {
  addUser,
  addSession,
  getSessions
};