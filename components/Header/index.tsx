import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import MainLogo from 'components/MainLogo';

import {
  createStyles,
  Header as MaintineHeader,
  Menu,
  Group,
  Burger,
  Container,
  Box,
  Button,
  Loader,
  Anchor,
} from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
import { Session } from 'next-auth';

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor: theme.colors[theme.primaryColor][6],
    borderBottom: 0,
  },

  inner: {
    height: 56,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.white,
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 7 : 5],
    },
  },

  linkLabel: {
    marginRight: 5,
  },
}));

const AuthorizedMenus = ({ session }: { session: Session }) => (
  <>
    <Box sx={{ color: '#ffffff' }}>
      <Box sx={{ fontWeight: 'bold', fontSize: '14px' }}>{session.user.name}</Box>
      {/* <Box sx={{ fontSize: '10px' }}>{session.user.email}</Box> */}
    </Box>
    <Box>
      <Button onClick={() => signOut()}>Log Out</Button>
    </Box>
  </>
);

const UnAuthorizedMenus = () => (
  <Box>
    <Link href="/api/auth/signin">
      <Button>Log in</Button>
    </Link>
  </Box>
);

export default function Header() {
  const [opened, toggleOpened] = useBooleanToggle(false);
  const { classes } = useStyles();

  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) => router.pathname === pathname;
  const { data: session, status } = useSession();

  const loading = status === 'loading';

  return (
    <MaintineHeader height={56} className={classes.header}>
      <Box className={classes.inner}>
        <Link href="/">
          <Anchor underline={false}>
            <MainLogo />
          </Anchor>
        </Link>

        <Group spacing={5} className={classes.links}>
          {loading ? (
            <Loader />
          ) : session ? (
            <AuthorizedMenus session={session} />
          ) : (
            <UnAuthorizedMenus />
          )}
        </Group>
        <Burger
          opened={opened}
          onClick={() => toggleOpened()}
          className={classes.burger}
          size="sm"
          color="#fff"
        />
      </Box>
    </MaintineHeader>
  );
}

export function HeaderBk() {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) => router.pathname === pathname;

  const { data: session, status } = useSession();

  let left = (
    <div className="left">
      <Link href="/">
        <a className="bold" data-active={isActive('/')}>
          Feed
        </a>
      </Link>
      <style jsx>
        {`
          .bold {
            font-weight: bold;
          }

          a {
            text-decoration: none;
            color: var(--geist-foreground);
            display: inline-block;
          }

          .left a[data-active='true'] {
            color: gray;
          }

          a + a {
            margin-left: 1rem;
          }
        `}
      </style>
    </div>
  );

  let right = null;

  if (status === 'loading') {
    left = (
      <div className="left">
        <Link href="/">
          <a className="bold" data-active={isActive('/')}>
            Feed
          </a>
        </Link>
        <style jsx>
          {`
            .bold {
              font-weight: bold;
            }

            a {
              text-decoration: none;
              color: var(--geist-foreground);
              display: inline-block;
            }

            .left a[data-active='true'] {
              color: gray;
            }

            a + a {
              margin-left: 1rem;
            }
          `}
        </style>
      </div>
    );
    right = (
      <div className="right">
        <p>Validating session ...</p>
        <style jsx>
          {`
            .right {
              margin-left: auto;
            }
          `}
        </style>
      </div>
    );
  }

  if (!session) {
    right = (
      <div className="right">
        <Link href="/api/auth/signin">
          <a data-active={isActive('/signup')}>Log in</a>
        </Link>
        <style jsx>
          {`
            a {
              text-decoration: none;
              color: var(--geist-foreground);
              display: inline-block;
            }

            a + a {
              margin-left: 1rem;
            }

            .right {
              margin-left: auto;
            }

            .right a {
              border: 1px solid var(--geist-foreground);
              padding: 0.5rem 1rem;
              border-radius: 3px;
            }
          `}
        </style>
      </div>
    );
  }

  if (session) {
    left = (
      <div className="left">
        <Link href="/">
          <a className="bold" data-active={isActive('/')}>
            Feed
          </a>
        </Link>
        <Link href="/drafts">
          <a data-active={isActive('/drafts')}>My drafts</a>
        </Link>
        <style jsx>
          {`
            .bold {
              font-weight: bold;
            }

            a {
              text-decoration: none;
              color: var(--geist-foreground);
              display: inline-block;
            }

            .left a[data-active='true'] {
              color: gray;
            }

            a + a {
              margin-left: 1rem;
            }
          `}
        </style>
      </div>
    );
    right = (
      <div className="right">
        <p>
          {session.user.name} ({session.user.email})
        </p>
        <Link href="/create">
          <button type="button">New post</button>
        </Link>
        <button onClick={() => signOut()} type="button">
          Log out
        </button>
        <style jsx>
          {`
            a {
              text-decoration: none;
              color: var(--geist-foreground);
              display: inline-block;
            }

            p {
              display: inline-block;
              font-size: 13px;
              padding-right: 1rem;
            }

            a + a {
              margin-left: 1rem;
            }

            .right {
              margin-left: auto;
            }

            .right a {
              border: 1px solid var(--geist-foreground);
              padding: 0.5rem 1rem;
              border-radius: 3px;
            }

            button {
              border: none;
            }
          `}
        </style>
      </div>
    );
  }

  return (
    <nav>
      <MainLogo />
      {left}
      {right}
      <style jsx>
        {`
          nav {
            display: flex;
            padding: 2rem;
            align-items: center;
          }
        `}
      </style>
    </nav>
  );
}
