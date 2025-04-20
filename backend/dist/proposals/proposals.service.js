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
exports.ProposalsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const proposal_entity_1 = require("./proposal.entity");
let ProposalsService = class ProposalsService {
    constructor(proposalRepo) {
        this.proposalRepo = proposalRepo;
    }
    create(data) {
        const proposal = this.proposalRepo.create(data);
        return this.proposalRepo.save(proposal);
    }
    findAll() {
        return this.proposalRepo.find();
    }
    findByClient(clientId) {
        return this.proposalRepo.find({ where: { clientId } });
    }
    findByTalent(talentId) {
        return this.proposalRepo.find({ where: { talentId } });
    }
    updateStatus(id, status) {
        return this.proposalRepo.update(id, { status });
    }
    delete(id) {
        return this.proposalRepo.delete(id);
    }
};
exports.ProposalsService = ProposalsService;
exports.ProposalsService = ProposalsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(proposal_entity_1.Proposal)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProposalsService);
//# sourceMappingURL=proposals.service.js.map