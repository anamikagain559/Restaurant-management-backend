"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const validateRequest = (zodSchema) => async (req, res, next) => {
    try {
        // Parse the entire request object (with body, params, query)
        const parsed = await zodSchema.parseAsync({
            body: req.body,
            params: req.params,
            query: req.query,
        });
        // Update request with validated data
        req.body = parsed.body;
        if (parsed.params)
            req.params = parsed.params;
        if (parsed.query)
            req.query = parsed.query;
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.validateRequest = validateRequest;
