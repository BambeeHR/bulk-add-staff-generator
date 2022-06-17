import { faker } from '@faker-js/faker';
import fs from 'fs';
import path from 'path';
import { parse as jsonToCsv } from 'json2csv';

main();

/**
 * Outputs a csv file to be copied into the bulk add staff section in app/employees */
function main() {
  try {
    const amount = Number(process.argv[2] || 10);
    const staffList = createStaffList(amount);
    const dir = path.join(__dirname, '../data');
    const filename = `${amount}_staff`;
    const csvResult = jsonToCsv(staffList, {
      fields: Object.keys(staffList[0]),
    });

    fs.writeFileSync(path.join(dir, `${filename}.csv`), csvResult);
    fs.writeFileSync(
      path.join(dir, `${filename}.json`),
      JSON.stringify(staffList)
    );
    console.log(`Created ${amount} staff members at ${filename}`);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

function createStaff() {
  return {
    'First name': faker.name.firstName(),
    'Last name': faker.name.lastName(),
    'Phone Number': ' ',
    Email: `generated_${faker.internet.email()}`,
    Title: faker.lorem.word(8),
    'Start Date': '6/7/2022',
    'Pay Rate': 20,
    'Pay Type': 'Per Hour',
    State: 'TN',
  };
}

function createStaffList(amount: number) {
  return [...Array(amount)].map(createStaff);
}
