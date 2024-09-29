import { Prisma } from '@prisma/client'

export type TeamExtra = Prisma.TeamGetPayload<{
   include: { skills: true, users: true }
}>

export type UserExtra = Prisma.UserGetPayload<{
   include: { teams: true, skills: true }
}>