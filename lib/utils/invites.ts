import { InviteForm, UserTeamForm } from "../forms";
import prisma from "../../prisma/db";
import { Invite } from "@prisma/client";
import { addUserTeam } from "./users";


export async function doesInviteExist(inviteForm: InviteForm) {
   const invite = await prisma.invite.findFirst({
      where: {
         senderID: inviteForm.senderID,
         receiverID: inviteForm.receiverID,
         teamID: inviteForm.teamID
      }
   });

   return invite ? true : false;
}

export async function createInvite(inviteForm: InviteForm) {
   if (await doesInviteExist(inviteForm)) {
      return;
   }
   const invite = await prisma.invite.create({
      data: {
         senderID: inviteForm.senderID,
         receiverID: inviteForm.receiverID,
         teamID: inviteForm.teamID
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
   if (accept) {
      let userTeamForm: UserTeamForm = {
         userID: invite.receiverID,
         teamID: invite.teamID
      }

      await addUserTeam(userTeamForm);
   }

   const dlt_inv = await prisma.invite.delete({
      where: { invite_id: invite.invite_id }
   });
}