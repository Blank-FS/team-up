import { Team, User } from "../types";

const mockCurrentUser: User = {
  user_id: 1,
  username: "john_doe",
  email: "john.doe@example.com",
  first_name: "John",
  last_name: "Doe",
  role: "Developer",
  skills: ["JavaScript", "React", "Node.js"],
  bio: "A passionate developer with a love for coding.",
};

const mockAvailableUsers: User[] = [
  {
    user_id: 2,
    username: "jane_smith",
    email: "jane.smith@example.com",
    first_name: "Jane",
    last_name: "Smith",
    role: "Designer",
    skills: ["UI/UX", "Photoshop", "Illustrator"],
    bio: "Creative designer with a knack for user-friendly designs.",
  },
  {
    user_id: 3,
    username: "mike_jones",
    email: "mike.jones@example.com",
    first_name: "Mike",
    last_name: "Jones",
    role: "Project Manager",
    skills: ["Agile", "Scrum", "Leadership"],
    bio: "Experienced project manager who ensures timely delivery.",
  },
  {
    user_id: 4,
    username: "susan_lee",
    email: "susan.lee@example.com",
    first_name: "Susan",
    last_name: "Lee",
    role: "Tester",
    skills: ["Manual Testing", "Automation", "Selenium"],
    bio: "Detail-oriented tester with a focus on quality assurance.",
  },
];

const mockTeams: Team[] = [
  {
    team_id: 1,
    team_name: "Alpha Team",
    team_description: "A team focused on frontend development.",
    team_members: [mockCurrentUser, mockAvailableUsers[0]],
  },
  {
    team_id: 2,
    team_name: "Beta Team",
    team_description: "A team focused on backend development.",
    team_members: [mockAvailableUsers[1], mockAvailableUsers[2]],
  },
];

const mocks = { mockAvailableUsers, mockCurrentUser, mockTeams };

export default mocks;
