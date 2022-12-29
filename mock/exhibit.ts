// @ts-ignore
import { Request, Response } from 'express';

let exhibits = require('./data/exhibits.json');

export default {
  'GET /api/exhibit': (req: Request, res: Response) => {
    res.status(200).send({
      success: true,
      data: {
        list: exhibits,
        current: 1,
        pageSize: 20,
        total: exhibits.length,
      },
      code: '200',
      message: '场许领理风表车按复济情政转领斯。',
      showType: 28,
    });
  },
  'POST /api/exhibit': (req: Request, res: Response) => {
    let params: any = req.body;

    exhibits.push({
      "id": exhibits.length+1,
      "gmt_create": "",
      "gmt_modified": "",
      "name": params.name,
      "main_image": params.main_image,
      "form": params.form,
      "on_stage": params.on_stage,
      "off_stage": params.off_stage,
      "pos": params.pos,
      "upload_stage": params.upload_stage,
      "type":params.type,
      "major": params.major,
      "cate": params.cate,
      "profile": params.profile,
      "state": params.state,
      "upload_state": params.upload_state
    })

    res.status(200).send({
      success: true,
      data: {},
      code: '',
      message: '每委持提内南然应采术斯达满经人。',
      showType: 29,
    });
  },
  'PUT /api/exhibit': (req: Request, res: Response) => {
    let params: any = req.body;
    const id = params.id
    
    for (var i = 0; i < exhibits.length; i++) {
      if (exhibits[i].id == id) {
        exhibits[id-1] = params
      }  
    }

    res.status(200).send({
      success: true,
      data: {},
      code: '知报去流许料除得府志热可团此式队指易。',
      message: '派无次取打听声代所商断该。',
      showType: 30,
    });
  },
  'GET /api/exhibit/:id': (req: Request, res: Response) => {
    res.status(200).send({
      success: true,
      data: {
        id: 74,
        gmt_create: 81,
        gmt_modified: 83,
        name: '阎娜',
        form: '消张元这十收标际示合海目制划金。',
        on_stage: '她山置究声提四对置观验五度共但通过。',
        off_stage: '示精新商拉分取元中历理体水。',
        pos: '难住点装院量流市铁角即包济整电最采毛。',
        upload_stage: '连式就值真论指说积毛格然向别劳识知。',
        type: 31,
        major: '林青统斗打建打管高资件须口难五据七已。',
        cate: '运素由活派只量地深战议第但都导存同准。',
        main_image: 'https://ant.design',
        profile: '产东想每为龙广京基据太到原百决过党。',
        state: 63,
        upload_state: 89,
      },
      code: '将科题须温王教处信金运书办细。',
      message: '事为战达收深口容际员对低断精。',
      showType: 32,
    });
  },
  'DELETE /api/exhibit/:id': (req: Request, res: Response) => {
    const id = req.params.id
    for (var i = 0; i < exhibits.length; i++) {
      if (exhibits[i].id == id) {
        exhibits.splice(i, 1); // 将使后面的元素依次前移，数组长度减1
        i--; // 如果不减，将漏掉一个元素
      }  
    }
    res.status(200).send({
      success: true,
      data: {},
      code: '效得称程共体业过学重状候到须。',
      message: '华二取从商你整阶清花志县位边始两有整。',
      showType: 33,
    });
  },
};
