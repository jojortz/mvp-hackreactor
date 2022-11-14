const axios = require('axios');

const surfline_taxonomy_url = 'http://services.surfline.com/taxonomy';

const getSubregions = (req, res) => {
  console.log('Getting subregions', req.query);
  const config = {
    params: {
      type: 'taxonomy',
      id: req.query.id,
      maxDepth: 0
    }
  };
  let subregions = [];
  axios.get(surfline_taxonomy_url, config)
    .then((result) => {
      result.data.contains.forEach((subregion) => {
        if (subregion.hasSpots) {
          subregions.push({
            name: subregion.geonames.name,
            id: subregion._id
          })
        }
      });
      let promises = [];
      subregions.forEach((subregion) => {
        const config = {
          params: {
            type: 'taxonomy',
            id: subregion.id,
            maxDepth: 0
          }
        };
        promises.push(axios.get(surfline_taxonomy_url, config));
      })
      return Promise.all(promises);
    })
    .then((results) => {
      results.forEach((subregion, i) => {
        subregions[i].spots = [];
        subregion.data.contains.forEach((spot) => {
          subregions[i].spots.push({
            name: spot.name,
            id: spot._id
          })
        })
      });
      res.status(200);
      res.send(subregions);
    })
    .catch(e => console.error(e.stack));
};
const getSpots = (req, res) => {
  console.log('Getting spots', req.query.subregions);
  let promises = [];
  req.query.subregions.forEach((subregion) => {
    const config = {
      params: {
        type: 'taxonomy',
        id: subregion.id,
        maxDepth: 0
      }
    };
    promises.push(axios.get(surfline_taxonomy_url, config));
  })
  Promise.all(promises)
    .then(result => {
      console.log('got them spots', result);
      res.status(200);
      res.send('Got the spots');
    })
    .catch(e => console.error(e.stack));
};

module.exports = {
  getSpots,
  getSubregions
};