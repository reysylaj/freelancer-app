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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SavedJob = void 0;
const typeorm_1 = require("typeorm");
const jobs_entity_1 = require("../jobs/jobs.entity");
let SavedJob = class SavedJob {
};
exports.SavedJob = SavedJob;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SavedJob.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], SavedJob.prototype, "talentId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], SavedJob.prototype, "jobId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], SavedJob.prototype, "savedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => jobs_entity_1.Job, { eager: true, onDelete: 'CASCADE' }),
    __metadata("design:type", jobs_entity_1.Job)
], SavedJob.prototype, "job", void 0);
exports.SavedJob = SavedJob = __decorate([
    (0, typeorm_1.Entity)()
], SavedJob);
//# sourceMappingURL=saved-job.entity.js.map