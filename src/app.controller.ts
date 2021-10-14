import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseInterceptors(
    FileInterceptor(
      'file',
      {
        storage : diskStorage({
            destination : './uploads',
            filename : (req, file, cb) => {
              cb(null, file.originalname + '_' + Date.now() + '.pdf');
            }
        })
      }
    )
  )
  @Post('file')
  uploadFile(@UploadedFile() file : Express.Multer.File) {
    return {
      msg : `Archivo ${file.filename} cargado correctamente`
    };
  }
}
