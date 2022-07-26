import { createStyles, TextInput } from '@mantine/core';
import React from 'react';

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
  },

  input: {
    height: 'auto',
    paddingTop: 18,
  },

  label: {
    position: 'absolute',
    pointerEvents: 'none',
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: theme.spacing.sm / 2,
    zIndex: 1,
  },
}));

export default function StyledInput({ component = null, ...props }) {
  const { classes } = useStyles();
  const Element = component || TextInput;

  return <Element {...props} classNames={classes} />;
}
