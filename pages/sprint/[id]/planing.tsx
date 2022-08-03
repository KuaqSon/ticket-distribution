import { Anchor, Box, Center, Container, Loader, Stack, Title } from '@mantine/core';
import Header from 'components/Header';
import { shortDateFormat } from 'utils/helper';
import TimeAgo from 'react-timeago';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import SprintNavigator from 'components/SprintNavigator';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { getSprintDetailRequest } from 'utils/request-api';
import Link from 'next/link';

const SprintTicketPlan = dynamic(() => import('components/SprintTicketPlan'), {
  suspense: true,
});

export default function SprintPlaning(): JSX.Element {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: sprint,
    isLoading,
    isFetching,
  } = useQuery(['sprint', id], () => getSprintDetailRequest(id), {
    refetchOnWindowFocus: false,
  });

  const loading = isLoading || isFetching;

  return (
    <>
      <Header />

      <Container py="lg">
        {loading ? (
          <Center py="lg">
            <Loader />
          </Center>
        ) : sprint ? (
          <>
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
          </>
        ) : (
          <Stack align="center" py="lg">
            <Box>Sprint Not Found</Box>

            <Center>
              <Link href="sprint">
                <Anchor>SPRINTS</Anchor>
              </Link>
            </Center>
          </Stack>
        )}
      </Container>
    </>
  );
}
