// import  prisma  from '@/lib/prisma';

// export default async function handler(req, res) {
//   if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

//   const { linkId, x, y, page, renderedHeight,renderedWidth } = req.body;

//   if (!linkId || x == null || y == null || page == null) {
//     return res.status(400).json({ error: 'Missing data' });
//   }

//   try {
//     const updatedLink = await prisma.link.update({
//       where: { id: linkId },
//       data: {
//         signatureX: x,
//         signatureY: y,
//         signaturePage: page,
//         renderedWidth: renderedWidth,
//         renderedHeight: renderedHeight,
//       },
//     });

//     return res.status(200).json({ success: true, updatedLink });
//   } catch (error) {
//     console.error('Prisma update error:', error);
//     return res.status(500).json({ error: 'Failed to update signature position' });
//   }
// }


import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { linkId, x, y, page, renderedHeight, renderedWidth } = req.body;

  if (!linkId || x == null || y == null || page == null) {
    return res.status(400).json({ error: 'Missing data' });
  }

  try {
    const updatedLink = await prisma.link.update({
      where: { id: linkId },
      data: {
        signatureX: x,
        signatureY: y,
        signaturePage: page,
        renderedWidth,
        renderedHeight,
      },
    });

    return res.status(200).json({ success: true, updatedLink });
  } catch (error) {
    console.error('Prisma update error:', error);
    return res.status(500).json({ error: 'Failed to update signature position' });
  }
}
