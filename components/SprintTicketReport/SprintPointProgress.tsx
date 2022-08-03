import { ActionIcon, Badge, Box, Group, Stack } from '@mantine/core';
import { CheckIcon, CopyIcon } from '@modulz/radix-icons';
import { Sprint, Ticket } from '@prisma/client';
import { calculateSprintProgress, groupTicketByStatus } from 'components/SprintTicketReport/utils';
import { TICKET_STATUS } from 'utils/constants';
import { getKeyByValue } from 'utils/helper';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useEffect, useState } from 'react';

export default function SprintPointProgress({
  sprint,
  tickets,
  epicName = null,
}: {
  sprint: Sprint;
  tickets: Ticket[];
  epicName?: string | null;
}) {
  const [copied, setCopied] = useState<boolean>(false);
  const progress = calculateSprintProgress(sprint, tickets);
  const groupTicket = groupTicketByStatus(tickets);
  const message = `Completed ${progress.completedPoints} of ${progress.totalPoints} points | ${progress.percentCompleted}%`;

  const summary = [
    epicName || sprint.name,
    'Progress:',
    `- Total Points: ${progress.totalPoints}`,
    `- Completed Points: ${progress.completedPoints}`,
    `- Percent: ${progress.percentCompleted}%`,
    'Status:',
    ...Object.keys(groupTicket).map(
      (key) =>
        `- ${getKeyByValue(TICKET_STATUS, key)?.split('_').join(' ')}: ${groupTicket[key].length} ${
          groupTicket[key].length > 1 ? 'tickets' : 'ticket'
        }`
    ),
  ].join('\n');

  useEffect(() => {
    let timer = null;
    if (copied) {
      timer = setTimeout(() => setCopied(false), 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [copied]);

  return (
    <Stack spacing="xs">
      <Group>
        <Box sx={{ fontSize: '14px', fontWeight: 600 }}>{message}</Box>
        <Box>
          <CopyToClipboard text={summary} onCopy={() => setCopied(true)}>
            <ActionIcon radius="lg">{copied ? <CheckIcon /> : <CopyIcon />}</ActionIcon>
          </CopyToClipboard>
        </Box>
      </Group>
      <Group spacing="xs">
        {Object.keys(groupTicket).map((key) => (
          <Badge key={key} radius="sm" color="dark" variant="outline">
            <Group spacing="xs">
              <Box>{getKeyByValue(TICKET_STATUS, key)?.split('_').join(' ')}</Box>
              <Box>{groupTicket[key].length}</Box>
            </Group>
          </Badge>
        ))}
      </Group>
    </Stack>
  );
}
