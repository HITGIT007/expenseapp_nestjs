//Controller is responsible for creating endpoints inside of our nest application
//Every single entity inside nestjs is a class

import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common';
import { data, ReportType } from './data';
import { v4 as uuid } from 'uuid';
import { AppService } from './app.service';

//Whatever route is in controller is going to be appended to the routes inside of the controller class
@Controller('/report/:type') //The dynamic type can be income or expense
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  getAllReports(
    @Param('type') type: string, //Param decorator is going to allow us to extract certain things from the requestW
  ) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    //This return is actually going to be a http response
    return this.appService.getAllReports(reportType);
  }

  //For making the id dynamic just add :
  @Get(':id')
  getReportById(@Param('type') type: string, @Param('id') id: string) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    //This return is actually going to be a http response
    return this.appService.getReportById(reportType, id);
  }

  @Post('')
  createReport(
    @Body()
    {
      amount,
      source,
    }: {
      amount: number;
      source: string;
    },
    @Param('type') type: string,
  ) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.createReport(reportType, { amount, source });
  }

  @Put(':id')
  updateReport(
    @Param('type') type: string,
    @Param('id') id: string,
    @Body()
    body: {
      amount: number;
      source: string;
    },
  ) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return this.appService.updateReport(reportType, id, body);
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(@Param('id') id: string) {
    return this.deleteReport(id);
  }
}
