import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersAction } from "../../../redux/slices/users/usersActions";
import LoadingComponent from "../../../utils/LoadingComponent";
import _ from 'lodash';

import UsersListItem from "./UsersListItem";

const UsersList = () => {
  //dispatch
  const dispatch = useDispatch();
  //data from store
  const users = useSelector(state => state?.users);
  const { appErr, serverErr, loading } = users;
  const usersList = _.get(users, 'usersList.data', [])

  //fetch all users
  useEffect(() => {
    dispatch(fetchUsersAction());
  }, [dispatch]);

  return (
    <>
      <section class="py-8 bg-gray-900 min-h-screen">
        {loading ? (
          <LoadingComponent />
        ) : appErr || serverErr ? (
          <h3 className="text-yellow-600 text-center text-lg">
            {serverErr} {appErr}
          </h3>
        ) : usersList?.length <= 0 ? (
          <h2>No User Found</h2>
        ) : (
          usersList?.map(user => (
            <>
              <UsersListItem user={user} />
            </>
          ))
        )}
      </section>
    </>
  );
};

export default UsersList;
