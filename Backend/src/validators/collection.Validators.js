import { body } from "express-validator";

const createCollectionValidator = () => {
    return [
        body("name")
            .trim()
            .notEmpty().withMessage("Collection name is required")
            .isString().withMessage("name must be a string")
            .isLength({ max: 50 })
            .withMessage("Collection name cannot be more than 50 characters"),

        body("description")
            .optional()
            .trim()
            .isString().withMessage("description must be a string")
            .isLength({ max: 100 })
            .withMessage("Description cannot be more than 100 characters"),

        body("isPrivate")
            .optional()
            .isBoolean()
            .withMessage("isPrivate must be a boolean value (true or false)")
    ];
};

export { createCollectionValidator };