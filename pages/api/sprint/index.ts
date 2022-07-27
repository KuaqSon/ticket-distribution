import prisma from 'lib/prisma';
import { getSession } from 'next-auth/react';

export default async function handle(req, res) {
  const { name, startAt, endAt, note, hourPerPoint, formula } = req.body;

  const session = await getSession({ req });

  if (!session) {
    res.statusCode = 403;
    return res.json(null);
  }

  if (req.method === 'GET') {
    const result = await prisma.sprint.findMany({
      where: {
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
    const result = await prisma.sprint.create({
      data: {
        name,
        startAt,
        endAt,
        note,
        hourPerPoint,
        formula,
        user: { connect: { email: session?.user?.email } },
      },
    });
    return res.json(result);
  }

  return res.status(405).json({ msg: 'Method not implemented' });
}
