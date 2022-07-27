import StyledInput from 'components/Input/StyledInput';
import { Box, Group, Loader, Select } from '@mantine/core';
import { forwardRef, useEffect, useState } from 'react';

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  epicId: string;
  label: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ label, epicId, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Box>{label}</Box>
      </Group>
    </div>
  )
);

// TODO: Make epic storable
export default function EpicAutocomplete({
  defaultValue,
  onChange,
}: {
  defaultValue: string;
  onChange: (epic: string) => void;
}) {
  const [value, setValue] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!!defaultValue && defaultValue !== value) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    if (value !== defaultValue) {
      onChange(value);
    }
  }, [value]);

  const loading = false;

  return (
    <>
      <StyledInput
        label="Epic"
        component={Select}
        value={value}
        onChange={setValue}
        data={data}
        itemComponent={SelectItem}
        nothingFound="Nothing Found"
        rightSection={loading ? <Loader size={16} /> : null}
        searchable
        creatable
        getCreateLabel={(query) => `+ Create ${query}`}
        onCreate={(query) => {
          const item = { value: query, label: query, epicId: query };
          setData((current) => [...current, item]);
          return item;
        }}
      />
    </>
  );
}
