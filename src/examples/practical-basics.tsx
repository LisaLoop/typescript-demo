interface ToDo {
  id: string;
  name: string;
  description: string;
  completed: boolean;
};

interface User {
  id: string;
  name: string;
  tasks: ToDo[];
}


type TaskPageProps = {
  user: User;
  todos: ToDo[];
};


const TaskPage: React.FC<TaskPageProps> = ({ user, todos }) => (
  <div>
    <header>Hi, {user.name}</header>
  </div>
); 



const getUser = (id: string) => fetch(`/api/users/${id}`)
  .then(res => res.json())
  .then(makeUser);

const makeUser = (data: unknown): User => {
  if (data == null) { return emptyUser; }

  return {
    name: data.user_name ? data.user_name : "",
    tasks: [],
    id: data.user_id ? data.user_id : "",
  };
};
