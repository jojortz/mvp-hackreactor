const axios = require('axios');

const surfline_taxonomy_url = 'http://services.surfline.com/taxonomy';

const getSubregionsAndSpots = (req, res) => {
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
            name: subregion.name,
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
            id: spot.spot
          })
        })
      });
      res.status(200);
      res.send(subregions);
    })
    .catch(e => console.error(e.stack));
};

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
            name: subregion.name,
            id: subregion._id
          })
        }
      });
      subregions = subregions.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      res.status(200);
      res.send(subregions)
    })
    .catch(e => console.error(e));
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
  getSubregions,
  getSubregionsAndSpots
};