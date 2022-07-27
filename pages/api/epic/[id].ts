import prisma from 'lib/prisma';

export default async function handle(req, res) {
  const epicId = req.query.id;

  if (req.method === 'DELETE') {
    const post = await prisma.epic.delete({
      where: { id: epicId },
    });
    return res.json(post);
  }

  if (req.method === 'PUT') {
    const { name } = req.body;
    const updateRecord = await prisma.epic.update({
      where: { id: epicId },
      data: {
        name,
      },
    });
    return res.json(updateRecord);
  }

  return res.status(405).json({ msg: 'Method not implemented' });
}
