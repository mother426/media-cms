import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchUsers, createUser } from "../store";
import Skeleton from "./Skeleton";
import Button from "./Button";
import { useThunk } from "../hooks/useThunk";
import UserItem from "./UserItem";

function UserList() {
  const [doFetchUsers, isLoadingUsers, loadingUsersError] =
    useThunk(fetchUsers);

  const [doCreateUser, isCreatingUser, creatingUserError] =
    useThunk(createUser);
  const { data } = useSelector((state) => {
    return state.users;
  });

  useEffect(() => {
    doFetchUsers();
  }, [doFetchUsers]);

  const handleUserAdd = () => {
    doCreateUser();
  };

  let content;

  if (isLoadingUsers) {
    content = <Skeleton times={6} className={"h-10 w-full"} />;
  } else if (loadingUsersError) {
    content = <div>error...</div>;
  } else {
    content = data.map((user) => {
      return <UserItem key={user.id} user={user}/>
        // return (
        //   <div ket={user.id} className="mb-2 border rounded">
        //     <div className="flex p-2 justify-between items-center cursor-pointer">
        //       {user.name}
        //     </div>
        //   </div>
        // );
      }); 
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center m-3">
        <h1 className="m-2 text-xl">users</h1>
        <Button loading={isCreatingUser} onClick={handleUserAdd}>
          + Add User
        </Button>
        {creatingUserError && "error creating user"}
      </div>
      {content}
    </div>
  );
}

export default UserList;
