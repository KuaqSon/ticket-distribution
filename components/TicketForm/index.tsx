import { Button, Group, NumberInput, Select, Stack } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { Ticket } from '@prisma/client';
import StyledInput from 'components/Input/StyledInput';
import { TICKET_PRIORITY, TICKET_STATUS } from 'utils/constants';
import { objectToOptions } from 'utils/helper';

const DEFAULT_TICKET = {
  name: '',
  priority: 3,
  storyPoint: 1,
  status: 'todo',
  epic: '',
};

const ticketStatusOptions = objectToOptions(TICKET_STATUS).map(({ label, value }) => ({
  label: label.split('_').join(' '),
  value,
}));
const ticketPriorityOptions = objectToOptions(TICKET_PRIORITY).map(({ label, value }) => ({
  label,
  value: `${value}`,
}));

export default function TicketForm({
  ticket,
  loading = false,
  onSubmit,
  onDelete,
}: {
  ticket?: Ticket;
  loading?: boolean;
  onSubmit: (t: Ticket) => void;
  onDelete: (t: Ticket) => void;
}): JSX.Element {
  const form = useForm({
    initialValues: ticket || DEFAULT_TICKET,
  });

  return (
    <>
      <form
        onSubmit={form.onSubmit((values) =>
          onSubmit({ ...values, priority: +values.priority } as Ticket)
        )}
      >
        <Stack>
          <StyledInput required label="Name" {...form.getInputProps('name')} disabled={loading} />

          <StyledInput
            required
            label="Priority"
            component={Select}
            data={ticketPriorityOptions}
            {...form.getInputProps('priority')}
            disabled={loading}
            value={`${form.values.priority}`}
          />

          <StyledInput
            required
            label="Story Point"
            component={NumberInput}
            step={0.001}
            min={0}
            precision={3}
            {...form.getInputProps('storyPoint')}
            disabled={loading}
          />

          <StyledInput
            required
            label="Status"
            component={Select}
            data={ticketStatusOptions}
            {...form.getInputProps('status')}
            disabled={loading}
          />

          <StyledInput label="Epic" {...form.getInputProps('epic')} disabled={loading} />

          {/* <EpicAutocomplete
            defaultValue={form.values.epic}
            onChange={(epic) => form.setFieldValue('epic', epic)}
          /> */}

          <Group grow>
            <Button type="submit" loading={loading}>
              Submit
            </Button>
            {ticket && ticket.id && (
              <Button
                variant="light"
                color="red"
                loading={loading}
                onClick={() => onDelete(ticket)}
              >
                Delete
              </Button>
            )}
          </Group>
        </Stack>
      </form>
    </>
  );
}
