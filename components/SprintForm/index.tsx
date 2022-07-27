import { Button, Group, NumberInput, Stack, Textarea } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/hooks';
import { Sprint } from '@prisma/client';
import StyledInput from 'components/Input/StyledInput';
import moment from 'moment';
import { DEFAULT_SPRINT_FORMULA } from 'utils/constants';

const DEFAULT_SPRINT = {
  name: 'Sprint ',
  note: '',
  startAt: moment().toDate(),
  endAt: moment().add(7, 'days').toDate(),
  hourPerPoint: 4,
  formula: JSON.stringify(DEFAULT_SPRINT_FORMULA),
};

export default function SprintForm({
  sprint,
  loading = false,
  onSubmit,
  onDelete,
}: {
  sprint?: Sprint;
  loading?: boolean;
  onSubmit: (s: Sprint) => void;
  onDelete: (s: Sprint) => void;
}): JSX.Element {
  const form = useForm({
    initialValues: sprint
      ? { ...sprint, formula: JSON.stringify(sprint?.formula) }
      : DEFAULT_SPRINT,
  });

  return (
    <>
      <form
        onSubmit={form.onSubmit((values) =>
          onSubmit({ ...values, formula: JSON.parse(values.formula) } as Sprint)
        )}
      >
        <Stack>
          <StyledInput required label="Name" {...form.getInputProps('name')} disabled={loading} />

          <StyledInput
            required
            label="Start Date"
            component={DatePicker}
            {...form.getInputProps('startAt')}
            value={
              moment(form.values.startAt).isValid() ? moment(form.values.startAt).toDate() : null
            }
            disabled={loading}
            clearable
          />
          <StyledInput
            required
            label="End Date"
            component={DatePicker}
            {...form.getInputProps('endAt')}
            value={moment(form.values.endAt).isValid() ? moment(form.values.endAt).toDate() : null}
            disabled={loading}
            clearable
          />

          <StyledInput
            required
            label="Hour Per Point"
            component={NumberInput}
            step={0.001}
            min={0}
            precision={3}
            {...form.getInputProps('hourPerPoint')}
            disabled={loading}
          />

          <StyledInput
            required
            label="Formula"
            component={Textarea}
            {...form.getInputProps('formula')}
            disabled={loading}
          />

          <StyledInput
            label="Note"
            component={Textarea}
            {...form.getInputProps('note')}
            disabled={loading}
          />

          <Group grow>
            <Button type="submit" loading={loading}>
              Submit
            </Button>
            {sprint && sprint.id && (
              <Button
                variant="light"
                color="red"
                loading={loading}
                onClick={() => onDelete(sprint)}
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
