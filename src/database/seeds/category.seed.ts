 import { Factory, Seeder } from 'typeorm-seeding';
import { Connection, getManager } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';

export class CategorySeed implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    await getManager().query('TRUNCATE tbl_categories');

    await factory(Category)().create({
      title: 'My Category',
    });

    await factory(Category)().createMany(20);
  }
}
