import React, { useState } from "react";
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';
import {
  Typography,
  Button,
  Stack,
  Divider,
  TextField,
} from '@mui/material';

function Login() {
  const [loading, setLoading] = useState(false);

  const login = (values) => {
    setLoading(true);
    const payload = {
      email: values.email,
      password: values.password,
    };

    axios.post("http://localhost:4000/users/login", payload)
      .then((res) => {
        if (res.data.user) {
          toast.success('Logged In Successfully!', {
            position: "bottom-right",
            autoClose: 1000,
            theme: "light",
          });
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          window.location.href = "/";
        } else {
          toast.error('Oops 🙁! Email or Password is incorrect!', {
            position: "bottom-right",
            autoClose: 1000,
            theme: "light",
          });
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error('Oops 🙁! Error occurred.', {
          position: "bottom-right",
          autoClose: 1000,
          theme: "light",
        });
      });
  };

  return (
    <Stack width="100%" alignItems="center" pt={2}>
      {/* Header */}
      <Stack direction="row" width="100%" sx={{ backgroundColor: 'primary.main' }} height="125px" justifyContent="center" alignItems="center">
        <Stack maxWidth="1440px" width="100%" px={{ xs: 3, md: 10 }}>
          <Typography fontSize={{ xs: 20, md: 25 }} color="white">Log In</Typography>
          <Typography fontSize={{ xs: 18, md: 22 }} color="white" fontWeight="bold">Welcome Back!</Typography>
        </Stack>
      </Stack>

      {/* Main Content */}
      <Stack direction={{ xs: 'column', md: 'row' }} alignItems="center" justifyContent="center" mt={4} gap={5} px={{ xs: 2, md: 10 }}>
        {/* Left Image */}
        <Stack width={{ xs: '100%', md: '50%' }} display={{ xs: 'none', md: 'flex' }}>
          <img
            src="https://i.ibb.co/G2k63ys/login-1.png"
            alt="Login Illustration"
            width="100%"
          />
        </Stack>

        {/* Login Form */}
        <Stack width={{ xs: '100%', md: '400px' }} gap={3}>
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={(values) => login(values)}
          >
            {({ values, handleChange }) => (
              <Form>
                <Stack gap={2}>
                  <Typography fontSize="20px" fontWeight="bold">Log In</Typography>
                  <Typography fontSize="14px" color="primary.main">
                    Please fill in your information below
                  </Typography>

                  <TextField
                    fullWidth
                    required
                    id="email"
                    type="email"
                    name="email"
                    label="Email"
                    placeholder="email@example.com"
                    size="small"
                    value={values.email}
                    onChange={handleChange}
                  />

                  <TextField
                    fullWidth
                    required
                    id="password"
                    type="password"
                    name="password"
                    label="Password"
                    size="small"
                    value={values.password}
                    onChange={handleChange}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ textTransform: 'none', width: '100%', fontSize: 16 }}
                    disabled={loading}
                  >
                    {loading ? 'Logging in...' : 'Login'}
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>

          <Divider sx={{ width: '100%', my: 2 }} />

          <Stack direction="row" justifyContent="center" gap={1}>
            <Typography fontSize={16}>Don't have an account?</Typography>
            <Typography component={Link} to="/sign-up" fontSize={16} sx={{ textDecoration: 'underline', cursor: 'pointer' }}>
              Sign Up
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Login;
