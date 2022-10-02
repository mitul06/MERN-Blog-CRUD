import { Avatar, Box, Card, Typography } from '@mui/material'
import React from 'react'
import moment from 'moment'

import Image from '../components/Image'
import { useNavigate } from 'react-router'

const BlogPostCard = ({ post, index }) => {
  const navigate = useNavigate()
  const handleClickSingleBlog = id => {
    navigate(`/view-blog/${id}`)
  }

  return (
    <Card
      sx={{
        width: '100%',
        height: '380px',
        borderRadius: '15px',
        transition: '400ms',
        '&:hover': {
          cursor: 'pointer',
          boxShadow: '0px 12px 30px 0px rgba(0, 0, 0, 0.2)',
          transform: 'scale3d(1.05, 1.05, 1) translate(0px, -15px)'
        }
      }}
      onClick={() => handleClickSingleBlog(post._id)}
    >
      <Image ratio={'4/3'} key={post._id} src={post?.coverImage} />
      <Box>
        <Typography
          sx={{
            fontSize: '16px',
            m: 2,
            fontFamily: 'Lora, serif',
            fontWeight: 600
          }}
        >
          {post?.title.slice(0, 50) + '...'}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'start',
          ml: 2
        }}
      >
        <Typography
          variant='caption'
          sx={{
            fontFamily: 'Lora, serif',
            fontWeight: 600,
            color: '#abb3ad'
          }}
        >
          {moment(post?.createdAt).format('ll')}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          m: 2,
          height: '40px',
          alignItems: 'center'
        }}
      >
        <Box>
          <Avatar
            src={post?.author?.image}
            sx={{ width: '40px', height: '40px' }}
          />
        </Box>
        <Typography
          variant='caption'
          sx={{
            fontFamily: 'Lora, serif',
            fontWeight: 600,
            color: '#abb3ad'
          }}
        >
          - {post?.author?.name}
        </Typography>
      </Box>
    </Card>
  )
}

export default BlogPostCard
