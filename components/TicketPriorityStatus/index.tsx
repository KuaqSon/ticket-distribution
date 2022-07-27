import { Group, Box } from '@mantine/core';
import PriorityStatusIcon from 'components/PriorityStatusIcon';
import { TICKET_PRIORITY } from 'utils/constants';
import { getKeyByValue } from 'utils/helper';

export default function TicketPriorityStatus({ priority }: { priority: number }) {
  return (
    <Group spacing="xs">
      <Box>
        <PriorityStatusIcon priority={priority} />
      </Box>
      <Box sx={{ fontSize: '12px', fontWeight: 'bold' }}>
        {getKeyByValue(TICKET_PRIORITY, priority)}
      </Box>
    </Group>
  );
}
