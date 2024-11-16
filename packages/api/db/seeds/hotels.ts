import { faker, generateMersenne53Randomizer } from '@faker-js/faker';

const randomizer = generateMersenne53Randomizer();

faker.seed(123);
randomizer.seed(123);

const numberOfChains = 1000;
const numberOfHotels = 40000;
const chainNames = faker.helpers.uniqueArray(faker.company.name, numberOfChains);

const hotelNames = faker.helpers.uniqueArray(() => {
  let baseName = faker.airline.airport().name.replace(/Airport/, randomizer.next() > 0.5 ? 'Hotel' : 'Resort');

  if (randomizer.next() > 0.5) {
    baseName = `${faker.location.direction()} ${baseName}`;
  } else {
    baseName = `${baseName} ${faker.location.direction()}`;
  }

  if (baseName.match(/International/)) {
    return baseName.replace(/International/, faker.location.county());
  } else {
    return `${baseName} - ${faker.location.county()}`;
  }
}, numberOfHotels);

const hotelObjects = hotelNames.map(name => ({
  chain_name: randomizer.next() > 0.6 ? faker.helpers.arrayElement(chainNames) : 'No chain',
  hotel_name: name,
  addressline1: faker.location.streetAddress(),
  addressline2: '',
  zipcode: faker.location.zipCode(),
  city: faker.location.city(),
  state: faker.location.state(),
  country: faker.location.country(),
  countryisocode: faker.location.countryCode('alpha-2'),
  star_rating: Math.floor(randomizer.next() * 5) + 1
}));

export { hotelObjects as hotels };
