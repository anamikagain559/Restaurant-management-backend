import { NextFunction, Request, Response } from "express"
import { ZodObject } from "zod"

export const validateRequest = (zodSchema: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Parse the entire request object (with body, params, query)
        const parsed = await zodSchema.parseAsync({
            body: req.body,
            params: req.params,
            query: req.query,
        })

        // Update request with validated data
        req.body = parsed.body
        if (parsed.params) req.params = parsed.params
        if (parsed.query) req.query = parsed.query

        next()
    } catch (error) {
        next(error)
    }
}