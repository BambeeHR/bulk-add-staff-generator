import { faker } from '@faker-js/faker';
import fs from 'fs';
import path from 'path';
import { parse as jsonToCsv } from 'json2csv';
import {format} from 'date-fns';

const companyTitles = [
  'Engineering Fellow',
  'CEO',
  'CTO',
  'CIO','Chief Digital Officer','Chief Innovation Officer',
  'VP of Engineering','Director of Engineering',
  'Chief Architect',
  'Software Architect',
  'Engineering Project Manager/Engineering Manager',
  'Technical Lead','Engineering Lead','Team Lead',
  'Principal Software Engineer',
  'Senior Software Engineer','Senior Software Developer',
  'Software Engineer',
  'Software Developer',
  'Junior Software Developer',
  'Intern Software Developer',
  'HR Coordinator',
  'Payroll Coordinator',
  'Recruiting Coordinator',
  'HR Specialist',
  'HR Generalist',
  'Recruiter',
  'Human Resource Information Specialist',
  'HR Manager',
  'Recruiting Manager',
  'HR Business Partner',
  'HR Director',
  'Recruiting Director',
  'VP of HR',
  'Chief Human Resource Officer',
  'Career Consultant',
  'Career Advisor',
  'Assignment Coordinator',
  'Placement Coordinator',
  'Career Development Strategist',
  'Personnel Agent',
  'Human Resources Officer',
]

const payTypes = ['Per Hour', 'Salary', 'Contract']

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
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const payRate = Math.floor(Math.random() * 16) + 15;

  return {
    'First name': firstName,
    'Last name': lastName,
    'Phone Number': faker.phone.phoneNumber('###-###-####'),
    Email: `generated.${firstName.toLowerCase()}.${lastName.toLowerCase()}@mailinator.com`,
    Title: faker.helpers.arrayElement(companyTitles),
    'Start Date': format(faker.date.past(1), 'MM/dd/yyyy'),
    'Pay Rate': payRate,
    'Pay Type': faker.helpers.arrayElement(payTypes),
    State: faker.address.stateAbbr(),
  };
}

function createStaffList(amount: number) {
  return [...Array(amount)].map(createStaff);
}
