const axios = require('axios');
const moment = require('moment');
const { formatDate } = require('../../helpers/helpers');

const surfline_taxonomy_url = 'http://services.surfline.com/taxonomy';
const surfline_conditions_url = 'https://services.surfline.com/kbyg/regions/forecasts/conditions';
const max_days = 17;

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

// const getSpotData = (req, res) => {
//   console.log('Getting spots', req.query.subregions);
//   let promises = [];
//   req.query.subregions.forEach((subregion) => {
//     const config = {
//       params: {
//         type: 'taxonomy',
//         id: subregion.id,
//         maxDepth: 0
//       }
//     };
//     promises.push(axios.get(surfline_taxonomy_url, config));
//   })
//   Promise.all(promises)
//     .then(result => {
//       console.log('got them spots', result);
//       res.status(200);
//       res.send('Got the spots');
//     })
//     .catch(e => console.error(e.stack));
// };

const getSpots = (req, res) => {
  var depDate = moment(req.query.date);
  var arrDate = moment(new Date());
  var nbDays = depDate.diff(arrDate, 'days') + 2;
  let days = Math.min(nbDays, max_days);
  console.log('Getting spots', req.query, 'days', days);

  const config = {
    params: {
      type: 'taxonomy',
      id: req.query.region_id,
      maxDepth: 0
    }
  };
  let subregions = [];
  let spots = [];
  axios.get(surfline_taxonomy_url, config)
    .then((result) => {
      result.data.contains.forEach((subregion) => {
        console.log(subregion);
          subregions.push({
            name: subregion.name,
            id: subregion._id
          })
      });
    // console.log('Getting spots, subregions', subregions);
      let promises = [];
      subregions.forEach((subregion) => {
        let config = {
          params: {
            type: 'taxonomy',
            id: subregion.id,
            maxDepth: 0
          }
        }
        promises.push(axios.get(surfline_taxonomy_url, config));
      });
      return Promise.all(promises);
    })
    .then((result) => {
      result.forEach((region, i) => {
        region.data.contains.forEach((thisSpot) => {
          if (thisSpot.spot) {
            let newSpot = {
              name: thisSpot.name,
              spotId: thisSpot.spot,
              inside: subregions[i].name,
              forecast: {}
            }
            spots.push(newSpot);
          }
        })
      })
     // console.log('SPOOOTTTSSS', spots);
      let promises = [];
      spots.forEach((thisSpot) => {
        const config = {
          params: {
            days,
            spotId: thisSpot.spotId
          }
        };
        promises.push(axios.get(surfline_conditions_url, config));
      })
      return Promise.all(promises);
    })
    .then((results) => {
   //  console.log('Spot conditions', results[0].data.data.conditions);
      results.forEach((result, i) => {
        spots[i].forecast = {
          observation: result.data.data.conditions[days - 1].observation,
          conditions: result.data.data.conditions[days - 1][req.query.time]
        };
      });
//console.log('final spots', spots);
      res.status(200);
      res.send(spots);
    })
    .catch(e => console.error(e.stack));
}

module.exports = {
  getSubregions,
  getSubregionsAndSpots,
  getSpots
};