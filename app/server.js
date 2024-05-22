"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config"));
const app_1 = __importDefault(require("./app"));
function Main() {
    try {
        mongoose_1.default.connect(config_1.default.DATABASE_URL)
            .then(() => {
            console.log('Database Connected...');
        })
            .catch(err => console.log(err));
        app_1.default.listen(config_1.default.PORT, () => {
            console.log(`Example app listening on port ${config_1.default.PORT}`);
        });
    }
    catch (error) {
        console.log(error);
    }
}
Main();
