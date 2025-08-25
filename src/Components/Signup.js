import React, { useState } from "react";
import { Field, Formik, Form } from 'formik'
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Link } from 'react-router-dom'
import axios from "axios";
import { toast } from 'react-toastify';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../firebase.js'
import {
  Typography,
  Button,
  Stack,
  Divider,
  TextField,
  Avatar,
  Paper,
} from '@mui/material'


function Signup() {
    const [info, setInfo] = useState("");
    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState(null);
    
    const handleImageUpload = (e) => {
        if (e.target.files[0]) {
          setImage(e.target.files[0]);
        }
    };
    
    function handleSubmit(values) {
      const { nickname, fullname, email, password } = values;
  
      const uploadImage = async () => {
        if (image) {
          const storageRef = ref(storage, `/images/${image.name}`);
          const fileRef = ref(storageRef, image.name);
          const uploadTask = uploadBytesResumable(fileRef, image);
          uploadTask.on('state_changed', 
            (snapshot) => {
              const uploaded = Math.floor(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
              setProgress(uploaded);
            },
            (error) => {
              console.log(error);
            }, 
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then(async (imgUrl) => {
                const payload = { nickname, fullname, email, password, img: imgUrl };
                await axios.post("http://localhost:4000/users/create", payload)
                  .then((response) => {
                    setInfo(response.data);
                    if (response.data === "Done") {
                      toast.success('You are now successfully Signed up!', {
                        position: "bottom-right",
                        autoClose: 800,
                        hideProgressBar: false,
                        closeOnClick: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                      });
                      window.location.href="/log-in";
                    } else {
                      toast.error('Something is missing!', {
                        position: "bottom-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                      });
                    }
                  })
                  .catch(() => {
                    console.log("Error occurred");
                  });
              });
            });
        } else {
          const payload = { nickname, fullname, email, password };
          await axios.post("http://localhost:4000/users/create", payload)
            .then((response) => {
              setInfo(response.data);
              if (response.data === "Done") {
                toast.success('You are now successfully Signed up!', {
                  position: "bottom-right",
                  autoClose: 800,
                  hideProgressBar: false,
                  closeOnClick: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
                window.location.href="/log-in";
              } else {
                toast.error('Something is missing!', {
                  position: "bottom-right",
                  autoClose: 1000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                  })
                }
            })
            .catch(() => {
              console.log("Error occured");
            });
        }};
        uploadImage();
    }

    return (
      <Stack
        justifyContent="center"
        alignItems="center"
        width="100%"
        gap="20px"
        pt="20px"
        sx={{
          background: "linear-gradient(to bottom right, #e3f2fd, #f3e5f5)", // sky blue + lavender gradient
          minHeight: "100vh",
          transition: "all 0.3s ease-in-out"
        }}
      >
        {/* Header */}
        <Stack
          direction="row"
          width="100%"
          sx={{
            background: "linear-gradient(to right, #64b5f6, #9575cd)", 
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
            transition: "0.4s ease",
          }}
          height="140px"
          gap="4px"
          alignItems="center"
          justifyContent="center"
        >
          <Stack
            spacing={0}
            justifyContent="center"
            alignItems="center"
          >
            <Typography fontSize="24px" color="white" fontWeight="500" sx={{letterSpacing: "1px"}}>
              Sign Up
            </Typography>
            <Typography variant="h5" color="white" fontWeight="bold">
              Welcome On Board!
            </Typography>
          </Stack>
        </Stack>

        {/* Form Card */}
        <Paper
          elevation={6}
          sx={{
            padding: "30px",
            borderRadius: "20px",
            background: "white",
            width: { xs: "90%", md: "450px" },
            transition: "all 0.4s ease",
            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow: "0px 10px 20px rgba(0,0,0,0.15)"
            }
          }}
        >
          <Formik
            initialValues={{
              nickname:'',
              fullname:'',
              email: '',
              password: '',
            }}
            onSubmit={(values) => {
              handleSubmit(values)
            }}
          >
            {({ values, handleChange }) => (
              <Form>
                <Stack alignItems="center" gap="15px">
                  
                  {/* Avatar */}
                  <Avatar
                    src={image && URL.createObjectURL(image)}
                    sx={{
                      width: '6rem',
                      height: '6rem',
                      boxShadow: "0px 4px 10px rgba(100,181,246,0.5)",
                      transition: "0.3s ease",
                      "&:hover": { transform: "scale(1.05)" }
                    }}
                  />

                  <Typography fontSize="13px" color="text.secondary">
                    Choose your profile picture
                  </Typography>

                  <Button 
                    variant="contained" 
                    component="label" 
                    endIcon={<PhotoCamera />} 
                    sx={{
                      background: "linear-gradient(45deg, #64b5f6, #9575cd)",
                      color: "white",
                      textTransform: "none",
                      borderRadius: "10px",
                      "&:hover": {
                        background: "linear-gradient(45deg, #42a5f5, #7e57c2)"
                      }
                    }}
                  >
                    Upload
                    <input 
                      hidden 
                      accept="image/*" 
                      multiple 
                      type="file" 
                      id="image"
                      label="Upload Image"
                      name="image" 
                      onChange={handleImageUpload} 
                    />
                  </Button>

                  {/* Form Fields */}
                  <TextField
                    fullWidth
                    type="text"
                    name="nickname"
                    margin="dense"
                    label="Nickname"
                    size="small"
                    required
                    onChange={handleChange}
                    value={values.nickname}
                  />

                  <TextField
                    fullWidth
                    type="text"
                    name="fullname"
                    margin="dense"
                    label="Full Name"
                    size="small"
                    required
                    onChange={handleChange}
                    value={values.fullname}
                  />

                  <TextField
                    fullWidth
                    required
                    type="email"
                    name="email"
                    margin="dense"
                    label="Email"
                    placeholder="email@example.com"
                    size="small"
                    onChange={handleChange}
                    value={values.email}
                  />

                  <TextField
                    fullWidth
                    required
                    type="password"
                    name="password"
                    margin="dense"
                    label="Password"
                    size="small"
                    onChange={handleChange}
                    value={values.password}
                  />

                  {/* Submit */}
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{
                      mt: 2,
                      background: "linear-gradient(45deg, #64b5f6, #9575cd)",
                      color: "white",
                      textTransform: "none",
                      borderRadius: "10px",
                      px: 3,
                      py: 1,
                      fontSize: "16px",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background: "linear-gradient(45deg, #42a5f5, #7e57c2)",
                        transform: "scale(1.05)"
                      }
                    }}
                  >
                    Sign Up
                  </Button>

                  <Divider sx={{ width: '100%', my: 2 }} />

                  <Stack direction="row" gap="10px">
                    <Typography fontSize="14px" color="text.secondary">
                      Already have an account?
                    </Typography>
                    <Typography
                      component={Link}
                      to="/log-in"
                      fontSize="14px"
                      sx={{
                        color: "#42a5f5",
                        fontWeight: "bold",
                        textDecoration: "none",
                        "&:hover": { textDecoration: "underline" }
                      }}
                    >
                      Login
                    </Typography>
                  </Stack>
                </Stack>
              </Form>
            )}
          </Formik>
        </Paper>
      </Stack>
    );
}

export default Signup;
