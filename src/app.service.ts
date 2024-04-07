import { Inject, Injectable } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @Inject('TASK_REPOSITORY')
    private taskRepository: Repository<Task>,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async getEstadisticas() {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);

    /*regresamos la suma de horas, el promedio de horas, la suma de costo y promedio de costo
    donde las tareas son completas y la fecha de expiracion esta entre 7 dias hacia atras y hoy*/

    let statistics = await this.taskRepository
      .createQueryBuilder('task')
      .select('SUM(task.hours_to_complete)', 'total_hours')
      .addSelect('AVG(task.hours_to_complete)', 'average_hours')
      .addSelect('SUM(task.cost)', 'total_cost')
      .addSelect('AVG(task.cost)', 'average_cost')
      .andWhere('task.status = :status', { status: 2 })
      .andWhere('task.expiration_date BETWEEN :startDate AND :endDate', {
        startDate,
        endDate: new Date(),
      })
      .getRawOne();

    statistics.average_hours = parseFloat(statistics.average_hours).toFixed(2);
    statistics.average_cost = parseFloat(statistics.average_cost).toFixed(2);
    return statistics;
  }
}
