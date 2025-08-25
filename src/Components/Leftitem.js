import React, { useState } from "react";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import axios from "axios";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {
  Container,
  Paper,
  Grid,
  Button,
  Typography,
  Stack,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  FormHelperText,
} from '@mui/material';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../firebase.js';

const Leftitem = () => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);

  const userToken = localStorage.getItem("token");
  const config = { headers: { token: userToken } };

  const getUserId = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? user._id : null;
  };

  const schema = Yup.object().shape({
    name: Yup.string().required('Item name is required'),
    description: Yup.string().required('Description is required'),
    type: Yup.string().required('Item type is required'),
    location: Yup.string().required('Location is required'),
    date: Yup.string().required('Date is required'),
    number: Yup.string().required('Phone number is required'),
  });

  const handleImageUpload = (e) => {
    setImage(e.target.files);
  };

  const handleSubmit = async (values) => {
    try {
      await schema.validate(values, { abortEarly: false });
    } catch (error) {
      const errorMessages = error.inner.map(err => err.message);
      toast.error(errorMessages.join('\n'), { position: "bottom-right", autoClose: 1000, theme: "light" });
      return;
    }

    if (!image || image.length === 0) {
      toast.error('Please upload at least one image', { position: "bottom-right", autoClose: 1000, theme: "light" });
      return;
    }

    setLoading(true);

    const promises = Array.from(image).map((img) => {
      const storageRef = ref(storage, `/images/${img.name}`);
      const uploadTask = uploadBytesResumable(storageRef, img);
      return new Promise((resolve, reject) => {
        uploadTask.on('state_changed',
          (snapshot) => {
            const uploaded = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgress(uploaded);
          },
          reject,
          () => getDownloadURL(uploadTask.snapshot.ref).then(resolve).catch(reject)
        );
      });
    });

    Promise.all(promises)
      .then((urls) => {
        const newItem = { ...values, img: urls, userId: getUserId() };
        axios.post('http://localhost:4000/Items/newItem', newItem, config)
          .then(() => {
            toast.success('Wohoo 🤩! Item listed successfully.', { position: "bottom-right", autoClose: 1000, theme: "light" });
            setLoading(false);
            window.location.href = "/mylistings";
          })
          .catch((err) => {
            console.log(err);
            toast.error('Oops 🙁! Something went wrong.', { position: "bottom-right", autoClose: 1000, theme: "light" });
            setLoading(false);
          });
      })
      .catch((err) => {
        console.log(err);
        toast.error('Oops 🙁! Something went wrong.', { position: "bottom-right", autoClose: 1000, theme: "light" });
        setLoading(false);
      });
  };

  return (
    <Stack width="100%" pt={8} alignItems="center">
      <Typography fontSize={30} color="primary">
        If your item is lost or you found someone's item, post it here!
      </Typography>

      <Stack
        width="100%"
        maxWidth="1440px"
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-evenly"
        alignItems="center"
        mt={4}
        gap={5}
      >
        <Formik
          initialValues={{
            name: '',
            description: '',
            type: '',
            location: '',
            date: '',
            number: '',
          }}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange }) => (
            <Container maxWidth="sm">
              <Paper variant="outlined" sx={{ p: { xs: 4, md: 5 } }}>
                <Form>
                  <Stack spacing={3}>
                    {/* Image Upload */}
                    <Typography variant="h6">Picture</Typography>
                    <Button variant="contained" component="label" endIcon={<PhotoCamera />}>
                      Upload
                      <input hidden accept="image/*" multiple type="file" onChange={handleImageUpload} />
                    </Button>

                    {/* Item Details */}
                    <Typography variant="h6">Item Details</Typography>
                    <TextField
                      required
                      label="Item Name"
                      name="name"
                      variant="standard"
                      value={values.name}
                      onChange={handleChange}
                      fullWidth
                    />
                    <TextField
                      required
                      label="Description"
                      name="description"
                      variant="standard"
                      value={values.description}
                      onChange={handleChange}
                      multiline
                      fullWidth
                    />
                    <TextField
                      required
                      label="Location"
                      name="location"
                      variant="standard"
                      value={values.location}
                      onChange={handleChange}
                      fullWidth
                    />
                    <TextField
                      required
                      label="Date Found/Lost"
                      name="date"
                      variant="standard"
                      value={values.date}
                      onChange={handleChange}
                      fullWidth
                    />
                    <TextField
                      required
                      label="Contact Number"
                      name="number"
                      variant="standard"
                      value={values.number}
                      onChange={handleChange}
                      fullWidth
                    />

                    <FormControl variant="standard" fullWidth>
                      <InputLabel>Item Type</InputLabel>
                      <Select
                        name="type"
                        value={values.type}
                        onChange={handleChange}
                      >
                        <MenuItem value="Lost">Lost It</MenuItem>
                        <MenuItem value="Found">Found It</MenuItem>
                      </Select>
                      <FormHelperText>Select the type of item</FormHelperText>
                    </FormControl>

                    <motion.div whileTap={{ scale: 0.98 }}>
                      <Button type="submit" variant="contained" fullWidth disabled={loading}>
                        {loading ? `Posting... (${progress}%)` : 'Create Post'}
                      </Button>
                    </motion.div>
                  </Stack>
                </Form>
              </Paper>
            </Container>
          )}
        </Formik>

        {/* Right Illustration */}
        <motion.div whileHover={{ scale: 1.05 }}>
          <Stack width={{ xs: '100%', md: '450px' }} display={{ xs: 'none', md: 'flex' }}>
            <img src="https://i.ibb.co/Q65DB0d/list-item.png" alt="Post Illustration" width="100%" />
          </Stack>
        </motion.div>
      </Stack>
    </Stack>
  );
};

export default Leftitem;
