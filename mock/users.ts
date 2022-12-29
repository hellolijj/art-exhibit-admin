// @ts-ignore
import { Request, Response } from 'express';

let users = require('./data/users.json');

export default {
  'POST /api/user': (req: Request, res: Response) => {
    let params: any = req.body;

    users.push({
      id: users.length+1,
      "gmt_create": "",
      "gmt_modified": "",
      "name": params.name,
      "username": params.username,
      "tel": params.tel,
      "email": params.email,
      "role": params.role,
      "password": params.password,
    })

    res.status(200).send({
      success: true,
      data: {},
      code: '即型自当向事积动然形济建东。',
      message: '住声复事红权声备土快技联。',
      showType: 7,
    });
  },
  'GET /api/user': (req: Request, res: Response) => {
    res.status(200).send({
      success: true,
      data: {
        list: users,
        current: 1,
        pageSize: 20,
        total: users.length,
      },
      code: '容风必技马较次各本自回压却。',
      message: '所时关将五委想相打打特又何族。',
      showType: 8,
    });
  },
  'GET /api/user/:uid': (req: Request, res: Response) => {
    res.status(200).send({
      success: false,
      data: {
        id: 68,
        gmt_create: '音马证正那办农江委员会历。',
        gmt_modified: '业维领来拉统济消质战市决加率。',
        username: 'Jones',
        role: 81,
        password: 'string(16)',
        name: '吴丽',
        tel: '维成在步义金认义中律比位国关人么龙。',
        email: 'd.sge@sbnpkxd.travel',
        is_del: 93,
      },
      code: '农集元通难为她行最先办公。',
      message: '入能进气研又合提始织品运东理马精现。',
      showType: 9,
    });
  },
  'DELETE /api/user/:id': (req: Request, res: Response) => {
    const id = req.params.id
    
    for (var i = 0; i < users.length; i++) {
      if (users[i].id == id) {
        users.splice(i, 1); // 将使后面的元素依次前移，数组长度减1
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
  'PUT /api/user': (req: Request, res: Response) => {
    let params: any = req.body;
    const id = params.id
    
    for (var i = 0; i < users.length; i++) {
      if (users[i].id == id) {
        users[id-1] = params
      }  
    }
    res.status(200).send({
      success: true,
      data: {},
      code: '被工事先省四支热代厂极运局他际。',
      message: '影队地个整究回年三商很省。',
      showType: 9,
    });
  },
};
