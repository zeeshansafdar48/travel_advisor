import React from 'react'
import { CssBaseline, Grid } from '@material-ui/core'

import Header from './Components/Header/Header'
import List from './Components/List/List'
import Map from './Components/Map/Map'

export default function App() {
  return (
    <>
     <CssBaseline />
     <Header />
     <Grid container style={{ width: '100%' }}>
       <Grid item xs={12} md={4}>
         <List />
       </Grid>
       <Grid item xs={12} md={8}>
         <Map />
       </Grid>
     </Grid> 
    </>
  )
}
