import React, { useEffect, useState } from 'react';
import axios from 'axios';

const host = 'http://localhost:3000';

const App = () => {
  const [location, setLocation] = useState({
    continent: {
      name: 'North America',
      id: '58f7ed51dadb30820bb38791'
    },
    country: {
      name: 'United States',
      id: '58f7ed51dadb30820bb3879c'
    },
    state: {
      name: 'California',
      id: '58f7ed51dadb30820bb387a6'
    },
    region: {
      name: 'Los Angeles County',
      id: '58f7ed5bdadb30820bb393cd'
    }
  });
  const [subregions, setSubregions] = useState([]);

  const getSubregions = () => {
    const config = {
      params: {
        id: location.region.id
      }
    };
    axios.get(`${host}/subregions`, config)
    .then((res) => {
      console.log('Got the subregions', res.data);
      setSubregions(res.data);
    })
    .catch(e => console.error(e));
  }


  useEffect(() => {
    getSubregions();
  }, [location]);

  return (
    <>
      <h1>Waave</h1>
    </>
  )
};

export default App;