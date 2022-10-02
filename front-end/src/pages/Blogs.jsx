import {
  Button,
  CircularProgress,
  Container,
  Grid,
  InputAdornment,
  Stack,
  TextField
} from '@mui/material'
import React, { useState, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
// import axios from 'axios'
import SearchIcon from '@mui/icons-material/Search'

import Iconify from '../components/Iconify'
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs'
import BlogPostsSort from '../sections/BlogPostsSort'
import BlogPostCard from '../sections/BlogPostCard'
import { useGetAllBlogsQuery } from '../redux/apis/Blog'
import { Box } from '@mui/system'

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' }
]

const Blogs = () => {
  const [filters, setFilters] = useState('latest')
  const [posts, setPosts] = useState([])

  const { data, isSuccess, isLoading } = useGetAllBlogsQuery()

  
  const handleChangeSort = value => {
    if (value) {
      setFilters(value)
    }
  }

  useEffect(() => {
    if (data && isSuccess) {
      setPosts(data.blogPosts)
    }
  }, [data, isSuccess])

  // const getAllPosts = useCallback(async () => {
  //   try {
  //     const response = await axios.get(
  //       'https://minimal-assets-api-dev.vercel.app/api/blog/posts/all'
  //     )

  //     setPosts(response.data.posts)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }, [])

  // useEffect(() => {
  //   getAllPosts()
  // }, [getAllPosts])

  return (
    <Container maxWidth='lg' sx={{ mt: 3 }}>
      <HeaderBreadcrumbs
        heading='Blogs'
        links={[{ name: 'Blogs', href: '/blogs' }, { name: 'Posts' }]}
        action={
          <Button
            variant='contained'
            component={RouterLink}
            to={'/new-blog'}
            startIcon={<Iconify icon={'eva:plus-fill'} />}
          >
            New Post
          </Button>
        }
      />

      <Stack
        mb={5}
        direction='row'
        alignContent='center'
        justifyContent='space-between'
      >
        <TextField
          id='outlined-basic'
          placeholder='Search Post...'
          size='small'
          variant='outlined'
          sx={{ width: '50%' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
        <BlogPostsSort
          query={filters}
          options={SORT_OPTIONS}
          onSort={handleChangeSort}
        />
      </Stack>

      <Grid container spacing={3}>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', width: '100%' }} >
            <CircularProgress />
          </Box>
        ) : (
          posts.map((post, index) =>
            post ? (
              <Grid key={post._id} item xs={12} sm={6} md={3}>
                <BlogPostCard post={post} index={index} />
              </Grid>
            ) : (
              <div>Skeleton</div>
            )
          )
        )}
      </Grid>
    </Container>
  )
}

export default Blogs
