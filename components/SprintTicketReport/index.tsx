import { Badge, Box, Group, MantineTheme, Paper, Stack, Text } from '@mantine/core';
import { Sprint } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { getKeyByValue, stringToColor } from 'utils/helper';
import { getListTicketsRequest } from 'utils/request-api';
import {
  calculateSprintProgress,
  groupTicketByStatus,
  ticketsByEpic,
} from 'components/SprintTicketReport/utils';
import TicketStatusItem from 'components/SprintTicketReport/TicketStatusItem';
import SprintPointProgress from 'components/SprintTicketReport/SprintPointProgress';
import { TICKET_STATUS } from 'utils/constants';
import SprintSkeleton from 'components/SprintSkeleton';

const StatPaper = ({ label, value }) => (
  <Paper
    sx={(theme: MantineTheme) => ({
      paddingTop: theme.spacing.xl,
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: theme.white,
    })}
    radius="sm"
    shadow="md"
    p="xs"
    m="6px"
  >
    <Box>
      <Text
        sx={(theme: MantineTheme) => ({
          textTransform: 'uppercase',
          fontWeight: 700,
          fontSize: theme.fontSizes.xs,
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          color: theme.colors.gray[6],
          lineHeight: 1.2,
        })}
      >
        {label}
      </Text>
      <Text
        size="xs"
        sx={(theme: MantineTheme) => ({
          color: theme.colors.gray[6],
        })}
      >
        <Box
          sx={(theme: MantineTheme) => ({
            fontSize: theme.fontSizes.sm,
            fontWeight: 700,
            color: theme.black,
          })}
        >
          {value}
        </Box>
      </Text>
    </Box>
  </Paper>
);

export default function SprintTicketReport({ sprint }: { sprint: Sprint }) {
  const { data: tickets, isLoading } = useQuery(
    ['tickets', sprint.id],
    () => getListTicketsRequest({ sprintId: sprint.id }),
    {
      initialData: [],
    }
  );
  const byEpic = ticketsByEpic(tickets);
  const progress = calculateSprintProgress(sprint, tickets);
  const groupTicket = groupTicketByStatus(tickets);

  if (isLoading) {
    return <SprintSkeleton />;
  }

  return (
    <>
      <Stack py="lg">
        <Group spacing="xs">
          {Object.keys(groupTicket).map((key) => (
            <Badge key={key} radius="sm" variant="filled">
              <Group spacing="xs">
                <Box>{getKeyByValue(TICKET_STATUS, key)?.split('_').join(' ')}</Box>
                <Box>{groupTicket[key].length}</Box>
              </Group>
            </Badge>
          ))}
        </Group>
        <Box
          sx={(theme: MantineTheme) => ({
            backgroundImage: `linear-gradient(-60deg, ${theme.colors[theme.primaryColor][4]} 0%, ${
              theme.colors[theme.primaryColor][7]
            } 100%)`,
            padding: '6px',
            borderRadius: theme.radius.sm,
            display: 'flex',

            [theme.fn.smallerThan('xs')]: {
              flexDirection: 'column',
            },
          })}
        >
          <StatPaper label="Total Points" value={progress.totalPoints} />
          <StatPaper label="Completed Points" value={progress.completedPoints} />
          <StatPaper label="Percent Completed" value={`${progress.percentCompleted}%`} />
        </Box>
        <Box>
          <Stack>
            {Object.keys(byEpic).map((key) => (
              <Box
                key={key}
                id={key}
                sx={(t: MantineTheme) => ({
                  border: `1px solid ${t.colors.gray[6]}`,
                  padding: t.spacing.xs,
                  borderRadius: t.radius.sm,
                })}
              >
                <Box
                  sx={(t: MantineTheme) => ({
                    fontWeight: 'bold',
                    color: stringToColor(key),
                    fontSize: t.fontSizes.md,
                  })}
                  mb="sm"
                >
                  {key}
                </Box>

                <Stack spacing="xs">
                  <SprintPointProgress sprint={sprint} tickets={byEpic[key]} />
                  {byEpic[key].map((ticket) => (
                    <TicketStatusItem key={ticket.id} ticket={ticket} />
                  ))}
                </Stack>
              </Box>
            ))}
          </Stack>
        </Box>
      </Stack>
    </>
  );
}
