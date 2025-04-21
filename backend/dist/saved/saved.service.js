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
exports.SavedService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const saved_job_entity_1 = require("./saved-job.entity");
const saved_project_entity_1 = require("./saved-project.entity");
let SavedService = class SavedService {
    constructor(savedJobRepo, savedProjectRepo) {
        this.savedJobRepo = savedJobRepo;
        this.savedProjectRepo = savedProjectRepo;
    }
    async saveJob(data) {
        const newSaved = this.savedJobRepo.create(data);
        return this.savedJobRepo.save(newSaved);
    }
    async saveProject(data) {
        const newSaved = this.savedProjectRepo.create(data);
        return this.savedProjectRepo.save(newSaved);
    }
    async getSavedJobsByTalent(talentId) {
        if (!talentId || isNaN(talentId))
            throw new common_1.UnauthorizedException();
        return this.savedJobRepo.find({
            where: { talentId },
            relations: ['job'],
        });
    }
    async getSavedProjectsByClient(clientId) {
        if (!clientId || isNaN(clientId)) {
            console.warn('❌ Invalid or missing clientId:', clientId);
            throw new common_1.UnauthorizedException();
        }
        try {
            console.log('✅ Fetching saved projects for clientId:', clientId);
            const saved = await this.savedProjectRepo.find({
                where: { clientId },
                relations: ['project'],
            });
            console.log('✅ Found saved projects:', saved.length);
            return saved;
        }
        catch (error) {
            console.error('❌ Error fetching saved projects:', error);
            throw error;
        }
    }
    async removeSavedJob(id) {
        return this.savedJobRepo.delete(id);
    }
    async removeSavedProject(id) {
        return this.savedProjectRepo.delete(id);
    }
    async findByClientId(clientId) {
        return this.getSavedProjectsByClient(clientId);
    }
};
exports.SavedService = SavedService;
exports.SavedService = SavedService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(saved_job_entity_1.SavedJob)),
    __param(1, (0, typeorm_1.InjectRepository)(saved_project_entity_1.SavedProject)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SavedService);
//# sourceMappingURL=saved.service.js.map