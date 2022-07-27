import { Box, Center, Container, Loader, Stack } from '@mantine/core';
import { Sprint } from '@prisma/client';
import Header from 'components/Header';
import prisma from 'lib/prisma';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import TimeAgo from 'react-timeago';
import { Suspense } from 'react';
import { shortDateFormat } from 'utils/helper';

const TicketManagement = dynamic(() => import('components/TicketManagement'), {
  suspense: true,
});

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const sprint = await prisma.sprint.findUnique({
    where: {
      id: String(params?.id),
    },
  });

  return {
    props: { sprint: JSON.parse(JSON.stringify(sprint)) },
  };
};

export interface SprintManagementProps {
  sprint: Sprint;
}

export default function SprintManagement({ sprint }: SprintManagementProps): JSX.Element {
  return (
    <>
      <Header />

      <Container>
        <Stack>
          <Box>
            <Box>Manage</Box>
            <Box sx={{ fontWeight: 'bold', fontSize: '2rem' }}>{sprint.name}</Box>
          </Box>
          <Box>{`${shortDateFormat(sprint.startAt)} - ${shortDateFormat(sprint.endAt)}`}</Box>
          <Box>
            Remaining: <TimeAgo date={sprint.endAt} />
          </Box>
        </Stack>

        <Suspense
          fallback={
            <Center>
              <Loader />
            </Center>
          }
        >
          <TicketManagement sprint={sprint} />
        </Suspense>
      </Container>
    </>
  );
}
