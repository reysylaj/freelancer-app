import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Saved } from './saved.entity';

@Injectable()
export class SavedService {
    constructor(
        @InjectRepository(Saved)
        private savedRepo: Repository<Saved>,
    ) { }

    create(data: Partial<Saved>) {
        const newSaved = this.savedRepo.create(data);
        return this.savedRepo.save(newSaved);
    }

    findAll() {
        return this.savedRepo.find();
    }

    findByTalentId(talentId: number) {
        return this.savedRepo.find({ where: { talentId } });
    }

    remove(id: number) {
        return this.savedRepo.delete(id);
    }
}
