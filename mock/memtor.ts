// @ts-ignore
import { Request, Response } from 'express';

let memtors = require('./data/memtors.json');

export default {
  'GET /api/memtor/:id': (req: Request, res: Response) => {
    res.status(200).send({
      success: true,
      data: memtors[0],
      code: '2',
      message: '支我任两心相有团型分性务离查半。',
      showType: 1,
    });
  },
  'DELETE /api/memtor/:id': (req: Request, res: Response) => {
    const id = req.params.id
    
    for (var i = 0; i < memtors.length; i++) {
      if (memtors[i].id == id) {
        memtors.splice(i, 1); // 将使后面的元素依次前移，数组长度减1
        i--; // 如果不减，将漏掉一个元素
      }  
    }

    res.status(200).send({
      success: true,
      data: {},
      code: '',
      message: '',
      showType: 2,
    });
  },

  'POST /api/memtor': (req: Request, res: Response) => {    
    let params: any = req.body;

 
    memtors.push({
      id: memtors.length+1,
      "gmt_create": "",
      "gmt_modified": "",
      "name": params.name,
      "wid": params.wid,
      "tel": params.tel,
      "email": params.email,
      "major": params.major,
      "avatar": params.avatar,
      "profile": params.profile,
    })

    res.status(200).send({
      success: true,
      data: {},
      errorCode: 3,
      errorMessage: '添加成功',
      showType: 91,
    });
  },

  'GET /api/memtor': (req: Request, res: Response) => {
    res.status(200).send({
      success: true,
      data: {
        list: memtors,
        current: 1,
        pageSize: 20,
        total: memtors.length,
      },
      code: '2',
      message: '会才得打北才北造事严层打千你全老。',
      showType: 4,
    });
  },
  'PUT /api/memtor': (req: Request, res: Response) => {
    let params: any = req.body;
    const id = params.id
    
    for (var i = 0; i < memtors.length; i++) {
      if (memtors[i].id == id) {
        memtors[id-1] = params
      }  
    }

    res.status(200).send({
      success: true,
      data: {},
      code: '',
      message: '',
      showType: 5,
    });
  },
};
