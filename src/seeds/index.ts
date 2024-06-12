import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { CategorizationSeeder } from '../categorization/seeds/categorization.seed';


async function runSeeders() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const categorizationSeeder = app.get(CategorizationSeeder);

  await categorizationSeeder.seed();

  await app.close();
}

runSeeders().catch(error => {
  console.error('Error running seeders:', error);
});