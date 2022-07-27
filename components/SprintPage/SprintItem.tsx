import { Box, Button, Group, Paper } from '@mantine/core';
import { Sprint } from '@prisma/client';
import Link from 'next/link';
import { shortDateFormat } from 'utils/helper';

export default function SprintItem({
  sprint,
  onEdit,
}: {
  sprint: Sprint;
  onEdit?: (sprint: Sprint) => void;
}) {
  return (
    <Paper shadow="sm" p="sm">
      <Group noWrap>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ fontWeight: 'bold', fontSize: '18px' }}>{sprint.name}</Box>
          <Box sx={{ fontSize: '10px' }}>
            {`${shortDateFormat(sprint.startAt)} - ${shortDateFormat(sprint.endAt)}`}
          </Box>
        </Box>
        <Group spacing="xs">
          <Button variant="light" compact onClick={() => onEdit && onEdit(sprint)}>
            Edit
          </Button>
          <Link href={`/sprint/${sprint.id}/manage`}>
            <Button variant="light" color="violet" compact>
              Manage
            </Button>
          </Link>
          <Link href={`/sprint/${sprint.id}/planing`}>
            <Button variant="light" color="green" compact>
              Planing
            </Button>
          </Link>
          <Link href={`/sprint/${sprint.id}/report`}>
            <Button variant="light" color="orange" compact>
              Report
            </Button>
          </Link>
        </Group>
      </Group>
    </Paper>
  );
}
