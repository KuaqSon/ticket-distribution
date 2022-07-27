import { Box, Center, Container, Loader, Stack, Title } from '@mantine/core';
import { Sprint } from '@prisma/client';
import Header from 'components/Header';
import prisma from 'lib/prisma';
import { GetServerSideProps } from 'next';
import { shortDateFormat } from 'utils/helper';
import TimeAgo from 'react-timeago';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import SprintNavigator from 'components/SprintNavigator';

const SprintTicketPlan = dynamic(() => import('components/SprintTicketPlan'), {
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

export interface SprintPlaningProps {
  sprint: Sprint;
}

export default function SprintPlaning({ sprint }: SprintPlaningProps): JSX.Element {
  return (
    <>
      <Header />

      <Container py="lg">
        <Stack>
          <Box>
            <Box>Planing</Box>
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
          <SprintTicketPlan sprint={sprint} />
        </Suspense>
      </Container>
    </>
  );
}
