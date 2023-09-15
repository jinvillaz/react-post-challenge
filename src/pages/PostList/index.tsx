import { useEffect, useState } from 'react'
import { CircularProgress, Container, Grid, List, Typography } from '@mui/material'

import { Post } from '../../model/post'
import { PostItem } from '../../components/PostItem'
import { postService } from '../../services/post.service'

export const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const getData = async () => {
    setLoading(true)
    const data = await postService.getPosts()
    setPosts(data)
    setLoading(false)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Container maxWidth="md">
      <Grid container justifyContent="center" alignItems="center" spacing={2} sx={{ padding: '20px 0px' }}>
        <Grid item xs={12} textAlign="center">
          <Typography variant="h2">Posts</Typography>
        </Grid>
      </Grid>
      {loading && (
        <Grid container justifyContent="center" alignItems="center" sx={{ height: 400 }}>
          <CircularProgress disableShrink />
        </Grid>
      )}
      <Grid container justifyContent="center" alignItems="center">
        {posts.length > 0 && (
          <List>
            {posts.map(post => (
              <PostItem post={post} key={post.id} />
            ))}
          </List>
        )}
      </Grid>
    </Container>
  )
}
