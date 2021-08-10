import React, { useEffect, useState } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import Header from './Components/Header/Header';
import List from './Components/List/List';
import Map from './Components/Map/Map';
import { getPlacesData } from './api';

export default function App() {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([])
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState(null);
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude });
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getPlacesData(type, bounds?.sw, bounds?.ne).then((data) => {
      setPlaces(data);
      setFilteredPlaces([]);
      setIsLoading(false);
    });
  }, [type, coordinates, bounds]);

  useEffect(() => {
    const fPlaces = places?.filter((place) => place?.rating > rating);
    setFilteredPlaces(fPlaces)
  }, [rating])
  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List places={filteredPlaces?.length ? filteredPlaces : places} childClicked={childClicked} isLoading={isLoading} type={type} setType={setType} rating={rating} setRating={setRating}/>
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces?.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </>
  );
}
