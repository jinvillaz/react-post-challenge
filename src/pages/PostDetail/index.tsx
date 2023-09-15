import { useEffect, useState } from 'react'
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { KeyboardReturn } from '@mui/icons-material'

import { Post } from '../../model/post'
import { postService } from '../../services/post.service'

export const PostDetail = () => {
  const navigate = useNavigate()
  const { postId } = useParams()
  const [data, setData] = useState<Post | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const getData = async () => {
    setLoading(true)
    const data = await postService.getPost(postId as string)
    setData(data)
    setLoading(false)
  }

  const goBack = () => {
    navigate('/posts')
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Container maxWidth="md">
      <Grid container justifyContent="center" alignItems="center" spacing={2} sx={{ padding: '20px 0px' }}>
        <Grid item xs={12} textAlign="center">
          <Typography variant="h2">Post Detail</Typography>
        </Grid>
      </Grid>
      {loading && (
        <Grid container justifyContent="center" alignItems="center" sx={{ height: 400 }}>
          <CircularProgress disableShrink />
        </Grid>
      )}
      {!loading && data && (
        <Grid container justifyContent="center" alignItems="center">
          <Card sx={{ maxWidth: 600 }}>
            <CardMedia sx={{ height: 140 }} image="/article.jpg" title="default image" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {data.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {data.body}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <Typography variant="body2" color="text.secondary" sx={{ paddingLeft: 1 }}>
                Author {data.userId}
              </Typography>
              <Tooltip title="Return">
                <IconButton onClick={goBack} aria-label="return" sx={{ marginLeft: 'auto' }}>
                  <KeyboardReturn />
                </IconButton>
              </Tooltip>
            </CardActions>
          </Card>
        </Grid>
      )}
    </Container>
  )
}
