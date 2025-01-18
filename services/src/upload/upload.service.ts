/* eslint-disable no-useless-catch */
import { Injectable } from '@nestjs/common';
import { StorageService } from '../aws/storage.service';
import { getS3UniqueFilePathId } from './upload.service.helper';
import { Media, UploadFilesInput } from './upload.service.interface';

@Injectable()
export class UploadService {
  constructor(private readonly storageService: StorageService) {}

  async uploadImages(
    productId: string,
    input: UploadFilesInput
  ): Promise<Media[]> {
    try {
      const storageFolder = 'product-images';
      const medias: Media[] = [];
      for (const file of input.files) {
        const filePathUniqueId = getS3UniqueFilePathId();
        const filePath = `${storageFolder.toLowerCase()}/${productId}/${filePathUniqueId}.${
          file.mimetype.split('/')[1]
        }`;
        const media: Media = {
          default: filePath,
          type: 'image',
        };
        medias.push(media);
      }
      return medias;
    } catch (error) {
      throw error;
    }
  }
}
