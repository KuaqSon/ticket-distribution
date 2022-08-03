import { Paper, Skeleton, Stack } from '@mantine/core';

export default function SprintSkeleton(): JSX.Element {
  return (
    <Stack py="md">
      <Paper p="xs" shadow="xs">
        <Skeleton height={100} />
      </Paper>
      <Paper p="xs" shadow="xs">
        <Skeleton height={100} />
      </Paper>
      <Paper p="xs" shadow="xs">
        <Skeleton height={100} />
      </Paper>
    </Stack>
  );
}
