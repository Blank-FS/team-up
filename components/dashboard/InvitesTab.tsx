import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { TeamExtra, UserExtra } from "@/lib/types";
import React, { useEffect, useState } from "react";


interface Invite {
  invite_id: string;
  senderID: string;
  sender: UserExtra;
  receiverID: string;
  receiver: UserExtra;
  teamID: string;
  team: TeamExtra;
}

const InvitesCard: React.FC = () => {
  const [invites, setInvites] = useState<Invite[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchInvites = async () => {
      try {
        const response = await fetch("/api/get-all-invites");
        const data = await response.json();
        setInvites(data);
      } catch (error) {
        console.error("Error fetching invites:", error);
      }
    };

    fetchInvites();
  }, []);

  const handleAccept = async (accept: boolean, invite_id: string) => {
    try {
      const response = await fetch(`/api/accept-invite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accept, invite_id }),
      });

      if (response.ok) {
        toast({
          title: "Invite Accepted",
          description: "You have successfully accepted the invite.",
        });
        setInvites(invites.filter((invite) => invite.invite_id !== invite_id));
      } else {
        toast({
          title: "Error",
          description: "There was an error accepting the invite.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error accepting the invite.",
        variant: "destructive",
      });
    }
  };

  const handleReject = async (accept: boolean, invite_id: string) => {
    try {
      const response = await fetch(`/api/accept-invite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accept, invite_id }),
      });

      if (response.ok) {
        toast({
          title: "Invite Rejected",
          description: "You have successfully rejected the invite.",
        });
        setInvites(invites.filter((invite) => invite.invite_id !== invite_id));
      } else {
        toast({
          title: "Error",
          description: "There was an error rejecting the invite.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error rejecting the invite.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Invites</CardTitle>
        <CardDescription>Manage your team invites</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {invites.length === 0 ? (
            <p>No invites available</p>
          ) : (
            invites.map((invite) => (
              <div
                key={invite.invite_id}
                className="flex justify-between items-center"
              >
                <div>
                  <p>Invite ID: {invite.invite_id}</p>
                  <p>Sender ID: {invite.sender.user_name}</p>
                  <p>Team ID: {invite.team.team_name}</p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => handleAccept(true, invite.invite_id)}
                    className="bg-green-500 text-white"
                  >
                    Accept
                  </Button>
                  <Button
                    onClick={() => handleReject(false, invite.invite_id)}
                    className="bg-red-500 text-white"
                  >
                    Reject
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default InvitesCard;
