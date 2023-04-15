import { Request, Response, Router } from 'express';
import ProductsService from '../services/products.service';

const router = Router ();



router.get ('/', async (req: Request, res: Response) => {
    const products = await ProductsService.getAll();
    res.send(products);
});

router.get ('/:id', async (req: Request, res: Response) => {
    const product = await ProductsService.getByID(parseInt(req.params.id));
    if(!product) return  res.status(400).send({ message: "Produto não encontrado!" });
    res.status(200).send(product);
});

router.post ('/', async (req: Request, res: Response) => {
    if (req.body.quantity < 1){
        return res.status(400).send({message: 'Produto Indisponível'});
    }
    await ProductsService.create(req.body);
    res.status(201).send({message: 'Produto Criado com Sucesso!'});
});

router.delete('/remove/:id', async (req: Request, res: Response) => {
    try {
        await ProductsService.remove(parseInt(req.params.id));
        res.status(200).send({ message: "Produto excluído com sucesso!" });
    } catch (error: any) {
        res.status(400).send({ message: error.message });
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    try {
        await ProductsService.update(parseInt(req.params.id), req.body);
        res.status(200).send({ message: "Produto atualizado com sucesso!" });
    } catch (error: any) {
        res.status(400).send({ message: error.message });
    }

});

export default router;