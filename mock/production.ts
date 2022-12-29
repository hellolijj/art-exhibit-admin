// @ts-ignore
import { Request, Response } from 'express';

let productions = require('./data/productions.json');

export default {
    'GET /api/production': (req: Request, res: Response) => {
        res.status(200).send({
            success: true,
            data: {
                list: productions,
                current: 1,
                pageSize: 20,
                total: productions.length,

            },
            code: '你直主难受门根角千为结备式地开。',
            message: '她公队准林县实明林从确拉意江。',
            showType: 77,
        });
    },
    'DELETE /api/production/:id': (req: Request, res: Response) => {
        const id = req.params.id

        for (var i = 0; i < productions.length; i++) {
            if (productions[i].id == id) {
                productions.splice(i, 1); // 将使后面的元素依次前移，数组长度减1
                i--; // 如果不减，将漏掉一个元素
            }
        }

        res.status(200).send({
            success: true,
            data: {},
            code: '几段细小群党音加就看号认无学今持实。',
            message: '影发主水形出存本过据党住形。',
            showType: 81,
        });
    },
    'POST /api/production': (req: Request, res: Response) => {
        let params: any = req.body;
        productions.push({
            id: productions.length + 1,
            name: params.name,
            exhibit: params.exhibit,
            type: params.type,
            main_image: params.main_image,
            profile: params.profile,
            content: params.content,
            authors: params.authors,
        })
        res.status(200).send({
            success: true,
            data: {},
            code: '支间约各代它济了什造二小产几开目回。',
            message: '定手多七出或报组增即到者高质构把象。',
            showType: 78,
        });
    },
    'PUT /api/production': (req: Request, res: Response) => {
        let params: any = req.body;
        const id = params.id
        
        for (var i = 0; i < productions.length; i++) {
        if (productions[i].id == id) {
            productions[id-1] = params
        }  
        }

        res.status(200).send({
          success: true,
          data: {},
          code: '己采年道克切军团上参到温商根月。',
          message: '许还图民信革达及状体具速四矿铁自劳。',
          showType: 103,
        });
      },
};
