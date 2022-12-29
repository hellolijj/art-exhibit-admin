// @ts-ignore
import { Request, Response } from 'express';

export default {
  'POST /api/upload': (req: Request, res: Response) => {
    res.status(200).send({
      success: true,
      data: { url: 'https://ant.design' },
      code: '最果林工样取议开力己何也他理维能达对。',
      message: '于时证两子或干七学少阶料体东切性极。',
      showType: 45,
    });
  },
};
