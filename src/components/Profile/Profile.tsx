import React, { useEffect } from 'react'
import { fetchUsers } from '../../features/userSlice';
import { } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../app/hook';

const Profile = () => {
    const dispatch = useAppDispatch();
    const users = useAppSelector((state) => state.userReducer.users);
    const userId = useAppSelector((state) => state.applicationSlice.userId);

    

    useEffect(() => {
        // Вызываем функцию fetchUsers при монтировании компонента
        dispatch(fetchUsers());
    }, [dispatch]);
    return (
        <div>
            <h1>users</h1>
            {users.map(item => {
                if (item._id === userId) {
                    console.log(item)
                    return <div>{item?.name}</div>
                }
            })}
        </div>
    )
}

export default Profile