import { Box, Button, Group, MantineTheme, Paper, Stack } from '@mantine/core';
import { Sprint } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { slackUpMessage, ticketsByDay } from 'components/SprintTicketPlan/utils';
import moment from 'moment';
import { DATE_KEY } from 'utils/constants';
import { getListTicketsRequest } from 'utils/request-api';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useEffect, useState } from 'react';
import { CheckIcon, ClipboardCopyIcon } from '@modulz/radix-icons';
import TicketBadge from 'components/TicketBadge';
import TicketPriorityStatus from 'components/TicketPriorityStatus';
import SprintSkeleton from 'components/SprintSkeleton';

export default function SprintTicketPlan({ sprint }: { sprint: Sprint }) {
  const [copied, setCopied] = useState<boolean>(false);

  const { data: tickets, isLoading } = useQuery(
    ['tickets', sprint.id],
    () => getListTicketsRequest({ sprintId: sprint.id })
  );

  const byDays = ticketsByDay(sprint, tickets || []);

  const slackMsg = slackUpMessage(byDays);

  useEffect(() => {
    let timer = null;
    if (copied) {
      timer = setTimeout(() => setCopied(false), 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [copied]);

  if (isLoading || !tickets) {
    return <SprintSkeleton />;
  }

  return (
    <>
      <Stack py="lg">
        <Stack
          sx={(t: MantineTheme) => ({
            border: `1px solid ${t.colors.grape[8]}`,
            borderRadius: t.radius.sm,
            padding: t.spacing.xs,
          })}
        >
          <Box
            sx={(t: MantineTheme) => ({
              fontSize: t.fontSizes.md,
              color: t.colors.grape[8],
              fontWeight: 'bold',
            })}
          >
            {moment().format('LL')} Slack Up!
          </Box>
          <Box sx={(t: MantineTheme) => ({ whiteSpace: 'pre-line', fontSize: t.fontSizes.sm })}>
            {slackMsg}
          </Box>
          <Group>
            <CopyToClipboard text={slackMsg} onCopy={() => setCopied(true)}>
              <Button
                color="grape"
                compact
                rightIcon={copied ? <CheckIcon /> : <ClipboardCopyIcon />}
              >
                {copied ? 'Copied' : 'Copy'}
              </Button>
            </CopyToClipboard>
          </Group>
        </Stack>

        <Box>
          <Stack>
            {Object.keys(byDays).map((key) => (
              <Paper key={key} id={key} p="sm" shadow="xs">
                <Box
                  sx={(t: MantineTheme) => ({
                    fontWeight: 'bold',
                    color: moment(key, DATE_KEY).isSame(new Date(), 'day')
                      ? t.colors.violet
                      : undefined,
                  })}
                  mb="sm"
                >
                  {moment(key, DATE_KEY).format('ll')}
                </Box>
                {byDays[key].length > 0 ? (
                  <Stack spacing="xs">
                    {byDays[key].map((ticket) => (
                      <Group
                        key={ticket.id}
                        sx={(t: MantineTheme) => ({
                          border: `1px solid ${t.colors.gray[6]}`,
                          padding: t.spacing.xs,
                          borderRadius: t.radius.sm,
                        })}
                      >
                        <Group sx={{ flex: 1, minWidth: '250px' }}>
                          <Box>{ticket.name}</Box>
                          <TicketBadge ticket={ticket} />
                        </Group>
                        <TicketPriorityStatus priority={ticket.priority} />
                      </Group>
                    ))}
                  </Stack>
                ) : (
                  <Box sx={(t: MantineTheme) => ({ color: t.colors.gray[6] })}>Empty</Box>
                )}
              </Paper>
            ))}
          </Stack>
        </Box>
      </Stack>
    </>
  );
}
