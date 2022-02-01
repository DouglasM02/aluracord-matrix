import {
  Box,
} from '@skynexui/components';
import { Skeleton } from '@mui/material';

export default function Loading(props) {
  return (
    <Box>
      <Skeleton variant="rect" width={300} height={200} />
    </Box>
  );
}
