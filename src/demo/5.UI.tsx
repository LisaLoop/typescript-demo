/* file extension = .tsx */

import { FC } from "react";

type User = { name: string; id: string; };

// This is the type of the Props Object for this component
type UserDetailsProps = { selectedTeam: string; user: User; todos: [] };

// FC is a Function Component
export const UserDetails: FC<UserDetailsProps> = ({ selectedTeam, user, todos }) => {
  return (
    <div>
      Good morning, {user.name}
    </div>
  );
};



<UserDetails selectedTeam={5} user={{ name: "", id: 1 }} todos={[]} />
{/* <UserDetails selectedTeam={"5"} user={{ name: "", id: "1" }} /> */}
