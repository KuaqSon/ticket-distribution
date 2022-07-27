import prisma from 'lib/prisma';

export default async function handle(req, res) {
  const sprintId = req.query.id;
  const { name, startAt, endAt, note, hourPerPoint, formula } = req.body;

  if (req.method === 'DELETE') {
    const post = await prisma.sprint.delete({
      where: { id: sprintId },
    });
    return res.json(post);
  }

  if (req.method === 'PUT') {
    const updateRecord = await prisma.sprint.update({
      where: { id: sprintId },
      data: {
        name,
        startAt,
        endAt,
        note,
        hourPerPoint,
        formula,
      },
    });
    return res.json(updateRecord);
  }

  return res.status(405).json({ msg: 'Method not implemented' });
}
