import React, { useState, useEffect } from "react";
import { setConstraint } from "../constraints";
import DeleteIcon from '@mui/icons-material/Delete';
import ContactsIcon from '@mui/icons-material/Contacts';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import axios from "axios";
import {
  Modal,
  Button,
  Typography,
  Avatar,
  Stack,
} from '@mui/material';
import { Carousel } from 'react-carousel-minimal';
import { MdDateRange } from 'react-icons/md';
import { GrMap } from 'react-icons/gr';

function ItemPage() {
  const [item, setItem] = useState(null);
  const [itemDetails, setItemDetails] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [slides, setSlides] = useState([]);

  setConstraint(true);

  const queryParams = new URLSearchParams(window.location.search);
  const item_id = queryParams.get('cid');
  const current_user = queryParams.get('type').split("/")[1];

  const handleDeleteModal = () => setShowDelete(!showDelete);
  const handleContactModal = () => setShowContact(!showContact);

  useEffect(() => {
    axios.get(`http://localhost:4000/items/${item_id}`)
      .then((res) => {
        const data = res.data.item;

        // Set carousel slides
        setSlides(data.img.map((img) => ({ image: img })));
        setItem(data);

        // Item details JSX
        const details = (
          <Stack width="100%" px={{ xs: 2, sm: 5, md: 10 }} gap={4} mt={3}>
            {/* Carousel + User Info */}
            <Stack direction={{ xs: 'column', sm: 'row' }} gap={4} alignItems="center" justifyContent="center">
              {/* Carousel */}
              <Stack width={{ xs: '100%', sm: '50%', md: '700px' }} height="280px">
                <Carousel
                  data={data.img.map((img) => ({ image: img }))}
                  width="100%"
                  height="270px"
                  radius="10px"
                  dots={false}
                  automatic={false}
                  slideBackgroundColor="#f0f0f0"
                  slideImageFit="contain"
                  thumbnails={false}
                />
              </Stack>

              {/* User Info + Action */}
              <Stack justifyContent="center" width={{ xs: '100%', sm: '50%', md: '400px' }} p={2} gap={2}
                sx={{
                  boxShadow: '0px 4px 15px rgba(0,0,0,0.15)',
                  borderRadius: '10px',
                  backgroundColor: '#fff'
                }}>
                <Stack direction="row" width="100%" gap={2} alignItems="center" justifyContent="center">
                  <Avatar src={data?.userId?.img} sx={{ width: 100, height: 100 }} />
                  <Typography fontSize="20px" fontWeight="bold" color="primary">{data?.userId?.fullname}</Typography>
                </Stack>

                {current_user === "true" ? (
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      variant="contained"
                      startIcon={<DeleteIcon />}
                      fullWidth
                      onClick={handleDeleteModal}
                      sx={{ textTransform: 'none', borderRadius: 3 }}
                    >
                      Delete Post
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      variant="contained"
                      startIcon={<ContactsIcon />}
                      fullWidth
                      onClick={handleContactModal}
                      sx={{ textTransform: 'none', borderRadius: 3 }}
                    >
                      Contact
                    </Button>
                  </motion.div>
                )}
              </Stack>
            </Stack>

            {/* Description */}
            <Stack width="100%">
              <Typography fontSize="18px" fontWeight="bold">Description:</Typography>
              <Typography fontSize="16px" sx={{ textAlign: 'justify', textIndent: '50px' }}>
                {data.description}
              </Typography>
            </Stack>

            {/* Date & Location */}
            <Stack width="100%" gap={2}>
              {/* Date */}
              <Stack direction="row" alignItems="center" gap={2}>
                <MdDateRange size={20} />
                <Typography fontWeight="bold">Date Found:</Typography>
                <Typography>{data?.date}</Typography>
              </Stack>

              {/* Location */}
              <Stack direction="row" alignItems="center" gap={2}>
                <GrMap size={20} />
                <Typography fontWeight="bold">Location Found:</Typography>
                <Typography>{data?.location}</Typography>
              </Stack>
            </Stack>
          </Stack>
        );

        setItemDetails(details);
      })
      .catch((err) => console.log(err));
  }, [item_id]);

  // Delete item
  const deleteItem = () => {
    axios.delete(`http://localhost:4000/items/delete/${item_id}`)
      .then(() => {
        toast.success('Item deleted successfully!', { position: "bottom-right" });
        setShowDelete(false);
        window.location.href = "/mylistings";
      })
      .catch(err => console.log(err));
  };

  return (
    <Stack width="100%" alignItems="center" pt={2}>
      {/* Header */}
      <Stack direction="row" width="100%" sx={{ backgroundColor: 'primary.main' }} height="125px" justifyContent="center" alignItems="center">
        <Stack maxWidth="1440px" width="100%" px={{ xs: 3, md: 10 }}>
          <Typography fontSize={{ xs: 18, md: 25 }} color="white">{item?.type} Item</Typography>
          <Typography fontSize={{ xs: 17, md: 23 }} color="white" fontWeight="bold">
            Someone Found {item?.name}
          </Typography>
        </Stack>
      </Stack>

      {/* Item Details */}
      <Stack width="100%" maxWidth="1440px" px={{ xs: 2, md: 10 }}>
        {itemDetails}
      </Stack>

      {/* Delete Modal */}
      <Modal open={showDelete} onClose={handleDeleteModal}>
        <Stack alignItems="center" justifyContent="center" gap={3} sx={{
          width: 400,
          p: 4,
          bgcolor: '#f0f5ff',
          borderRadius: 3,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: 24
        }}>
          <Typography fontWeight="bold">Are you sure you want to delete?</Typography>
          <Stack direction="row" justifyContent="space-between" width="100%" gap={2}>
            <Button variant="contained" color="primary" onClick={deleteItem} sx={{ flex: 1 }}>Yes</Button>
            <Button variant="contained" color="primary" onClick={handleDeleteModal} sx={{ flex: 1 }}>No</Button>
          </Stack>
        </Stack>
      </Modal>

      {/* Contact Modal */}
      <Modal open={showContact} onClose={handleContactModal}>
        <Stack alignItems="center" justifyContent="center" gap={3} sx={{
          width: 400,
          p: 4,
          bgcolor: '#f0f5ff',
          borderRadius: 3,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: 24
        }}>
          <Typography fontWeight="bold">{item?.userId?.fullname}'s Contact:</Typography>
          <Typography>{item?.number}</Typography>
        </Stack>
      </Modal>
    </Stack>
  );
}

export default ItemPage;
