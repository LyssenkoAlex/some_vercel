"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup_1 = require("yup");
const ActionsSchema = (0, yup_1.object)({
    operation_type_id: (0, yup_1.number)().required('Operation is required'),
    source_id: (0, yup_1.number)(),
    target_id: (0, yup_1.number)(),
    item_id: (0, yup_1.number)(),
    qty: (0, yup_1.number)(),
    price: (0, yup_1.number)(),
    total_price: (0, yup_1.number)(),
    date: (0, yup_1.date)(),
    update_date: (0, yup_1.date)(),
    user_id: (0, yup_1.number)()
});
exports.default = ActionsSchema;
//# sourceMappingURL=actions.models.js.map