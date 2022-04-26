import { Router, Response, Request, NextFunction } from "express";

import Controller from "@/utils/interfaces/controller.interface";
import HttpException from "@/utils/exceptions/http.exception";
import errorMiddleware from "@/middleware/error.middleware";
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/post/post.validation';

import PostService from '@/resources/post/post.service'

class PostContoller implements Controller {
    public path = '/posts';
    public router = Router();
    private PostService = new PostService();

    constructor () {
        this.initialiseRoutes()
    }

    private initialiseRoutes(): void{
        this.router.post(
           `${this.path}`, validationMiddleware(validate.create),
           this.create 
        )
    }

    private create = async (
        req: Request, 
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { title, body }  = req.body;
            const post = await this.PostService.create(title, body);
            
            res.status(201).json({post});

        } catch (error) {
            next(new HttpException(400, 'Cannot create Post'))
        }
    } 

}

export default PostContoller;