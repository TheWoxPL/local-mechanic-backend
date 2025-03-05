import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { Model } from 'mongoose';
import { UserAccount } from 'src/models';
import { UpsertDefaultsService } from 'src/upsert-defaults/upsert-defaults.service';
import { CreateUserAccountDto, UserAccountDto } from '../dtos';
import { RoleType } from 'src/libs';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(UserAccount.name)
    private userAccountModel: Model<UserAccount>,
    private upsertDefaultsService: UpsertDefaultsService
  ) {}

  async create(
    createUserAccountDto: CreateUserAccountDto
  ): Promise<UserAccountDto> {
    const systemUser = (await this.upsertDefaultsService.getSystemAccount()).id;
    const customerRole = await this.upsertDefaultsService.getCustomerRole();
    if (!customerRole) {
      throw new ConflictException('Customer role not found');
    }
    const createUserAccountDoc = new this.userAccountModel();

    createUserAccountDoc.email = createUserAccountDto.email;
    createUserAccountDoc.username = createUserAccountDto.email.split('@')[0];
    createUserAccountDoc.firstName = createUserAccountDto.firstName;
    createUserAccountDoc.lastName = createUserAccountDto.lastName;
    createUserAccountDoc.role = [customerRole.id];
    createUserAccountDoc.createdBy = systemUser;
    createUserAccountDoc.updatedBy = systemUser;

    const result = await createUserAccountDoc.save();
    return plainToClass(UserAccountDto, result, {
      excludeExtraneousValues: true
    });
  }

  async findById(id: string): Promise<UserAccountDto> {
    const userAccount = await this.userAccountModel
      .findById(id)
      .populate('createdBy updatedBy role')
      .lean()
      .exec();
    const userAccountDto = plainToClass(UserAccountDto, userAccount, {
      excludeExtraneousValues: true
    });
    return userAccountDto;
  }

  async findByEmail(email: string): Promise<UserAccountDto> {
    const userAccount = await this.userAccountModel
      .findOne({ email })
      .populate('createdBy updatedBy role')
      .lean()
      .exec();
    const userAccountDto = plainToClass(UserAccountDto, userAccount, {
      excludeExtraneousValues: true
    });
    return userAccountDto;
  }

  async addRole(roleName: string, email: string): Promise<string> {
    try {
      const role =
        roleName === RoleType.CUSTOMER
          ? await this.upsertDefaultsService.getCustomerRole()
          : await this.upsertDefaultsService.getEntrepreneurRole();

      if (!role) {
        throw new ConflictException('Role not found.');
      }

      const userAccount = await this.userAccountModel.findOne({ email }).exec();
      if (!userAccount!.role.includes(role.id)) {
        userAccount!.role.push(role.id);
        await userAccount!.save();
        return `${roleName} role added.`;
      } else {
        throw new ConflictException(`${roleName} role already assigned.`);
      }
    } catch (error) {
      throw new ConflictException(`${roleName} role already assigned.`);
    }
  }

  async hasAnyRoleByEmail(email: string): Promise<boolean> {
    const userAccount = await this.userAccountModel
      .findOne({ email })
      .lean()
      .exec();
    if (userAccount!.role.length > 0) {
      return true;
    }
    return false;
  }
}
