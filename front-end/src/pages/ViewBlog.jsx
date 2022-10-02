import {
  Button,
  Card,
  Chip,
  CircularProgress,
  Container,
  Typography
} from '@mui/material'
import React from 'react'
import { useNavigate, useParams } from 'react-router'
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs'
import { useGetBlogQuery } from '../redux/apis/Blog'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import { useEffect } from 'react'
import { useState } from 'react'

const ViewBlog = () => {
  const params = useParams()
  const navigate = useNavigate()
  const blogId = params?.id

  const [singlePost, setSinglePost] = useState(null)

  const { data, isLoading } = useGetBlogQuery(blogId)

  useEffect(() => {
    if(data?.success){
      setSinglePost(data?.data)
    }
  }, [data])

  return (
    <Container maxWidth='lg' sx={{ mt: 3 }}>
      <HeaderBreadcrumbs
        heading='View Blog'
        links={[
          {
            name: 'Blogs',
            href: '/blogs'
          },
          { name: 'View Blog' }
        ]}
      />
      <div style={{ textAlign: 'end', marginBottom: '10px' }}>
        <Button
          onClick={() => navigate(`/edit-blog/${blogId}`)}
          color='secondary'
          sx={{ borderRadius: '10px', textTransform: 'capitalize' }}
          variant='outlined'
          startIcon={<BorderColorIcon />}
        >
          Edit Blog
        </Button>
      </div>

      <Card
        sx={{
          boxShadow: '0px 12px 30px 0px rgba(0, 0, 0, 0.2)',
          borderRadius: '15px'
        }}
      >
        {isLoading ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '90vh'
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <>
            <div
              style={{
                background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${singlePost?.coverImage})`,
                height: '80vh',
                width: '100%',
                backgroundSize: 'cover'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: '#fff',
                  textAlign: 'center',
                  wordBreak: 'break-word'
                }}
              >
                <Typography variant='h4' gutterBottom>
                  {singlePost?.title}{' '}
                </Typography>{' '}
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'end',
                  alignItems: 'center'
                }}
              >
                <span>
                  <img
                    style={{
                      borderRadius: '50%',
                      width: '60px',
                      height: '60px',
                      marginTop: '20px',
                      marginRight: '20px'
                    }}
                    src={singlePost?.author?.image}
                    alt='author'
                  />
                </span>
                <span
                  style={{
                    fontSize: '20px',
                    fontWeight: 600,
                    color: '#fff',
                    marginRight: '20px',
                    marginTop: '20px'
                  }}
                >
                  - {singlePost?.author?.name}
                </span>
              </div>
              {/* <img
                src={singlePost?.coverImage}
                style={{ width: '100%', height: '80vh' }}
                alt='cover'
              /> */}
            </div>
            <div style={{ margin: '20px' }}>
              <div>
                <div
                  style={{ marginTop: '20px' }}
                  dangerouslySetInnerHTML={{ __html: singlePost?.description }}
                ></div>
              </div>
            </div>
            <div style={{ margin: '20px', fontWeight: 600 }}>
              Tags :{' '}
              {singlePost?.tags?.map((v, i) => (
                <>
                  <span style={{ marginRight: '10px' }}>
                    <Chip label={v} key={i} />
                  </span>
                </>
              ))}
            </div>
          </>
        )}
      </Card>
      <br />
      <br />
      <br />
      <br />
      <br />
    </Container>
  )
}

export default ViewBlog
