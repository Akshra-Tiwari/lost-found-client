import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FcAbout, FcOvertime } from "react-icons/fc";
import { Link } from "react-router-dom";
import { setConstraint } from "../constraints";
import {
  Button,
  Typography,
  Card,
  CardContent,
  Avatar,
  Stack,
  Pagination,
} from "@mui/material";
import Axios from "axios";

// Pagination Component
const Paginationn = ({ page, setPage, max }) => {
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Pagination
      sx={{ pt: "40px", pb: "40px" }}
      count={Math.ceil(max)}
      page={page}
      onChange={handleChange}
      showLastButton
      showFirstButton
      color="primary"
    />
  );
};

// ReadMore Component for long descriptions
const ReadMore = ({ children, maxLength = 30 }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => setIsReadMore(!isReadMore);

  if (!text) return null;

  return (
    <Typography fontSize="16px" color="black">
      {isReadMore && text.length > maxLength ? `${text.slice(0, maxLength)}...` : text}
      {text.length > maxLength && (
        <span
          onClick={toggleReadMore}
          style={{ color: "blue", cursor: "pointer", marginLeft: "5px" }}
        >
          {isReadMore ? "Read More" : "Show Less"}
        </span>
      )}
    </Typography>
  );
};

export default function LostItems() {
  setConstraint(true);

  const user_info = JSON.parse(localStorage.getItem("user"));

  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);

  useEffect(() => {
    Axios.get("http://localhost:4000/items")
      .then((response) => {
        const allItems = response.data.items.reverse();
        const itemsPerPage = 9;
        setMaxPages(Math.ceil(allItems.length / itemsPerPage));

        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setItems(allItems.slice(startIndex, endIndex));
      })
      .catch((err) => console.log("Error fetching items:", err));
  }, [page]);

  return (
    <>
      {/* Header */}
      <Stack
        direction="row"
        width="100%"
        sx={{ backgroundColor: "primary.main" }}
        height="125px"
        alignItems="center"
        justifyContent="center"
      >
        <Stack
          spacing={0}
          width="100%"
          maxWidth="1440px"
          height="125px"
          justifyContent="center"
          ml={{ xs: 3, sm: 5, md: 10 }}
        >
          <Typography fontSize={{ xs: 18, sm: 22, md: 25 }} color="white">
            Welcome {user_info.nickname} 👋!
          </Typography>
          <Typography fontSize={{ xs: 17, sm: 21, md: 23 }} color="white" fontWeight="bold">
            Here you can find the Lost Items
          </Typography>
        </Stack>
      </Stack>

      {/* Items Grid */}
      <Stack
        pt="20px"
        direction="row"
        justifyContent="center"
        flexWrap="wrap"
        gap="24px"
        maxWidth="1440px"
        margin="0 auto"
      >
        {items.map((item) => {
          const createdDate = new Date(item.createdAt);
          const formattedDate = `${createdDate.getDate()}/${createdDate.getMonth() + 1}/${createdDate.getFullYear()} ${createdDate.getHours()}:${createdDate.getMinutes()}`;

          const isOwner = item.userId === user_info._id;

          // Handle multiple images
          const imgUrl = Array.isArray(item.img) ? item.img[0] : item.img;

          return (
            item.type === "Lost" && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
                key={item._id}
              >
                <Card sx={{ width: 270, height: 400, boxShadow: "0px 4px 4px rgba(0,0,0,0.25)" }}>
                  <CardContent sx={{ padding: 1 }}>
                    {/* Image */}
                    <Stack
                      alignItems="center"
                      justifyContent="center"
                      sx={{ backgroundColor: "#9CC0DF", height: 200, borderRadius: 2 }}
                    >
                      <Avatar src={imgUrl} sx={{ width: 190, height: 190 }} />
                    </Stack>

                    {/* Name */}
                    <Stack mt={1} mb={1}>
                      <Typography fontSize={20} fontWeight="bold" noWrap>
                        {item.name}
                      </Typography>
                    </Stack>

                    {/* Description */}
                    <Stack direction="row" alignItems="center" gap="8px" mb={1}>
                      <FcAbout fontSize={20} />
                      <ReadMore>{item.description}</ReadMore>
                    </Stack>

                    {/* Created At */}
                    <Stack direction="row" alignItems="center" gap="8px" mb={2}>
                      <FcOvertime fontSize={20} />
                      <Typography fontSize={16}>{formattedDate}</Typography>
                    </Stack>

                    {/* More Details Button */}
                    <motion.div whileTap={{ scale: 0.98 }}>
                      <Button
                        component={Link}
                        to={`/${item.name}?cid=${item._id}&type=${item.type}&owner=${isOwner}`}
                        variant="contained"
                        sx={{ textTransform: "none", width: 140, borderRadius: 2 }}
                      >
                        More Details
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          );
        })}
      </Stack>

      {/* Pagination */}
      <Paginationn page={page} setPage={setPage} max={maxPages} />
    </>
  );
}
