export default {}

type User = {
  id: string;
  name: string;
};


type ServerUser = {
  userData: {
    userEmployeeId: string;
    userName: string;
    userMeta: {
      userMetaId: string;
      userMetaLastLogin: string;
      userMetaDetails: [];
    };
  };
};


const getUser = (id: string) => fetch(`/api/users/${id}`)
  .then((res) => res.json())
  .then((data: unknown): Promise<User> => {
    return isValidUserData(data)
      ? Promise.resolve(makeUser(data))
      : Promise.reject(data);
  });


const makeUser = (data: ServerUser): User => {
  const user: User = {
    id: data.userData.userMeta.userMetaId,
    name: data.userData.userName
  };
  return user;
};


const isValidUserData = (data: unknown): data is ServerUser => {
  const name = (data as ServerUser)?.userData?.userName;
  const id = (data as ServerUser)?.userData?.userMeta.userMetaId;

  const isValid =
       (typeof name === "string" && name.length > 0)
    && (typeof id === "string" && id.length > 0);

  return isValid;
};
