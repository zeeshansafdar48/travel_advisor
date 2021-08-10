import axios from 'axios';

const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';

export const getPlacesData = async (sw, ne) => {
  try {
    const {
      data: { data },
    } = await axios.get(URL, {
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
      },
      headers: {
        'x-rapidapi-key': 'bf73f24b16msh64910d04b0b94c2p1bc414jsnfdbd4eb99dca',
        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
