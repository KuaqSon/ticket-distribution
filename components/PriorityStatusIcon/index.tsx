import { Center } from '@mantine/core';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  DoubleArrowDownIcon,
  DoubleArrowUpIcon,
  LineHeightIcon,
} from '@modulz/radix-icons';

export default function PriorityStatusIcon({ priority, ...props }) {
  let Icon = LineHeightIcon;
  let color = '#82C91E';

  switch (priority) {
    case 1:
      Icon = DoubleArrowDownIcon;
      color = '#5C7CFA';
      break;

    case 2:
      Icon = ChevronDownIcon;
      color = '#339AF0';
      break;

    case 4:
      Icon = ChevronUpIcon;
      color = '#F76707';
      break;

    case 5:
      Icon = DoubleArrowUpIcon;
      color = '#F03E3E';
      break;
  }

  return (
    <Center>
      <Icon {...props} color={color} />
    </Center>
  );
}
