import { Container, Center, Loader, Title } from '@mantine/core';
import Header from 'components/Header';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const SprintPage = dynamic(() => import('components/SprintPage'), {
  suspense: true,
});

export default function SprintContainer(): JSX.Element {
  return (
    <>
      <Header />

      <Container py="lg">
        <Title>Sprints Management</Title>

        <Suspense
          fallback={
            <Center>
              <Loader />
            </Center>
          }
        >
          <SprintPage />
        </Suspense>
      </Container>
    </>
  );
}
