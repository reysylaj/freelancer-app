"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SavedController = void 0;
const common_1 = require("@nestjs/common");
const saved_service_1 = require("./saved.service");
const auth_guard_1 = require("../auth/auth.guard");
const save_item_dto_1 = require("./dto/save-item.dto");
const users_service_1 = require("../users/users.service");
let SavedController = class SavedController {
    constructor(savedService, userService) {
        this.savedService = savedService;
        this.userService = userService;
    }
    async saveJob(req, body) {
        return this.savedService.saveJob({
            talentId: req.user.id,
            jobId: body.jobId,
            savedAt: new Date(),
        });
    }
    async saveProject(req, body) {
        return this.savedService.saveProject({
            clientId: req.user.id,
            projectId: body.projectId,
            savedAt: new Date(),
        });
    }
    getSavedJobs(req) {
        return this.savedService.getSavedJobsByTalent(req.user.id);
    }
    getSavedProjects(req) {
        return this.savedService.getSavedProjectsByClient(req.user.id);
    }
    deleteSavedJob(id) {
        return this.savedService.removeSavedJob(Number(id));
    }
    deleteSavedProject(id) {
        return this.savedService.removeSavedProject(Number(id));
    }
    findByClient(req) {
        return this.savedService.findByClientId(req.user.id);
    }
    getUser(id) {
        return this.userService.findById(id);
    }
};
exports.SavedController = SavedController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('job'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, save_item_dto_1.SaveItemDto]),
    __metadata("design:returntype", Promise)
], SavedController.prototype, "saveJob", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('project'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, save_item_dto_1.SaveItemDto]),
    __metadata("design:returntype", Promise)
], SavedController.prototype, "saveProject", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('job'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SavedController.prototype, "getSavedJobs", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('project'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SavedController.prototype, "getSavedProjects", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Delete)('job/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SavedController.prototype, "deleteSavedJob", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Delete)('project/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SavedController.prototype, "deleteSavedProject", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('client'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SavedController.prototype, "findByClient", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SavedController.prototype, "getUser", null);
exports.SavedController = SavedController = __decorate([
    (0, common_1.Controller)('saved'),
    __metadata("design:paramtypes", [saved_service_1.SavedService,
        users_service_1.UsersService])
], SavedController);
//# sourceMappingURL=saved.controller.js.map