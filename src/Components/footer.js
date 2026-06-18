import React from 'react';
import { Link, Stack, Typography, Box } from '@mui/material';
import { BsFacebook, BsInstagram, BsTwitter } from 'react-icons/bs';
import { motion } from 'framer-motion';

const footer = () => {
    return (
        <Stack width="100%" sx={{ pt: '50px', backgroundColor: '#f5f7ff' }}>
            <Stack
                width="100%"
                height="150px"
                sx={{ background: 'linear-gradient(135deg, #c3f0ff, #e6e6ff)' }}
                py="20px"
                px={{ xs: 3, md: 8 }}
                justifyContent="center"
                borderRadius="20px 20px 0 0"
                boxShadow="0px -5px 15px rgba(0,0,0,0.05)"
            >
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    height="100%"
                >
                    <Typography
                        fontSize={{ xs: '14px', md: '16px' }}
                        fontWeight="light"
                        color="#3b3b3b"
                        sx={{ transition: 'color 0.3s' }}
                        component={motion.p}
                        whileHover={{ color: '#357ABD' }}
                    >
                        © 2026 All Rights Reserved
                    </Typography>

                    <Stack direction="row" gap={{ xs: '10px', md: '20px' }} alignItems="center">
                        <motion.a
                            href="https://www.instagram.com/"
                            target="_blank"
                            rel="noreferrer"
                            whileHover={{ scale: 1.2, rotate: 10 }}
                            style={{ color: '#357ABD' }}
                        >
                            <BsInstagram fontSize="28px" />
                        </motion.a>
                        <motion.a
                            href="https://www.facebook.com/"
                            target="_blank"
                            rel="noreferrer"
                            whileHover={{ scale: 1.2, rotate: -10 }}
                            style={{ color: '#357ABD' }}
                        >
                            <BsFacebook fontSize="28px" />
                        </motion.a>
                        <motion.a
                            href="https://www.twitter.com/"
                            target="_blank"
                            rel="noreferrer"
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            style={{ color: '#357ABD' }}
                        >
                            <BsTwitter fontSize="28px" />
                        </motion.a>
                    </Stack>
                </Stack>

                <Box textAlign="center" mt={1}>
                    <Link
                        href="https://github.com/KcMelek/Lost-Found-MERN"
                        target="_blank"
                        sx={{
                            fontSize: '12px',
                            color: '#3b3b3b',
                            opacity: 0.6,
                            transition: 'opacity 0.3s, color 0.3s',
                            '&:hover': { opacity: 1, color: '#357ABD' },
                        }}
                    >
                    </Link>
                </Box>
            </Stack>
        </Stack>
    );
};

export default footer;
