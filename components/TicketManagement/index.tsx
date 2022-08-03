import { Button, Drawer, Group, Stack } from '@mantine/core';
import { Sprint, Ticket } from '@prisma/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import SprintSkeleton from 'components/SprintSkeleton';

import TicketForm from 'components/TicketForm';
import TicketItem from 'components/TicketItem';
import { useState } from 'react';

import {
  createTicketRequest,
  deleteTicketRequest,
  getListTicketsRequest,
  updateTicketRequest,
} from 'utils/request-api';

export default function TicketManagement({ sprint }: { sprint: Sprint }) {
  const [opened, setOpened] = useState(false);
  const [editRecord, setEditRecord] = useState<Ticket | null>(null);

  const {
    data: tickets,
    isLoading,
    refetch,
  } = useQuery(['tickets', sprint.id], () => getListTicketsRequest({ sprintId: sprint.id }));

  const newTicketMutation = useMutation((data) => createTicketRequest(data), {
    onMutate: () => {
      setEditRecord(null);
      setOpened(false);
    },
    onSettled: () => {
      refetch();
    },
  });

  const updateTicketMutation = useMutation((data) => updateTicketRequest(data), {
    onMutate: () => {
      setEditRecord(null);
      setOpened(false);
    },
    onSettled: () => {
      refetch();
    },
  });

  const deleteTicketMutation = useMutation((id: string) => deleteTicketRequest(id), {
    onMutate: () => {
      setEditRecord(null);
      setOpened(false);
    },
    onSettled: () => {
      refetch();
    },
  });

  const saveTicket = (data) => {
    if (data.id) {
      updateTicketMutation.mutate(data);
    } else {
      newTicketMutation.mutate({ ...data, sprintId: sprint.id });
    }
  };

  const saving =
    newTicketMutation.isLoading || updateTicketMutation.isLoading || deleteTicketMutation.isLoading;

  return (
    <>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title={editRecord ? 'Edit Ticket' : 'New Ticket'}
        padding="xl"
        size="xl"
        position="right"
      >
        <TicketForm
          ticket={editRecord}
          onSubmit={saveTicket}
          onDelete={(t) => deleteTicketMutation.mutate(t.id)}
        />
      </Drawer>

      <Stack py="lg">
        <Group>
          <Button
            onClick={() => {
              setEditRecord(null);
              setOpened(true);
            }}
            loading={saving}
          >
            New Ticket
          </Button>
        </Group>

        {isLoading && <SprintSkeleton />}

        {tickets?.map((t) => (
          <TicketItem
            key={t.id}
            ticket={t}
            onEdit={() => {
              setEditRecord(t);
              setOpened(true);
            }}
          />
        ))}
      </Stack>
    </>
  );
}
