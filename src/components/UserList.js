import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, createUser } from "../store";
import Skeleton from "./skeleton";
// import { Button } from "./Button";
import Button from "./Button";

function UserList() {
    const dispatch = useDispatch();
    const { data, isLoading, error } = useSelector((state) => {
        return state.users;
    });

        useEffect(() => {
            dispatch(fetchUsers())
        }, [dispatch]);

        const handleUserAdd = () => {
            dispatch(createUser())
        };

        if(isLoading){
            return <Skeleton times={6} className={"h-10 w-full"}/>
        }
        if(error) {
            return <div>error...</div>
        }

        const renderedUsers = data.map((user) => {
            return <div ket={user.id} className="mb-2 border rounded">
                <div className="flex p-2 justify-between items-center cursor-pointer">
                    {user.name}
                </div>
            </div>
        })

    return <div>
        <div className="flex flex-row justify-between m-3">
        <h1 className="m-2 text-xl">users</h1>
        <Button onClick={handleUserAdd}>+ Add User</ Button>
        </div>
        {renderedUsers}
    </div>
};

export default UserList;