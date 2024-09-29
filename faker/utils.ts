import { developerSkills, universities, devRoles } from "./data";
import prisma from "@/prisma/db";
import { faker } from "@faker-js/faker";

function getRandomInt(min: number, range: number) {
  return Math.floor(Math.random() * range + min);
}

export function generateSkills() {
  let size = developerSkills.length;
  const N = getRandomInt(2, 5);
  let included = new Set();
  let skills: string[] = [];
  for (let i = 0; i < N; i++) {
    let skillIdx = getRandomInt(0, size);
    while (included.has(skillIdx));
    skillIdx = getRandomInt(0, size);
    skills.push(developerSkills[skillIdx]);
    included.add(skillIdx);
  }
  return skills;
}

export function generateSchool() {
  let size = universities.length;
  const idx = getRandomInt(0, size);
  return universities[idx];
}

export function generateRole() {
  let size = devRoles.length;
  const idx = getRandomInt(0, size);
  return devRoles[idx];
}

export async function generateUser() {
  faker.seed();
  let firstName = faker.person.firstName();
  let lastName = faker.person.lastName();
  await prisma.user.create({
    data: {
      email: faker.internet.email({ firstName: firstName }),
      first_name: firstName,
      last_name: lastName,
      user_name: faker.internet.userName(),
      school: generateSchool(),
      skills: generateSkills(),
      role: generateRole(),
      bio: faker.lorem.paragraph({ min: 2, max: 4 }),
      avatar: faker.image.avatar(),
    },
  });
}

async function main() {
  for (let i = 0; i < 20; i++) {
    try {
      await generateUser();
      console.log("User generated successfully!");
    } catch (error) {
      console.error("Error generating user:", error);
    }
  }
}

main();
