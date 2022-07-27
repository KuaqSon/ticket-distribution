import { Paper, Group, Box } from '@mantine/core';
import { Ticket } from '@prisma/client';
import TicketBadge from 'components/TicketBadge';
import TicketPriorityStatus from 'components/TicketPriorityStatus';

export default function TicketStatusItem({ ticket }: { ticket: Ticket }) {
  return (
    <Paper p="xs" shadow="xs">
      <Group noWrap={false}>
        <Group sx={{ flex: 1, minWidth: '250px' }} spacing="xs" align="center">
          <Box>{ticket.name}</Box>
          <TicketBadge ticket={ticket} />
        </Group>
        <TicketPriorityStatus priority={ticket.priority} />
      </Group>
    </Paper>
  );
}
