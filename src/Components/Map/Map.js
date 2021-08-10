import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlined from '@material-ui/icons/LocationOnOutlined';
import { Rating } from '@material-ui/lab';

import useStyles from './styles';

export default function Map({ setCoordinates, setBounds, coordinates, places, setChildClicked }) {
  const classes = useStyles();
  // isDesktop will be true if device is larger than or equal to 600px
  const isDesktop = useMediaQuery('(min-width: 600px)');
  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDu85ZYUVXdsIM8KvPvqGPgiLylsd0IEG8' }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={''}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places?.map((place, index) => (
          <div
            key={index}
            className={classes.markerContainer}
            lat={Number(place?.latitude)}
            lng={Number(place?.longitude)}
          >
            {!isDesktop ? (
              <LocationOnOutlined color="secondary" fontSize="large" />
            ) : (
              <Paper elevation={3} className={classes.paper}>
                <Typography className={classes.typography} gutterBottom variant="subtitle2">
                  {place?.name}
                </Typography>
                <img
                  className={classes?.pointer}
                  src={
                    place?.photo
                      ? place?.photo?.images?.large?.url
                      : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'
                  }
                  alt={place?.name}
                />
                <Rating size="small" value={Number(place?.rating)} readOnly />
              </Paper>
            )}
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
}
