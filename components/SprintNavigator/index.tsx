import { Anchor, Group } from '@mantine/core';
import { Sprint } from '@prisma/client';
import Link from 'next/link';

export default function SprintNavigator({ sprint }: { sprint: Sprint }) {
  return (
    <Group>
      <Link href="/sprint">
        <Anchor>All Sprints</Anchor>
      </Link>
      <Link href={`/sprint/${sprint.id}/manage`}>
        <Anchor>Manage</Anchor>
      </Link>
      <Link href={`/sprint/${sprint.id}/planing`}>
        <Anchor>Planing</Anchor>
      </Link>
      <Link href={`/sprint/${sprint.id}/report`}>
        <Anchor>Report</Anchor>
      </Link>
    </Group>
  );
}
