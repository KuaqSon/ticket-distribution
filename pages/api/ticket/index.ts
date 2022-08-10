import prisma from 'lib/prisma';
import { getSession } from 'next-auth/react';

export default async function handle(req, res) {
  const session = await getSession({ req });

  if (!session) {
    res.statusCode = 403;
    return res.json(null);
  }

  if (req.method === 'GET') {
    const { sprintId } = req.query;
    if (!sprintId) {
      return [];
    }

    const result = await prisma.ticket.findMany({
      where: {
        user: { email: session.user.email },
        sprint: { id: sprintId },
      },
      orderBy: [
        {
          orderNumber: 'desc',
        },
        {
          priority: 'desc',
        },
        {
          storyPoint: 'asc',
        },
        {
          createdAt: 'desc',
        },
      ],
    });
    return res.json(result);
  }

  if (req.method === 'POST') {
    const { name, priority, storyPoint, status, epic, sprintId, orderNumber } = req.body;
    const result = await prisma.ticket.create({
      data: {
        name,
        priority,
        storyPoint,
        status,
        epic,
        orderNumber,
        sprint: { connect: { id: sprintId } },
        user: { connect: { email: session?.user?.email } },
      },
    });
    return res.json(result);
  }

  return res.status(405).json({ msg: 'Method not implemented' });
}
