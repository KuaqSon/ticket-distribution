import { Container, Center, Loader, Title } from '@mantine/core';
import Header from 'components/Header';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const SprintPage = dynamic(() => import('components/SprintPage'), {
  suspense: true,
});

// export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
//   const session = await getSession({ req });
//   if (session) {
//     return { props: { user: session.user } };
//   }
//   return {
//     redirect: {
//       destination: '/api/auth/signin',
//       permanent: false,
//     },
//   };

//   // const sprints = await prisma.sprint.findMany({
//   //   where: {
//   //     user: { email: session.user.email },
//   //   },
//   // });

//   // return {
//   //   props: { sprints: JSON.parse(JSON.stringify(sprints)) },
//   // };
// };

export interface SprintProps {}

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
