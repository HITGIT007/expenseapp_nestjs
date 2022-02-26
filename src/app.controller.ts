//Controller is responsible for creating endpoints inside of our nest application
//Every single entity inside nestjs is a class

import {Controller, Delete, Get, Post, Put, Param, Body, HttpCode} from "@nestjs/common"
import {data, ReportType} from "./data"
import { v4 as uuid } from "uuid"

//Whatever route is in controller is going to be appended to the routes inside of the controller class
@Controller("/report/:type")//The dynamic type can be income or expense
export class AppController {
  
  @Get('')
  getAllReports(@Param('type') type: string)
  //Param decorator is going to allow us to extract certain things from the requestW
  {
    const reportType = type === "income"? ReportType.INCOME : ReportType.EXPENSE;
    //This return is actually going to be a http response
    return data.report.filter((report) => 
      report.type === reportType)
  }

  //For making the id dynamic just add :
  @Get(':id')
  getReportById(
    @Param('type') type: string,
    @Param('id') id: string
  ){
    const reportType = type === "income"? ReportType.INCOME : ReportType.EXPENSE;
    //This return is actually going to be a http response
    return data.report
    .filter((report) => report.type === reportType)
    .find(report => report.id===id);
  }

  @Post('')
  createReport(
    @Body(){
      amount,
      source
    }
    :
    {
      amount:number,
      source:string
    },
    @Param('type') type: string
  ){
    const newReport ={
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type:type === "income"? ReportType.INCOME : ReportType.EXPENSE
    }
    data.report.push(newReport);
    return newReport;
  }

  @Put(':id')
  updateReport(
    @Param('type') type: string,
    @Param('id') id: string,
    @Body() body: {
      amount: number; source: string
    }
  ){
    const reportType = type === "income"? ReportType.INCOME : ReportType.EXPENSE;
    const reportToUpdate = data.report
    .filter((report) => report.type === reportType)
    .find(report => report.id===id);

    if(!reportToUpdate) return;

    const reportIndex = data.report.findIndex((report) => report.id === reportToUpdate.id);
    data.report[reportIndex] = {
      ...data.report[reportIndex],
      ...body
    }
    return data.report[reportIndex]
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(
    @Param('id') id: string
  ){
    const reportIndex = data.report.findIndex((report) => report.id ===id);
    if(reportIndex === -1) return;
    data.report.splice(reportIndex, 1);
    return
  }


}
