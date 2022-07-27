import prisma from 'lib/prisma';

export default async function handle(req, res) {
  const ticketId = req.query.id;

  if (req.method === 'DELETE') {
    const post = await prisma.ticket.delete({
      where: { id: ticketId },
    });
    return res.json(post);
  }

  if (req.method === 'PUT') {
    const { name, priority, storyPoint, status, epic } = req.body;
    const updateRecord = await prisma.ticket.update({
      where: { id: ticketId },
      data: {
        name,
        priority,
        storyPoint,
        status,
        epic,
      },
    });
    return res.json(updateRecord);
  }

  return res.status(405).json({ msg: 'Method not implemented' });
}
