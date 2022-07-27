import { Stack, Drawer, Group, Button, Center, Loader } from '@mantine/core';
import { Sprint } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import SprintForm from 'components/SprintForm';
import SprintItem from 'components/SprintPage/SprintItem';
import { useState } from 'react';
import {
  createSprintRequest,
  deleteSprintRequest,
  getListSprintsRequest,
  updateSprintRequest,
} from 'utils/request-api';

export default function SprintPage() {
  const [opened, setOpened] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editSprint, setEditSprint] = useState<Sprint | null>(null);

  const {
    data: sprints,
    isLoading,
    refetch,
  } = useQuery(['sprints'], () => getListSprintsRequest());

  const deleteSprint = async (data) => {
    setSaving(true);
    setEditSprint(null);
    setOpened(false);
    try {
      await deleteSprintRequest(data.id);
      refetch();
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const saveSprint = async (data) => {
    setSaving(true);
    setEditSprint(null);
    setOpened(false);
    try {
      if (data.id) {
        await updateSprintRequest(data);
      } else {
        await createSprintRequest(data);
      }
      refetch();
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title={editSprint ? 'Edit Sprint' : 'New Sprint'}
        padding="xl"
        size="xl"
        position="right"
      >
        <SprintForm sprint={editSprint} onSubmit={saveSprint} onDelete={deleteSprint} />
      </Drawer>

      <Stack>
        <Group position="center">
          <Button
            onClick={() => {
              setEditSprint(null);
              setOpened(true);
            }}
            loading={saving}
          >
            New Sprint
          </Button>
        </Group>

        {isLoading && (
          <Center>
            <Loader size="lg" />
          </Center>
        )}

        {sprints?.map((s) => (
          <SprintItem
            key={s.id}
            sprint={s}
            onEdit={() => {
              setEditSprint(s);
              setOpened(true);
            }}
          />
        ))}
      </Stack>
    </>
  );
}
