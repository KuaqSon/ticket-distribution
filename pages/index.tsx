import { Center, Loader } from '@mantine/core';
import Header from 'components/Header';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const HomeBanner = dynamic(() => import('components/HomeBanner'), {
  suspense: true,
});

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  return { props: { user: session?.user || null } };
};

export default function HomePage({ user }) {
  return (
    <>
      <Header />
      <Suspense
        fallback={
          <Center>
            <Loader />
          </Center>
        }
      >
        <HomeBanner user={user} />
      </Suspense>
    </>
  );
}
