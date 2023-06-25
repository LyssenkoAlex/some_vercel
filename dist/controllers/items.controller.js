"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../db/db"));
const item_model_1 = __importDefault(require("../models/item.model"));
const validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const nanoid_1 = require("nanoid");
const controller = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: (req, file, cd) => {
        cd(null, 'uploadPath');
    },
    filename(req, file, cd) {
        cd(null, (0, nanoid_1.nanoid)(5) + path_1.default.extname(file.originalname));
    },
});
const upload = (0, multer_1.default)({ storage });
controller.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = yield db_1.default.query(`
        select
        s.id,
        s.item_name,
        s.item_description,
        ic.category_name,
        isc.subcategory_name,
        s.image_small,
        s.image_large,
        s.create_date,
        u.username
        from items s
        inner join items_categories ic on ic.id = s.id_category
        inner join items_subcategories isc ON isc.id = s.id_subcategory
        inner join users u on u.id = s.id_user`);
        res.setHeader('Access-Control-Allow-Credentials', "true");
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).send(item.rows);
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
}));
controller.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const item = yield db_1.default.query(`
    select
    s.id,
    s.item_name,
    s.item_description,
    s.id_category,
    s.id_subcategory,
    s.image_small,
    s.image_large,
    s.create_date,
    u.username
    from items s

    inner join users u on u.id = s.id_user
    where s.id = $1`, [id]);
        if (!item.rows.length) {
            return res.status(404).send({ error: "Item not found" });
        }
        res.status(200).send(item.rows);
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
}));
controller.post("/", upload.single('image'), (0, validateRequest_1.default)(item_model_1.default), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { item_name, item_description, id_category, id_subcategory, image_small, image_large, id_user } = req.body;
        const create_date = new Date().toISOString();
        const newItem = yield db_1.default.query(`INSERT INTO items (
                item_name,
                item_description,
                id_category,
                id_subcategory,
                image_small, 
                image_large, 
                create_date,
                id_user ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`, [
            item_name,
            item_description,
            id_category,
            id_subcategory,
            image_small,
            image_large,
            create_date,
            id_user
        ]);
        res.status(200).send(newItem.rows);
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
}));
controller.put("/:id", (0, validateRequest_1.default)(item_model_1.default), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { item_name, item_description, id_category, id_subcategory, image_small, image_large, id_user } = req.body;
        const item = yield db_1.default.query("SELECT * FROM items WHERE id = $1", [id]);
        if (!item.rows.length) {
            return res.status(400).send({ error: "Item not found" });
        }
        const updatedItem = yield db_1.default.query(`UPDATE items SET 
                item_name = $1, 
                item_description = $2, 
                id_category = $3, 
                id_subcategory = $4,
                image_small = $5, 
                image_large = $6, 
                id_user = $7
                WHERE id = $8
                RETURNING *`, [
            item_name,
            item_description,
            id_category,
            id_subcategory,
            image_small,
            image_large,
            id_user,
            id
        ]);
        res.status(200).send(updatedItem.rows);
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
}));
controller.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const item = yield db_1.default.query("SELECT * FROM items WHERE id = $1", [id]);
        if (!item.rows.length) {
            return res.status(400).send({ error: "Item not found" });
        }
        yield db_1.default.query("DELETE FROM items WHERE id= $1", [id]);
        res.status(200).send({ message: "Item deleted successfully" });
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
}));
exports.default = controller;
//# sourceMappingURL=items.controller.js.map