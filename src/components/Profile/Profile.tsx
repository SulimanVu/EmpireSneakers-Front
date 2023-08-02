import { useEffect } from "react";
import { fetchUsers } from "../../features/userSlice";
import {} from "react-redux";
import { useAppDispatch, useAppSelector } from "../../app/hook";

const Profile = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.userReducer.users);
  const userId = useAppSelector((state) => state.applicationSlice.userId);

  console.log(userId);

  useEffect(() => {
    // Вызываем функцию fetchUsers при монтировании компонента
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div>
      <h1>Profile</h1>
      {users.map((item) => {
        return (
          item._id == userId && (
            <>
              <div>Login:{item.login}</div>
              <div>Name: {item.name}</div>
            </>
          )
        );
      })}
    </div>
  );
};

export default Profile;
