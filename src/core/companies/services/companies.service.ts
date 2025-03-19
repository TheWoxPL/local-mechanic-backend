import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {plainToClass} from 'class-transformer';
import {Model} from 'mongoose';
import {Company} from 'src/models/company.model';
import {CreateCompanyDTO} from '../dtos/create-company.dto';
import {CompanyDTO} from '../dtos/company.dto';
import {AccountsService} from 'src/core/accounts/services/accounts.service';
import {RoleType} from 'src/libs';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company.name)
    private companyModel: Model<Company>,
    private accountsService: AccountsService
  ) {}

  async create(
    createCompanyDto: CreateCompanyDTO,
    userEmail: string
  ): Promise<CompanyDTO> {
    const currentUser = await this.accountsService.findByEmail(userEmail);

    const createCompanyDoc = new this.companyModel();
    createCompanyDoc.companyName = createCompanyDto.companyName;
    createCompanyDoc.description = createCompanyDto.description;
    createCompanyDoc.foundDate = createCompanyDto.foundDate;
    createCompanyDoc.owners = createCompanyDto.owners;
    createCompanyDoc.verifiedOwners = createCompanyDto.verifiedOwners;
    createCompanyDoc.createdBy = currentUser.id;
    createCompanyDoc.updatedBy = currentUser.id;

    const result = await createCompanyDoc.save();
    this.accountsService.addRole(RoleType.ENTREPRENEUR, userEmail);
    return plainToClass(CompanyDTO, result, {
      excludeExtraneousValues: true
    });
  }

  async findUserCompanies(userEmail: string): Promise<CompanyDTO[]> {
    const currentUser = await this.accountsService.findByEmail(userEmail);
    const result = await this.companyModel.find({
      $or: [{createdBy: currentUser.id}, {verifiedOwners: currentUser.id}]
    });
    return plainToClass(CompanyDTO, result, {
      excludeExtraneousValues: true
    });
  }
}
