import { Anchor, Center } from '@mantine/core';
import { ColorSchemeToggle } from 'components/ColorSchemeToggle/ColorSchemeToggle';
import Header from 'components/Header';
import { Welcome } from 'components/Welcome/Welcome';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <Header />
      <Welcome />
      {/* <ColorSchemeToggle /> */}
      <Center p="lg">
        <Link href="sprint">
          <Anchor>SPRINTS</Anchor>
        </Link>
      </Center>
    </>
  );
}
