import prisma from 'lib/prisma';
import { getSession } from 'next-auth/react';

export default async function handle(req, res) {
  const session = await getSession({ req });

  if (!session) {
    res.statusCode = 403;
    return res.json(null);
  }

  if (req.method === 'GET') {
    const { q } = req.query;
    const result = await prisma.epic.findMany({
      where: {
        name: {
          contains: q,
          mode: 'insensitive',
        },
        user: { email: session.user.email },
      },
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
    });
    return res.json(result);
  }

  if (req.method === 'POST') {
    const { name } = req.body;
    const result = await prisma.epic.create({
      data: {
        name,
        user: { connect: { email: session?.user?.email } },
      },
    });
    return res.json(result);
  }

  return res.status(405).json({ msg: 'Method not implemented' });
}
