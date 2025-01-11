import { Injectable, BadRequestException } from '@nestjs/common';
import { Readable } from 'stream';
import * as AWS from 'aws-sdk';
import moment = require('moment');
import { DeleteObjectOutput } from 'aws-sdk/clients/s3';
import { ConfigService } from '@nestjs/config';
import { createReadStream } from 'fs';

@Injectable()
export class StorageService {
  private readonly storageService;
  private readonly bucketName;

  protected static getNextDay = () => {
    return moment().add(1, 'day').milliseconds();
  };

  constructor(configService: ConfigService) {
    this.bucketName = configService.get('AWS_BUCKET_NAME');
    this.storageService = new AWS.S3({
      accessKeyId: configService.get('AWS_ACCESS_KEY'),
      secretAccessKey: configService.get('AWS_SECRET_KEY'),
      region: 'eu-central-1',
    });
  }

  async getUploadUrl(contentType: string, imageName: string): Promise<string> {
    const config = {
      Bucket: this.bucketName,
      ContentType: contentType,
      Key: imageName,
    };

    const url: string = await new Promise((resolve, reject) => {
      this.storageService.getSignedUrl(
        'putObject',
        config,
        (err: any, signedUrl: string) => {
          if (err) {
            reject(err);
          }
          resolve(signedUrl);
        }
      );
    });

    return url;
  }

  /**
   * this method directly uploads file to storage bucket
   * @param name key where to place image
   * @param fileBuffer buffer of image
   */
  async uploadFile(name: string, fileBuffer: Buffer){
    try {
      const params = {
        Key: name,
        Bucket: this.bucketName,
        Body: fileBuffer,
      };

      const managedUpload = this.storageService.upload(params);

      managedUpload.on('httpUploadProgress', (progress) => {
        console.log(`Uploaded ${progress.loaded} of ${progress.total} bytes`);
      });
      return managedUpload.promise();
    } catch (err) {
      throw new BadRequestException("Couldn't upload file");
    }
  }

  /**
   * this method directly uploads file to storage bucket
   * @param name key where to place image
   * @param fileBuffer buffer of image
   */
  async uploadFileFromLocalPath(name: string, filePath: string) {
    try {
      const params = {
        Key: name,
        Bucket: this.bucketName,
        Body: createReadStream(filePath),
      };
      return this.storageService.putObject(params).promise();
    } catch (err) {
      throw new BadRequestException("Couldn't upload file");
    }
  }

  /**
   * this method generates download url of file
   * @param filename key of file where it is placed
   * @param duration duration to be valid if not passed it will be valid for 24 hours
   */
  async getDownloadUrl(
    filename: string,
    duration?: string | Date | number
  ): Promise<string> {
    if (!filename) {
      return '';
    }
    const config = {
      Bucket: this.bucketName,
      Key: filename,
      Expires: duration || StorageService.getNextDay(),
    };
    return this.storageService.getSignedUrlPromise('getObject', config);
  }

  deleteObject(name: string): Promise<DeleteObjectOutput> {
    const params = {
      Bucket: this.bucketName,
      Key: name,
    };

    return this.storageService.deleteObject(params).promise();
  }

  async createImageReadStream(name: string): Promise<Readable> {
    const config = { Bucket: this.bucketName, Key: name };

    const exists = await this.storageService.headObject(config).promise();
    if (!exists) {
      throw new BadRequestException("Image doesn't exist");
    }
    const imageReadStream = this.storageService
      .getObject(config)
      .createReadStream();

    return imageReadStream;
  }

  async streamToBuffer(stream: Readable): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      stream.on('data', (chunk) => chunks.push(chunk));
      stream.on('error', reject);
      stream.on('end', () => {
        const result = Buffer.concat(chunks);
        resolve(result);
      });
    });
  }

  async downloadImage(name: string): Promise<Buffer> {
    const stream = await this.createImageReadStream(name);
    const buff = await this.streamToBuffer(stream);
    return buff;
  }

  async downloadBase64(name: string): Promise<string> {
    const stream = await this.createImageReadStream(name);
    const buff = await this.streamToBuffer(stream);
    const image = buff.toString('base64');
    return image;
  }
}
