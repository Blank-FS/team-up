import { Prisma } from '@prisma/client'

export type TeamExtra = Prisma.TeamGetPayload<{
   include: { users: true, events: true; }
}>

export type UserExtra = Prisma.UserGetPayload<{
   include: { teams: true, events: true; }
}>