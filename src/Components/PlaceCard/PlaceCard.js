import React from 'react';
import {
  Box,
  Button,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
} from '@material-ui/core';
import LocationOnOutlined from '@material-ui/icons/LocationOnOutlined';
import { Phone } from '@material-ui/icons';
import { Rating } from '@material-ui/lab';

import useStyles from './styles';

export default function PlaceCard({ place }) {
  console.log('place', place);
  const classes = useStyles();
  return (
    <Card elevation={6}>
      <CardMedia
        style={{ height: 350 }}
        image={
          place?.photo
            ? place?.photo?.images?.large?.url
            : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'
        }
        title={place?.name}
      />
      <CardContent>
        <Typography gutterBottom variant={'h5'}>
          {place?.name}
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Rating value={Number(place?.rating)} readOnly />
          <Typography gutterBottom variant="subtitle1">
            out of {place?.num_reviews} reviews
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Price</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place?.price_level}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Ranking</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place?.ranking}
          </Typography>
        </Box>
        {place?.awards?.map((award) => (
          <Box my={1} display="flex" justifyContent="space-between" alignItems="center">
            <img src={award?.images?.small} alt={award?.display?.name} />
            <Typography variant="subtitle2" color="textSecondary">
              {award?.display_name}
            </Typography>
          </Box>
        ))}
        {place?.cuisine?.map(({ name }) => (
          <Chip key={name} size="small" label={name} className={classes.chip} />
        ))}
        {place?.address && (
          <Typography
            gutterBottom
            variant="subtitle2"
            color="textSecondary"
            className={classes.subtitle}
          >
            <LocationOnOutlined /> {place?.address}
          </Typography>
        )}
        {place?.phone && (
          <Typography
            gutterBottom
            variant="subtitle2"
            color="textSecondary"
            className={classes.subtitle}
          >
            <Phone /> {place?.phone}
          </Typography>
        )}
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => window.open(place?.web_url, '_blank')}
          >
            Trip Advisor
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => window.open(place?.website, '_blank')}
          >
            Website
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}
