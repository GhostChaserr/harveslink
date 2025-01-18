import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { FormDataRequest } from 'nestjs-form-data';
import {
  AuthGuard,
  Session,
  SessionD,
  UploadFilesInput,
  UploadService,
} from 'services';

@UseGuards(AuthGuard)
@Controller('products')
export class ProductController {
  constructor(private readonly service: UploadService) {}

  @FormDataRequest()
  @Post('/:productId/photos')
  async uploadPhotos(
    @SessionD() session: Session,
    @Param('productId') productId: string,
    @Body() input: UploadFilesInput
  ) {
    return this.service.uploadImages(productId, input);
  }
}
