import React from "react";
import { Stack, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";

const Home = () => {
  const isLoggedIn = JSON.parse(window.localStorage.getItem("user"));

  const handleButtonClick = () => {
    window.location.href = isLoggedIn ? "/postitem" : "/log-in";
  };
  const handleButtonClickLost = () => {
    window.location.href = isLoggedIn ? "/lostItems" : "/log-in";
  };
  const handleButtonClickFound = () => {
    window.location.href = isLoggedIn ? "/founditems" : "/log-in";
  };

  return (
    <Stack
      width="100%"
      gap={{ xs: 12, md: 16 }}
      alignItems="center"
      pt={{ xs: 12, md: 20 }}
    >
      {/* Hero Section */}
      <Stack
        width="100%"
        alignItems="center"
        position="relative"
        justifyContent="center"
        sx={{
          background: "linear-gradient(135deg, #c3f0ff, #e6e6ff)",
          borderRadius: "0 0 60px 60px",
          py: { xs: 8, md: 12 },
          px: { xs: 3, md: 8 },
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems="center"
          justifyContent="space-between"
          gap={{ xs: 6, md: 12 }}
          maxWidth="1440px"
          width="100%"
        >
          <Stack gap={3} flex={1}>
            <Typography
              variant="h1"
              fontWeight="bold"
              fontSize={{ xs: "2.8rem", md: "4rem" }}
              color="#357ABD"
            >
              Find your Item!
            </Typography>
            <Typography variant="subtitle1" color="#194067">
              Losing something important? We help you find it quickly and
              reliably!
            </Typography>
            <motion.div whileTap={{ scale: 0.97 }}>
              <Button
                onClick={handleButtonClick}
                variant="contained"
                sx={{
                  borderRadius: 3,
                  textTransform: "none",
                  fontWeight: 500,
                  width: { xs: "180px", md: "220px" },
                  py: 1.5,
                  background:
                    "linear-gradient(to right, #6fc1ff, #c3b3ff)",
                  "&:hover": {
                    background:
                      "linear-gradient(to right, #5bb0e6, #b39ddb)",
                  },
                }}
              >
                Get Started
              </Button>
            </motion.div>
          </Stack>

          <Stack flex={1} display={{ xs: "none", md: "flex" }}>
            <motion.img
              src="https://i.ibb.co/9Z8qTQj/bg2.png"
              alt="Hero Illustration"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              style={{ width: "100%", borderRadius: "20px" }}
            />
          </Stack>
        </Stack>
      </Stack>

      {/* About Section */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        width="100%"
        maxWidth="1440px"
        justifyContent="space-between"
        alignItems="center"
        gap={{ xs: 6, md: 12 }}
        px={{ xs: 3, md: 8 }}
        py={{ xs: 6, md: 12 }}
        sx={{
          background: "linear-gradient(135deg, #e6e6ff, #f5f7ff)",
          borderRadius: "60px 60px 0 0",
        }}
      >
        <Stack flex={1} gap={4}>
          <Typography variant="h2" color="#357ABD">
            About Us
          </Typography>
          <Typography color="#3b3b3b">
            Our platform helps users find lost items or connect with those who
            found them. Publish your lost item or assist in returning found
            items to their owners reliably!
          </Typography>

          <Stack direction="row" gap={3} flexWrap="wrap">
            {[
              { text: "Lost Item", action: handleButtonClickLost },
              { text: "Found Item", action: handleButtonClickFound },
              { text: "Post Lost Item", action: handleButtonClick },
            ].map((btn, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Button
                  onClick={btn.action}
                  sx={{
                    flexDirection: "column",
                    alignItems: "center",
                    color: "#357ABD",
                    fontWeight: 700,
                    textTransform: "none",
                    borderRadius: 3,
                    px: 3,
                    py: 2,
                    background: "rgba(255,255,255,0.8)",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0px 6px 15px rgba(0,0,0,0.1)",
                    "&:hover": { background: "rgba(255,255,255,1)" },
                  }}
                >
                  <img
                    src="https://i.ibb.co/5rKZCdX/Main-Logo-2.png"
                    alt="Button Icon"
                    width="40px"
                  />
                  {btn.text}
                </Button>
              </motion.div>
            ))}
          </Stack>
        </Stack>

        <Stack
          flex={1}
          height={{ xs: "300px", md: "400px" }}
          sx={{
            clipPath: { xs: "none", md: "circle(62% at 60% 50%)" },
            backgroundImage:
              "url(https://www.yourzbs.com/wp-content/uploads/2019/06/The-Emotional-Side-Of-Returning-Lost-Objects.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            borderRadius: "20px",
          }}
        />
      </Stack>
    </Stack>
  );
};

export default Home;
