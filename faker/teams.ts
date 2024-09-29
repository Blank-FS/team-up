import prisma from "@/prisma/db";
import { faker } from "@faker-js/faker";
import { developerTeamNames } from "./data";

function getRandomInt(min: number, range: number) {
  return Math.floor(Math.random() * range + min);
}

function generateName() {
  const size = developerTeamNames.length;
  const idx = getRandomInt(0, size);
  return developerTeamNames[idx];
}

export async function generateTeam() {
  faker.seed();
  const users = await prisma.user.findMany();
  const N = getRandomInt(1, 4);
  const size = users.length;
  let included = new Set();
  let members: any = [];
  for (let i = 0; i < N; i++) {
    let userIdx = getRandomInt(0, size);
    while (included.has(userIdx)) userIdx = getRandomInt(0, size);
    members.push(users[userIdx].user_id);
    included.add(userIdx);
  }
  await prisma.team.create({
    data: {
      team_name: generateName(),
      description: faker.lorem.paragraph({ min: 5, max: 9 }),
      userIDs: members,
    },
  });
}

async function main() {
  for (let i = 0; i < 2; i++) {
    try {
      await generateTeam();
      console.log("Team generated successfully!");
    } catch (error) {
      console.error("Error generating team:", error);
    }
  }
}

main();
