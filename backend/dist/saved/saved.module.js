"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SavedModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const saved_service_1 = require("./saved.service");
const saved_controller_1 = require("./saved.controller");
const saved_job_entity_1 = require("./saved-job.entity");
const saved_project_entity_1 = require("./saved-project.entity");
const auth_module_1 = require("../auth/auth.module");
const users_module_1 = require("../users/users.module");
let SavedModule = class SavedModule {
};
exports.SavedModule = SavedModule;
exports.SavedModule = SavedModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([saved_job_entity_1.SavedJob, saved_project_entity_1.SavedProject]),
            auth_module_1.AuthModule,
            users_module_1.UsersModule
        ],
        providers: [saved_service_1.SavedService],
        controllers: [saved_controller_1.SavedController],
    })
], SavedModule);
//# sourceMappingURL=saved.module.js.map