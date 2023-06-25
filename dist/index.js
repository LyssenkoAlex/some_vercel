"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ItemsCategory_controller_1 = __importDefault(require("./controllers/ItemsCategory.controller"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
app.use(express_1.default.json());
app.use(express_1.default.static("public"));
app.get('/', (_req, res) => {
    return res.send('Express Typescript on Vercel 5');
});
app.get('/ping', (_req, res) => {
    return res.send('pong 🏓');
});
app.use("/items_category", ItemsCategory_controller_1.default);
app.listen(port, () => {
    return console.log(`Server is listening on ${port}`);
});
//# sourceMappingURL=index.js.map