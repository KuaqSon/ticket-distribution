import { Group, Badge } from '@mantine/core';
import { Ticket } from '@prisma/client';
import { TICKET_STATUS } from 'utils/constants';
import { getKeyByValue } from 'utils/helper';

export default function TicketBadge({ ticket }: { ticket: Ticket }) {
  const status = getKeyByValue(TICKET_STATUS, ticket.status)?.split('_').join(' ');

  return (
    <Group spacing="xs">
      <Badge color="dark" radius="sm" size="sm">
        Order: {ticket.orderNumber}
      </Badge>
      <Badge color="violet" radius="sm" size="sm">
        {status}
      </Badge>
      <Badge color="pink" radius="sm" size="sm">
        {ticket.storyPoint}
      </Badge>
    </Group>
  );
}
