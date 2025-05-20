import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { Model } from 'mongoose';
import { Company } from 'src/models/company.model';
import { CreateCompanyDTO } from '../dtos/create-company.dto';
import { CompanyDTO } from '../dtos/company.dto';
import { AccountsService } from 'src/core/accounts/services/accounts.service';
import { RoleType } from 'src/libs';
import { FirebaseService } from 'src/auth/firebase.service';
import { FirebaseBucketDirectory } from 'src/libs';
import { Express } from 'express';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company.name)
    private companyModel: Model<Company>,
    private accountsService: AccountsService,
    private firebaseService: FirebaseService
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
    createCompanyDoc.owner = currentUser.id;
    createCompanyDoc.owners = createCompanyDto.owners;
    createCompanyDoc.verifiedOwners = createCompanyDto.verifiedOwners;
    createCompanyDoc.workingHours = createCompanyDto.workingHours;
    createCompanyDoc.phoneNumber = createCompanyDto.phoneNumber;
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
    const result = await this.companyModel
      .find({
        $or: [{ createdBy: currentUser.id }, { verifiedOwners: currentUser.id }]
      })
      .select({
        'workingHours._id': 0
      })
      .populate({
        path: 'workingHours'
      })
      .lean()
      .exec();
    return plainToClass(CompanyDTO, result, {
      excludeExtraneousValues: true
    });
  }

  async findCompany(uuid: string): Promise<CompanyDTO> {
    const result = await this.companyModel
      .findOne({ _id: uuid })
      .populate({
        path: 'workingHours'
      })
      .select({
        'workingHours._id': 0
      })
      .lean()
      .exec();
    return plainToClass(CompanyDTO, result, {
      excludeExtraneousValues: true
    });
  }

  async uploadImageToCompany(
    companyId: string,
    file: Express.Multer.File,
    userId: string
  ): Promise<string> {
    const company = await this.findCompany(companyId);
    if (!company) {
      throw new Error(`Company with ID ${companyId} not found`);
    }

    if (company.owner.id !== userId) {
      throw new ForbiddenException(
        'You are not allowed to modify this company'
      );
    }

    if (!file) {
      throw new Error('No file uploaded');
    }

    const imageUrl = await this.firebaseService.uploadImageToStorage(
      file,
      FirebaseBucketDirectory.COMPANIES_IMAGES_OF_COMPANIES
    );

    await this.companyModel.findByIdAndUpdate(
      companyId,
      { imageUrl },
      { new: true }
    );

    return imageUrl;
  }
}
