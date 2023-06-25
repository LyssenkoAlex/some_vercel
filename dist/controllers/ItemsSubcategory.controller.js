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
const controller = express_1.default.Router();
controller.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subcategory = yield db_1.default.query(`select * from items_subcategories`);
        res.setHeader('Access-Control-Allow-Credentials', "true");
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).send(subcategory.rows);
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
}));
controller.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subcategoryId = req.params.id;
        const subcategory = yield db_1.default.query(`SELECT * FROM items_subcategories WHERE id = $1`, [subcategoryId]);
        if (subcategory.rows.length === 0) {
            return res.status(404).send({ error: 'Subcategory not found' });
        }
        res.status(200).send(subcategory.rows[0]);
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
}));
exports.default = controller;
//# sourceMappingURL=ItemsSubcategory.controller.js.map