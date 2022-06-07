 import { define } from 'typeorm-seeding';
import { randFullName } from '@ngneat/falso';
import { Category } from '../../categories/entities/category.entity';

define(Category, () => {
  const category = new Category();
  category.title = randFullName();
  return category;
});
