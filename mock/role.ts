// @ts-ignore
import { Request, Response } from 'express';

let roleList = require('./data/role.json');

export default {
  'PUT /api/role/:name': (req: Request, res: Response) => {
    res.status(200).send({
      success: false,
      data: {},
      code: '总支提称并元系只位证机有样。',
      message: '道连文二往给风习位方验根族已点际使。',
      showType: 75,
    });
  },
  'GET /api/role': (req: Request, res: Response) => {
    res.status(200).send({
      success: true,
      data: {
        list: roleList,
        current: 74,
        pageSize: 74,
        total: roleList.length,
      },
      code: '究积且三部越加复见论线群更议老。',
      message: '百业利东对局认时育节交之部。',
      showType: 92,
    });
  },
};
