import { UserTeamForm } from "../forms";
import prisma from "../../prisma/db";
import { Invite } from "@prisma/client";
import { addUserTeam } from "./users";


export async function doesInviteExist(userTeamForm: UserTeamForm) {
   const invite = await prisma.invite.findFirst({
      where: {
         userID: userTeamForm.userID,
         teamID: userTeamForm.teamID
      }
   });

   return invite ? true : false;
}

export async function createInvite(userTeamForm: UserTeamForm) {
   if (await doesInviteExist(userTeamForm)) {
      return;
   }
   const invite = await prisma.invite.create({
      data: {
         userID: userTeamForm.userID,
         teamID: userTeamForm.teamID
      },
   });
}

export async function getInvite(invite_id: string): Promise<Invite | null> {
   const invite = await prisma.invite.findUnique({
      where: { invite_id: invite_id }
   });

   return invite;
}

export async function completeInvite(accept: boolean, invite_id: string) {
   const invite = await getInvite(invite_id) as Invite;
   const dlt_inv = await prisma.invite.delete({
      where: { invite_id: invite_id }
   });

   if (accept) {
      let userTeamForm: UserTeamForm = {
         userID: invite.userID,
         teamID: invite.teamID
      }

      await addUserTeam(userTeamForm);
   }
}