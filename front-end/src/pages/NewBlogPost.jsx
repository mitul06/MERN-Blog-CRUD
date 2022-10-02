import { Button, Card, Container, Grid, TextField } from '@mui/material'
import { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { useNavigate } from 'react-router'
import { useSnackbar } from 'notistack'

import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs'
import coverDefaultImg from '../assets/coverDefault.jpg'
import { Controller, useForm } from 'react-hook-form'
import { useCreateBlogMutation } from '../redux/apis/Blog'

const NewBlogPost = () => {
  const [desc, setDesc] = useState(null)
  const [coverImg, setCoverImg] = useState(null)
  const [authorImage, setAuthorImage] = useState(null)

  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const { control, handleSubmit } = useForm()

  const [createBlog, { isLoading, isError, error }] = useCreateBlogMutation()

  const handleChangeDec = val => {
    // console.log('val', val)
    setDesc(val)
  }

  const convertToBase64 = file => {
    return new Promise((resolve, reject) => {
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        resolve(reader.result)
      }
      reader.onerror = error => {
        reject(error)
      }
    })
  }

  const handleUploadCover = async img => {
    let file = img.target.files[0]
    const base64Img = await convertToBase64(file)
    if (base64Img) setCoverImg(base64Img)
  }

  const handleUploadAuthorImage = async img => {
    let file = img.target.files[0]
    const base64Img = await convertToBase64(file)
    if (base64Img) setAuthorImage(base64Img)
  }

  const onSubmit = async data => {
    if (coverImg) {
      if (authorImage) {
        if (desc) {
          if (desc !== '<p><br></p>') {
            const submtiData = {
              title: data?.title,
              description: desc,
              coverImage: coverImg,
              author: {
                name: data?.authorName,
                image: authorImage
              },
              tags: data?.tags?.split(',')
            }

            if (submtiData) {
              const res = await createBlog(submtiData)

              if (res.data.success) {
                enqueueSnackbar(res.data.message, { variant: 'success' })
                setTimeout(() => {
                  navigate('/blogs')
                }, 2000)
              } else {
                enqueueSnackbar(res.data.message, { variant: 'error' })
              }
              if (isError) {
                enqueueSnackbar(error, { variant: 'error' })
              }
            }
          } else {
            enqueueSnackbar('Please Enter Description', { variant: 'error' })
          }
        } else {
          enqueueSnackbar('Please Enter Description', { variant: 'error' })
        }
      } else {
        enqueueSnackbar('Please Enter Author Image', { variant: 'error' })
      }
    } else {
      enqueueSnackbar('Please Enter Cover Image', { variant: 'error' })
    }
  }

  return (
    <Container maxWidth='lg' sx={{ mt: 3 }}>
      <HeaderBreadcrumbs
        heading='Create New Blog'
        links={[{ name: 'Blogs', href: '/blogs' }, { name: 'New Post' }]}
      />

      <Card
        sx={{
          boxShadow: '0px 12px 30px 0px rgba(0, 0, 0, 0.2)',
          borderRadius: '15px'
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container>
            <Grid item xs={12}>
              <Controller
                name='title'
                control={control}
                defaultValue=''
                render={({
                  field: { onChange, value },
                  fieldState: { error }
                }) => (
                  <TextField
                    sx={{ margin: '30px', width: '95%' }}
                    id='outlined-basic'
                    label='Title'
                    variant='outlined'
                    name='title'
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
                rules={{ required: 'Please Enter Title' }}
              />
            </Grid>
            <Grid item xs={12}>
              <div style={{ margin: '30px', width: '95%' }}>
                <span style={{ fontSize: '14px', marginBottom: '10px' }}>
                  Description
                </span>
                <ReactQuill
                  theme='snow'
                  value={desc}
                  onChange={handleChangeDec}
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              <div
                style={{
                  margin: '30px',
                  width: '95%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <span style={{ fontSize: '14px', marginBottom: '10px' }}>
                  Cover Image
                </span>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'start',
                    alignItems: 'center'
                  }}
                >
                  <img
                    src={coverImg ?? coverDefaultImg}
                    alt='cover'
                    style={{
                      height: '200px',
                      width: '200px',
                      borderRadius: '15px'
                    }}
                  />
                  <Button
                    sx={{
                      marginLeft: '50px',
                      height: '50px',
                      color: '#1976d2'
                    }}
                    variant='outlined'
                    component='label'
                  >
                    <FileUploadOutlinedIcon />
                    <input
                      onChange={handleUploadCover}
                      hidden
                      accept='image/*'
                      type='file'
                    />
                  </Button>
                  <Button
                    sx={{ marginLeft: '50px', height: '50px' }}
                    variant='outlined'
                    color='error'
                    onClick={() => {
                      setCoverImg(null)
                    }}
                  >
                    <DeleteOutlinedIcon />
                  </Button>
                </div>
              </div>
            </Grid>
            <Grid item xs={6}>
              <Controller
                name='authorName'
                control={control}
                defaultValue=''
                render={({
                  field: { onChange, value },
                  fieldState: { error }
                }) => (
                  <TextField
                    sx={{ margin: '30px', width: '95%' }}
                    id='outlined-basic'
                    label='Author Name'
                    variant='outlined'
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
                rules={{ required: 'Please Enter Author Name' }}
              />
            </Grid>
            <Grid item xs={6}>
              <div
                style={{
                  margin: '30px',
                  width: '95%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <span style={{ fontSize: '14px', marginBottom: '10px' }}>
                  Author Image
                </span>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'start',
                    alignItems: 'center'
                  }}
                >
                  <img
                    src={authorImage ?? coverDefaultImg}
                    alt='authorImage'
                    style={{
                      height: '100px',
                      width: '100px',
                      borderRadius: '50%'
                    }}
                  />
                  <Button
                    sx={{
                      marginLeft: '50px',
                      height: '40px',
                      color: '#1976d2'
                    }}
                    variant='outlined'
                    component='label'
                  >
                    <FileUploadOutlinedIcon />
                    <input
                      onChange={handleUploadAuthorImage}
                      hidden
                      accept='image/*'
                      type='file'
                    />
                  </Button>
                  <Button
                    sx={{ marginLeft: '50px', height: '40px' }}
                    variant='outlined'
                    color='error'
                    onClick={() => {
                      setAuthorImage(null)
                    }}
                  >
                    <DeleteOutlinedIcon />
                  </Button>
                </div>
              </div>
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='tags'
                control={control}
                defaultValue=''
                render={({
                  field: { onChange, value },
                  fieldState: { error }
                }) => (
                  <TextField
                    sx={{ margin: '30px', width: '95%' }}
                    id='outlined-basic'
                    label='Tags'
                    variant='outlined'
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
                rules={{ required: 'Please Add Tags' }}
              />
              <span style={{ marginLeft: '30px', fontSize: '12px' }}>
                Add Multiple tags with coma (,) Separated
              </span>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <div
              style={{ display: 'flex', justifyContent: 'end', margin: '30px' }}
            >
              <Button
                variant='contained'
                color='error'
                sx={{ marginRight: '20px' }}
                onClick={() => navigate('/blogs')}
              >
                Cancel
              </Button>
              <Button
                disabled={isLoading}
                variant='contained'
                color='success'
                type='submit'
              >
                {isLoading ? 'Submiting...' : 'Submit'}
              </Button>
            </div>
          </Grid>
        </form>
      </Card>
      <br />
      <br />
      <br />
      <br />
      <br />
    </Container>
  )
}

export default NewBlogPost
