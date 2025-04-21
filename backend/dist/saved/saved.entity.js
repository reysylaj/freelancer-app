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
exports.Saved = void 0;
const typeorm_1 = require("typeorm");
const jobs_entity_1 = require("../jobs/jobs.entity");
const projects_entity_1 = require("../projects/projects.entity");
const user_entity_1 = require("../users/user.entity");
let Saved = class Saved {
};
exports.Saved = Saved;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Saved.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Saved.prototype, "jobId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Saved.prototype, "projectId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Saved.prototype, "talentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Saved.prototype, "clientId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Saved.prototype, "savedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => jobs_entity_1.Job, { nullable: true, eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'jobId' }),
    __metadata("design:type", jobs_entity_1.Job)
], Saved.prototype, "job", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => projects_entity_1.Project, { nullable: true, eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'projectId' }),
    __metadata("design:type", projects_entity_1.Project)
], Saved.prototype, "project", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'clientId' }),
    __metadata("design:type", user_entity_1.User)
], Saved.prototype, "client", void 0);
exports.Saved = Saved = __decorate([
    (0, typeorm_1.Entity)()
], Saved);
//# sourceMappingURL=saved.entity.js.map