import 'multer';

export type MediaType = 'image'|'video'

export class UploadFilesDto {
  productId: string;
  files: Express.Multer.File[];
}

export interface Media {
  default: string;
  type: MediaType
}

export class UploadFilesInput {
  productId: string;
  files: Express.Multer.File[];
}
