import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUserAction, fetchUsersAction } from "../../../redux/slices/users/usersActions";
import LoadingComponent from "../../../utils/LoadingComponent";
import _ from "lodash";
import moment from "moment";

const UsersList = () => {
  //dispatch 
  const dispatch = useDispatch();
  //data from store
  const users = useSelector((state) => state?.users);
  const { appErr, serverErr, loading, isDeleted } = users;
  const usersList = _.get(users, "usersList.data", []);

  if (isDeleted) {
    dispatch(fetchUsersAction());
  }

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
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Author
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          User Type
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Username
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Created Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {usersList?.map((user) => (
                        <tr className="bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <img
                            className="h-10 w-10 rounded-full"
                              src="https://via.placeholder.com/150"
                              alt="category profile"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.email}
                            <div class="flex flex-row">
                              <Link
                                to={`/update-profile/${user?.nhan_vien_id}`}
                              >
                                <div class="text-violet-600">Edit</div>
                              </Link>
                              <Link
                                onClick={() => dispatch(deleteUserAction(user?.nhan_vien_id))}
                              >
                                <div class="ml-2 text-red-600">{user?.trang_thai === 'active' ? 'Lock' : 'Delete'}</div>
                              </Link>
                              <Link
                                to={`/profile/${user?.nhan_vien_id}`}
                              >
                                <div class="ml-2 text-green-600">Detail</div>
                              </Link>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span className="inline-flex items-center px-3 py-0.5 rounded-lg text-sm font-medium text-gray-50 bg-purple-300">
                              {user?.nhom_nhan_vien?.ten_nhom}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.ten_tai_khoan}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.ten_nhan_vien}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.trang_thai}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {moment(user?.ngay_tao).format("DD MMM YYYY")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default UsersList;
