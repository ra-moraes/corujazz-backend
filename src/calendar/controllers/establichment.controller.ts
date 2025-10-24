import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { EstablishmentService } from '../services/establishment.service';
import {
  ESTABLISHMENT_REPOSITORY,
  type EstablishmentRepository,
} from '../domain/interfaces/establishment.repository';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/user/domain/user-role.enum';
import { EstablishmentCreateRequestDto } from '../dto/establishment-create-request.dto';
import { EstablishmentResponseDto } from '../dto/establishment-response.dto';

@Controller('establishments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EstablishmentController {
  constructor(
    private readonly establishmentService: EstablishmentService,
    @Inject(ESTABLISHMENT_REPOSITORY)
    private readonly establishmentRepo: EstablishmentRepository,
  ) {}

  @Get()
  @Roles(UserRole.ADMIN, UserRole.BANDA, UserRole.EQUIPE)
  async getAll(): Promise<EstablishmentResponseDto[]> {
    const establishments = await this.establishmentRepo.findAll();

    return (
      establishments?.map((establishment) => {
        const Address = establishment.getAddress();
        const Contact = establishment.getContact();

        return {
          id: establishment.getId(),
          name: establishment.getName(),
          street: Address.getStreet(),
          city: Address.getCity(),
          distance: Address.getDistance(),
          contactName: Contact.getName(),
          contactPhone: Contact.getPhone(),
        };
      }) || []
    );
  }

  @Post()
  @Roles(UserRole.ADMIN, UserRole.BANDA)
  async create(
    @Body() dto: EstablishmentCreateRequestDto,
  ): Promise<EstablishmentResponseDto> {
    const establishment = await this.establishmentService.create(
      dto.name,
      dto.street,
      dto.city,
      dto.distance,
      dto.contactName,
      dto.contactPhone,
    );

    const Address = establishment.getAddress();
    const Contact = establishment.getContact();

    return {
      id: establishment.getId(),
      name: establishment.getName(),
      street: Address.getStreet(),
      city: Address.getCity(),
      distance: Address.getDistance(),
      contactName: Contact.getName(),
      contactPhone: Contact.getPhone(),
    };
  }
}
