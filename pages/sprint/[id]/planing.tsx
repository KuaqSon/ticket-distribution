import { Box, Container, Stack } from '@mantine/core';
import { Sprint } from '@prisma/client';
import Header from 'components/Header';
import prisma from 'lib/prisma';
import { GetServerSideProps } from 'next';

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

export interface SprintPlaningProps {
  sprint: Sprint;
}

export default function SprintPlaning({ sprint }: SprintPlaningProps): JSX.Element {
  console.log('🚀 ~ file: [id].tsx ~ line 8 ~ SprintDetailPage', sprint);
  return (
    <>
      <Header />

      <Container>
        <h1>SprintPlaning</h1>

        <Stack>
          <Box>{sprint.name}</Box>
          <Box>Start: {sprint.startAt}</Box>
          <Box>End: {sprint.endAt}</Box>
        </Stack>
      </Container>
    </>
  );
}
