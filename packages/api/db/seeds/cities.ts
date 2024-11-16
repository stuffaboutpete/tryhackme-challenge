import { faker } from '@faker-js/faker';

faker.seed(123);

const numberOfCities = 4000;
const cityNames = faker.helpers.uniqueArray(faker.location.city, numberOfCities);
const cityObjects = cityNames.map(name => ({ name }));

export { cityObjects as cities };
