"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup_1 = require("yup");
const ItemSchema = (0, yup_1.object)({
    item_name: (0, yup_1.string)().required('Name is required').max(55),
    item_description: (0, yup_1.string)(),
    id_category: (0, yup_1.number)().required('Goods category is required'),
    id_subcategory: (0, yup_1.number)().required('Goods subcategory is required'),
    image_small: (0, yup_1.string)(),
    image_large: (0, yup_1.string)(),
    id_user: (0, yup_1.number)().required(),
    create_date: (0, yup_1.date)()
});
exports.default = ItemSchema;
//# sourceMappingURL=item.model.js.map