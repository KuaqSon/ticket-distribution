import prisma from 'lib/prisma';
import { getSession } from 'next-auth/react';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { name, sprintId } = req.body;

  const session = await getSession({ req });
  const result = await prisma.ticket.create({
    data: {
      name,
      sprint: { connect: { id: sprintId } },
      user: { connect: { email: session?.user?.email } },
    },
  });
  res.json(result);
}
