import { Box, Center, Loader, MantineTheme, Stack } from '@mantine/core';
import { Sprint } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { stringToColor } from 'utils/helper';
import { getListTicketsRequest } from 'utils/request-api';
import { ticketsByEpic } from 'components/SprintTicketReport/utils';
import TicketStatusItem from 'components/SprintTicketReport/TicketStatusItem';
import SprintPointProgress from 'components/SprintTicketReport/SprintPointProgress';

export default function SprintTicketReport({ sprint }: { sprint: Sprint }) {
  const { data: tickets, isLoading } = useQuery(
    ['tickets', sprint.id],
    () => getListTicketsRequest({ sprintId: sprint.id }),
    {
      initialData: [],
    }
  );
  const byEpic = ticketsByEpic(tickets);

  if (isLoading) {
    return (
      <Center>
        <Loader />
      </Center>
    );
  }

  return (
    <>
      <Stack py="lg">
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
