export default {}
/*
  1. We don't know what data looks like when it comes from the internet;
     fields could be missing or null,
     or the front-end could be out of sync with API updates

  2. We should have a known type that we can use through the front-end,
     so we don't have to guess what the properties are, or if they have changed

  3. We should validate that we can make the known type,
     based on what was received from the server
*/


// TS has an `unknown` type for untrusted data,
//   to prevent making assumptions about things that might not be there.
const getUser = (id: string): Promise<User> =>
  axios.get(`/api/users/${id}`)
    .then(res => res.data)
    .then((serverData: unknown): Promise<User> => {
      // validate
      return isValidUserData(serverData)
        ? Promise.resolve(makeUser(serverData))
        : Promise.reject(new DataValidationError(serverData));
    });


// Type-guards will tell the compiler that data matches a type, if the check is true
type UserServerResponse = {
  data: {
    user_name: string;
    user_id: string;
  }
};


type User = {
  name: string;
  id: string;
};


// We want to make a User from a UserServerResponse
const makeUser = (input: UserServerResponse): User => ({
  name: input.data.user_name,
  id: input.data.user_id
});


// This is a type-guard if it's true, the server-data is what we expected
const isValidUserData = (input: unknown): input is UserServerResponse => {
  const name = (input as UserServerResponse)?.data?.user_name;
  const id = (input as UserServerResponse)?.data?.user_id;

  const isValidName = isNonEmptyString(name);
  const isValidId = isNonEmptyString(id);

  return isValidName && isValidId;
};

const isNonEmptyString = (x: unknown) => typeof x === "string" && x.length > 0;
