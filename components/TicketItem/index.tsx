import { Badge, Box, Button, Group, MantineTheme, Paper, Stack } from '@mantine/core';
import { Ticket } from '@prisma/client';
import { TICKET_PRIORITY, TICKET_STATUS } from 'utils/constants';
import { getKeyByValue, stringToColor } from 'utils/helper';

export default function TicketItem({
  ticket,
  onEdit,
}: {
  ticket: Ticket;
  onEdit?: (ticket: Ticket) => void;
}) {
  const priority = getKeyByValue(TICKET_PRIORITY, ticket.priority);

  const status = getKeyByValue(TICKET_STATUS, ticket.status)?.split('_').join(' ');

  return (
    <Paper shadow="sm" p="sm">
      <Group noWrap>
        <Stack sx={{ flex: 1 }} spacing={4}>
          <Box sx={{ fontWeight: 'bold', fontSize: '18px' }}>{ticket.name}</Box>
          <Box sx={{ fontSize: '10px' }}>{`${status} - ${ticket.storyPoint} - ${priority}`}</Box>
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
