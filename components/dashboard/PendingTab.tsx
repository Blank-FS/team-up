import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserExtra } from "@/lib/types";

interface ProfileTabProps {
  currentUser: UserExtra;
}

const ProfileTab: React.FC<ProfileTabProps> = ({ currentUser }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{currentUser.user_name}</CardTitle>
        <CardDescription textColor="text-[#00274C] dark:text-[#FFCB05]">
          {currentUser.role}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Skills</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {currentUser.skills?.map((skill, index) => (
                <span
                  key={index}
                  className="bg-black dark:bg-[#CFC096] text-primary-foreground px-2 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold">Bio</h3>
            <p className="mt-2">{currentUser.bio}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileTab;
