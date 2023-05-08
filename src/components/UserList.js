import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, createUser } from "../store";
import Skeleton from "./Skeleton";
import Button from "./Button";

function UserList() {
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [loadingUsersError, setLoadingUsersError] = useState(null);
  const [ isCreatingUser, setIsCreatingUser ] = useState(false); 
  const [ creatingUserError, setCreatingUserError ] = useState(false);

  const dispatch = useDispatch();
  const { data } = useSelector((state) => {
    return state.users;
  });

  useEffect(() => {
    setIsLoadingUsers(true);
    dispatch(fetchUsers())
      .unwrap()
      .catch((error) => setLoadingUsersError(error))
      .finally(() => setIsLoadingUsers(false));
  }, [dispatch]);

  const handleUserAdd = () => {
    setIsCreatingUser(true)
    dispatch(createUser())
        .unwrap()
        .catch(error => setCreatingUserError(error))
        .finally(() => setIsCreatingUser(false))
  };

  if (isLoadingUsers) {
    return <Skeleton times={6} className={"h-10 w-full"} />;
  }
  if (loadingUsersError) {
    return <div>error...</div>;
  }

  const renderedUsers = data.map((user) => {
    return (
      <div ket={user.id} className="mb-2 border rounded">
        <div className="flex p-2 justify-between items-center cursor-pointer">
          {user.name}
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="flex flex-row justify-between m-3">
        <h1 className="m-2 text-xl">users</h1>
        {
            isCreatingUser ? 'creating user' :
            <Button onClick={handleUserAdd}>+ Add User</Button>
        }
        {creatingUserError && 'error creating user'}
      </div>
      {renderedUsers}
    </div>
  );
}

export default UserList;
