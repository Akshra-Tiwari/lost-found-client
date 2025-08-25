import React from "react";
import { Stack } from "@mui/material";
import Navbar from "./Components/Navbar.js";
import Footer from "./Components/footer.js";

function Layout(props) {
  return (
    <Stack
      spacing={0}
      width="100%"
      minHeight="100vh"
      justifyContent="space-between"
      sx={{
        background: "linear-gradient(135deg, #e6f0ff, #f3e8ff)",
        color: "#2c3e50",
        transition: "background 0.6s ease-in-out, color 0.4s ease-in-out",
      }}
    >
      <Navbar />
      <Stack
        flex={1}
        width="100%"
        alignItems="center"
        justifyContent="center"
        sx={{
          animation: "fadeIn 1.2s ease-in-out",
          "@keyframes fadeIn": {
            "0%": { opacity: 0, transform: "translateY(20px)" },
            "100%": { opacity: 1, transform: "translateY(0)" },
          },
        }}
      >
        {props.children}
      </Stack>
      <Footer />
    </Stack>
  );
}

export default Layout;
