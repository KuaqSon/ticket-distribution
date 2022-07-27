import { Box, Button, Group, MantineTheme, Paper, Stack } from '@mantine/core';
import { Ticket } from '@prisma/client';
import TicketBadge from 'components/TicketBadge';
import TicketPriorityStatus from 'components/TicketPriorityStatus';
import { stringToColor } from 'utils/helper';

export default function TicketItem({
  ticket,
  onEdit,
}: {
  ticket: Ticket;
  onEdit?: (ticket: Ticket) => void;
}) {
  return (
    <Paper shadow="sm" p="sm">
      <Group noWrap>
        <Stack sx={{ flex: 1 }} spacing={6}>
          <Box sx={{ fontWeight: 'bold', fontSize: '18px' }}>{ticket.name}</Box>
          <TicketPriorityStatus priority={ticket.priority} />
          <TicketBadge ticket={ticket} />
          {ticket.epic && (
            <Box>
              <Box
                component="span"
                sx={(t: MantineTheme) => ({
                  border: `1px solid ${stringToColor(ticket.epic)}`,
                  color: stringToColor(ticket.epic),
                  borderRadius: t.radius.sm,
                  padding: '4px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                })}
              >
                {ticket.epic}
              </Box>
            </Box>
          )}
        </Stack>
        <Group spacing="xs">
          <Button variant="light" compact onClick={() => onEdit && onEdit(ticket)}>
            Edit
          </Button>
        </Group>
      </Group>
    </Paper>
  );
}
