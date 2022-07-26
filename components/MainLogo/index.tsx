import { Box, Group, Image, Stack } from '@mantine/core';

export default function MainLogo(): JSX.Element {
  return (
    <Box>
      <Box sx={{ fontWeight: 'bold', color: '#ffffff', fontSize: '16px' }}>Ticket</Box>
      <Box sx={{ color: '#ffffff', fontSize: '10px' }}>Distribution</Box>
    </Box>
  );
}
