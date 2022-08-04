import { createStyles, Overlay, Container, Title, Button, Text } from '@mantine/core';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
  hero: {
    position: 'relative',
    backgroundImage:
      'url(https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: 'calc(100vh - 56px)',
  },

  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    zIndex: 1,
    position: 'relative',
  },

  title: {
    color: theme.white,
    fontSize: 60,
    fontWeight: 900,
    lineHeight: 1.1,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 40,
      lineHeight: 1.2,
    },

    [theme.fn.smallerThan('xs')]: {
      fontSize: 28,
      lineHeight: 1.3,
    },
  },

  description: {
    color: theme.white,
    maxWidth: 600,

    [theme.fn.smallerThan('sm')]: {
      maxWidth: '100%',
      fontSize: theme.fontSizes.sm,
    },
  },

  control: {
    marginTop: theme.spacing.xl * 1.5,
    marginBottom: theme.spacing.xl * 1.5,

    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
  },
}));

export default function HomeBanner({ user }) {
  const { classes } = useStyles();
  return (
    <>
      <div className={classes.hero}>
        <Overlay
          gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
          opacity={1}
          zIndex={0}
        />
        <Container className={classes.container}>
          <Title className={classes.title}>Tickets Distribution</Title>
          <Text className={classes.description} size="xl" mt="xl">
            Build for support with tickets management, planing, reporting and much more...
          </Text>

          {user && user.email ? (
            <Link href="sprint">
              <Button variant="gradient" size="xl" radius="xl" className={classes.control}>
                ALL SPRINTS
              </Button>
            </Link>
          ) : (
            <Link href="/api/auth/signin">
              <Button variant="gradient" size="xl" radius="xl" className={classes.control}>
                GET STARTED
              </Button>
            </Link>
          )}
        </Container>
      </div>
    </>
  );
}
