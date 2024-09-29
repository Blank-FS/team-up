import { UserForm } from "@/lib/forms";
import { TeamExtra, UserExtra } from "@/lib/types";
import {
  createProfile,
  getAllUsers,
  getUserById,
  hasProfile,
} from "@/lib/utils/users";
import { getAllTeams } from "@/lib/utils/teams";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Hook to fetch all users
export const useAllUsers = () => {
  return useQuery<UserExtra[] | null>({
    queryKey: ["users"],
    queryFn: async () => {
      const users = await getAllUsers();
      return JSON.parse(JSON.stringify(users));
    },
  });
};

export const useAllTeams = () => {
  return useQuery<TeamExtra[] | null>({
    queryKey: ["teams"],
    queryFn: async () => {
      const teams = await getAllTeams();
      return JSON.parse(JSON.stringify(teams));
    },
  });
};

// Hook to fetch user by ID
export const useUserById = (userId: string) => {
  return useQuery<UserExtra | null>({
    queryKey: ["user", userId],
    queryFn: async () => {
      const user = await getUserById(userId);
      return JSON.parse(JSON.stringify(user));
    },
  });
};

/* // Hook to add user skill
export const useAddUserSkill = () => {
  const queryClient = useQueryClient();
  return useMutation<void, unknown, UserSkillForm>(addUserSkill, {
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });
};

// Hook to add user team
export const useAddUserTeam = () => {
  const queryClient = useQueryClient();
  return useMutation<void, unknown, UserTeamForm>(addUserTeam, {
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });
};
 */
