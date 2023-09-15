import { Container, Grid, Typography } from '@mui/material'

export const Home = () => {
  return (
    <Container maxWidth="md">
      <Grid container justifyContent="center" alignItems="center" sx={{ height: '400px' }}>
        <Typography variant="h2">Home</Typography>
      </Grid>
    </Container>
  )
}
