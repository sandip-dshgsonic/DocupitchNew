// pages/api/fetchFile.ts
import prisma  from '@/lib/prisma'; // adjust path as needed
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.body;
  console.log('fetch file---111', id)

  if (!id) {
    return res.status(400).json({ error: 'Missing link ID' });
  }

  try {
    const linkWithFile = await prisma.link.findUnique({
      where: { id },
      include: {
        document: {
          select: {
            file: true,
          },
        },
      },
    });

    if (!linkWithFile?.document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    return res.status(200).json({ file: linkWithFile.document.file });
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
