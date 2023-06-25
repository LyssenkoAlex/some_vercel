"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup_1 = require("yup");
const CategorySchema = (0, yup_1.object)({
    category_name: (0, yup_1.string)().required('Name of category is required').max(55),
    category_description: (0, yup_1.string)(),
    create_date: (0, yup_1.date)()
});
exports.default = CategorySchema;
//# sourceMappingURL=category.models.js.map