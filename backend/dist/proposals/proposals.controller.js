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
exports.ProposalsController = void 0;
const common_1 = require("@nestjs/common");
const proposals_service_1 = require("./proposals.service");
const create_proposal_dto_1 = require("./dto/create-proposal.dto");
const auth_guard_1 = require("../auth/auth.guard");
let ProposalsController = class ProposalsController {
    constructor(proposalsService) {
        this.proposalsService = proposalsService;
    }
    create(req, dto) {
        return this.proposalsService.create(Object.assign(Object.assign({}, dto), { talentId: req.user.id }));
    }
    findAll() {
        return this.proposalsService.findAll();
    }
    findByClient(clientId) {
        return this.proposalsService.findByClient(clientId);
    }
    findByTalent(talentId) {
        return this.proposalsService.findByTalent(talentId);
    }
    updateStatus(id, status) {
        return this.proposalsService.updateStatus(id, status);
    }
    delete(id) {
        return this.proposalsService.delete(id);
    }
    async getTalentsForClient(clientId) {
        const proposals = await this.proposalsService.findByClient(clientId);
        const uniqueTalentsMap = new Map();
        for (const proposal of proposals) {
            if (!uniqueTalentsMap.has(proposal.talentId)) {
                uniqueTalentsMap.set(proposal.talentId, {
                    talentId: proposal.talentId,
                    name: proposal.talentName || `Talent #${proposal.talentId}`,
                });
            }
        }
        return Array.from(uniqueTalentsMap.values());
    }
};
exports.ProposalsController = ProposalsController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_proposal_dto_1.CreateProposalDto]),
    __metadata("design:returntype", void 0)
], ProposalsController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProposalsController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('client/:clientId'),
    __param(0, (0, common_1.Param)('clientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProposalsController.prototype, "findByClient", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('talent/:talentId'),
    __param(0, (0, common_1.Param)('talentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProposalsController.prototype, "findByTalent", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], ProposalsController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProposalsController.prototype, "delete", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('clients/:clientId/talents'),
    __param(0, (0, common_1.Param)('clientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProposalsController.prototype, "getTalentsForClient", null);
exports.ProposalsController = ProposalsController = __decorate([
    (0, common_1.Controller)('proposals'),
    __metadata("design:paramtypes", [proposals_service_1.ProposalsService])
], ProposalsController);
//# sourceMappingURL=proposals.controller.js.map