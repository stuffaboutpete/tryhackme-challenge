import { faker } from '@faker-js/faker';

faker.seed(123);

const numberOfCities = 4000;
const cityNames = faker.helpers.uniqueArray(faker.location.city, numberOfCities);
const cityObjects = cityNames.map(name => ({ name }));

export { cityObjects as cities };

const allCountries = faker.definitions.location.country.map((countryName, index) => ({
  country: countryName,
  countryisocode: faker.definitions.location.country_code[index].alpha2
}));

export { allCountries as countries };
