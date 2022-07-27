import { Box, Center, Container, Loader, Stack, Title } from '@mantine/core';
import { Sprint } from '@prisma/client';
import Header from 'components/Header';
import prisma from 'lib/prisma';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import TimeAgo from 'react-timeago';
import { Suspense } from 'react';
import { shortDateFormat } from 'utils/helper';
import SprintNavigator from 'components/SprintNavigator';

const TicketManagement = dynamic(() => import('components/TicketManagement'), {
  suspense: true,
});

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const sprint = await prisma.sprint.findUnique({
    where: {
      id: String(params?.id),
    },
  });

  if (!sprint) {
    return { notFound: true };
  }

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

      <Container py="lg">
        <Stack>
          <Box>
            <Box>Manage</Box>
            <Title>{sprint.name}</Title>
          </Box>
          <Box>{`${shortDateFormat(sprint.startAt)} - ${shortDateFormat(sprint.endAt)}`}</Box>
          <Box>
            Remaining: <TimeAgo date={sprint.endAt} />
          </Box>
          <SprintNavigator sprint={sprint} />
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
