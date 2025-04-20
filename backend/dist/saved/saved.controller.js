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
let SavedController = class SavedController {
    constructor(savedService) {
        this.savedService = savedService;
    }
    create(data) {
        return this.savedService.create(data);
    }
    findAll() {
        return this.savedService.findAll();
    }
    findByTalentId(talentId) {
        return this.savedService.findByTalentId(Number(talentId));
    }
    remove(id) {
        return this.savedService.remove(Number(id));
    }
};
exports.SavedController = SavedController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SavedController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SavedController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('talent/:talentId'),
    __param(0, (0, common_1.Param)('talentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SavedController.prototype, "findByTalentId", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SavedController.prototype, "remove", null);
exports.SavedController = SavedController = __decorate([
    (0, common_1.Controller)('saved'),
    __metadata("design:paramtypes", [saved_service_1.SavedService])
], SavedController);
//# sourceMappingURL=saved.controller.js.map