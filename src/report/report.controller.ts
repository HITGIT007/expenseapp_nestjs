//Controller is responsible for creating endpoints inside of our nest application
//Every single entity inside nestjs is a class
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  ParseUUIDPipe,
  ParseEnumPipe,
} from '@nestjs/common';
import { ReportType } from 'src/data';
import {
  CreateReportDto,
  ReportResponseDto,
  UpdateReportDto,
} from 'src/dtos/report.dto';

import { ReportService } from './report.service';
//Whatever route is in controller is going to be appended to the routes inside of the controller class
@Controller('/report/:type') //The dynamic type can be income or expense
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  getAllReports(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,//Param decorator is going to allow us to extract certain things from the requestW
  ): ReportResponseDto[] {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
       //This return is actually going to be a http response
    return this.reportService.getAllReports(reportType);
  }

   //This return is actually going to be a http response
  @Get(':id')
  //In parameters we mention that it will get a type as an parameter which is a string and also
  //an id as parameter and it will be of type string
  getReportById(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    //We add the Pipe in the decorator
    //The ParseIntPipe will convert the string to a integer
    @Param('id', ParseUUIDPipe) id: string,
  ): ReportResponseDto {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.reportService.getReportById(reportType, id);
  }

  @Post()
  createReport(
     //We validate the body using Data Transfer Object (dto)
    //A dto is something that we can use to transform and validate the body as well as the outgoing response
    @Body() { amount, source }: CreateReportDto,
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
  ): ReportResponseDto {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.reportService.createReport(reportType, { amount, source });
  }

  @Put(':id')
  updateReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateReportDto,
  ): ReportResponseDto {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.reportService.updateReport(reportType, id, body);
  }

  @HttpCode(204)
  @Delete(':id')
  //In parameters we mention that it will get an id as parameter and it will be of type string
  deleteReport(@Param('id', ParseUUIDPipe) id: string) {
    return this.reportService.deleteReport(id);
  }
}
//Pipe
//A pipe is an entity that can trasform things and validate them
//https://progressivecoder.com/nestjs-pipes-with-examples-learn-nestjs-series-part-7/#:~:text=In%20the%20context%20of%20NestJS%2C%20a%20pipe%20is,A%20pipe%20class%20should%20implement%20the%20PipeTransform%20interface.

//Validation
/* 
Validate that the id is a uuid
Validate that the body is correct
Validate that the type is either incomne or expense
 */