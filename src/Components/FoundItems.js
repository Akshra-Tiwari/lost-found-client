import React, { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { FcAbout, FcOvertime } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import { setConstraint } from "../constraints";
import {
  Button,
  Typography,
  Card,
  CardContent,
  Avatar,
  Stack,
  Pagination,
} from '@mui/material';
import Axios from "axios";

const Paginationn = ({ page, setPage, max }) => {
  const handleChange = (event, page) => {
    setPage(page);
  };

  return (
    <Pagination
      sx={{ pt: "50px", mb: "50px" }}
      count={Math.ceil(max)}
      page={page}
      onChange={handleChange}
      showLastButton
      showFirstButton
      color="primary"
    />
  );
};

export default function FoundItems() {

  const [user_info] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  setConstraint(true);

  const [item, setitem] = useState("");
  const [page, setPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);

  useEffect(() => {
    Axios({
      url: "http://localhost:4000/items",
      method: "GET",
    })
      .then((response) => {      
        const allitems = response.data.items.reverse();
        const itemsPerPage = 9;
        const numItems = allitems.length;
        setMaxPages(Math.ceil(numItems / itemsPerPage));
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const data = allitems.slice(startIndex, endIndex);

        let items = [];
        data.map((item) => {
          let created_date = new Date(item.createdAt);
          let createdAt =
            created_date.getDate() +
            "/" +
            (created_date.getMonth() + 1) +
            "/" +
            created_date.getFullYear() +
            " " +
            created_date.getHours() +
            ":" +
            created_date.getMinutes();

          if (item.type === "Found") {
            let user = false;
            if (item.userId === user_info._id) {
              user = true;
            }

            items.push(
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
                key={item._id}
              >
                <Card
                  sx={{
                    width: '270px',
                    height: '400px',
                    borderRadius: '16px',
                    background: 'linear-gradient(145deg, #e6f0ff, #f3e6ff)',
                    boxShadow: '0px 6px 15px rgba(0,0,0,0.1)',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                  }}
                >
                  <CardContent
                    sx={{
                      borderRadius: '16px',
                      padding: '12px',
                      gap: '12px',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Stack
                      alignItems="center"
                      justifyContent="center"
                      flexDirection="row"
                      sx={{
                        backgroundColor: '#c3e0ff',
                        height: '200px',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        mb: 2,
                      }}
                    >
                      <Avatar
                        src={item.img}
                        sx={{
                          width: '180px',
                          height: '180px',
                          borderRadius: '50%',
                          border: '3px solid #a0c4ff',
                        }}
                      />
                    </Stack>

                    <Typography
                      noWrap
                      gutterBottom
                      fontSize="22px"
                      fontWeight="bold"
                      sx={{ color: '#3b3b3b' }}
                    >
                      {item.name}
                    </Typography>

                    <Stack direction="row" width="100%" gap="10px" alignItems="center">
                      <FcAbout fontSize="22px" />
                      <Typography
                        fontSize="15px"
                        color="#3b3b3b"
                        noWrap
                        sx={{ flex: 1 }}
                      >
                        {item.description.toString().slice(0, 30)}...
                      </Typography>
                    </Stack>

                    <Stack direction="row" width="100%" gap="10px" alignItems="center" pt="8px">
                      <FcOvertime fontSize="22px" />
                      <Typography fontSize="15px" color="#3b3b3b">
                        {createdAt}
                      </Typography>
                    </Stack>

                    <motion.div whileTap={{ scale: 0.97 }}>
                      <Button
                        component={Link}
                        to={`/${item.name}?cid=${item._id}&type=${item.type}/${user}`}
                        variant="contained"
                        color="primary"
                        sx={{
                          mt: 2,
                          textTransform: 'none',
                          width: '140px',
                          borderRadius: '12px',
                          background: 'linear-gradient(to right, #6fc1ff, #c3b3ff)',
                          '&:hover': {
                            background: 'linear-gradient(to right, #5bb0e6, #b39ddb)',
                          },
                        }}
                      >
                        More Details
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          }
        });
        setitem(items);
      })
      .catch((err) => {
        console.log("Error :", err);
      });
  }, [page]);

  return (
    <>
      <Stack
        direction="column"
        width="100%"
        sx={{
          background: 'linear-gradient(135deg, #c3f0ff, #e6e6ff)',
          py: 4,
          px: { xs: 2, md: 6 },
        }}
        alignItems="center"
      >
        <Typography fontSize={{ xs: '18px', sm: '22px', md: '26px' }} color="#3b3b3b" fontWeight="500">
          Welcome {user_info.nickname} 👋!
        </Typography>
        <Typography
          fontSize={{ xs: '16px', sm: '20px', md: '22px' }}
          color="#3b3b3b"
          fontWeight="bold"
        >
          Here you can find the Lost Items
        </Typography>
      </Stack>

      <Stack
        pt="30px"
        direction="row"
        justifyContent="center"
        flexWrap="wrap"
        gap="24px"
        maxWidth="1440px"
        mx="auto"
      >
        {item}
      </Stack>

      <Paginationn page={page} setPage={setPage} max={maxPages} />
    </>
  );
}
