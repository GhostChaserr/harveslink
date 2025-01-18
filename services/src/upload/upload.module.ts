import { Module } from '@nestjs/common';

import { StorageService } from '../aws/storage.service';
import { UploadService } from './upload.service';



@Module({
  imports: [],
  providers: [StorageService, UploadService],
  exports: [UploadService], // export if other modules need the ProductService
})
export class UploadModule {}
