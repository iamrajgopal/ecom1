import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function Pagination1({ onPageChange, totalPages }) {
  return (
    <Stack spacing={2} sx={{ justifyContent: 'center', display: 'flex', margin: '1rem 0' }}>
      <Pagination count={totalPages} onChange={(e, page) => onPageChange(page)} />
    </Stack>
  );
}

export default Pagination1;
