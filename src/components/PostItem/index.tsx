import { useNavigate } from 'react-router-dom'
import { Divider, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { Article } from '@mui/icons-material'

import { Post } from '../../model/post'

interface PostItemProps {
  post: Post
}

export const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const navigate = useNavigate()

  const goTo = () => {
    navigate(`/posts/${post.id}`)
  }

  return (
    <>
      <ListItem>
        <ListItemButton onClick={goTo}>
          <ListItemIcon>
            <Article />
          </ListItemIcon>
          <ListItemText primary={post.title} secondary={post.body} />
        </ListItemButton>
      </ListItem>
      <Divider />
    </>
  )
}
