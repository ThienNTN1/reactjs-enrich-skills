import React from "react";
import { Link } from "react-router-dom";
import { MailIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import baseUrl from "../../../utils/baseURL";
import moment from "moment";

const UsersListItem = (user) => {
  //dispatch
  const dispatch = useDispatch();
  return (
    <>
      <div className="p-8 mb-4 bg-white shadow rounded">
        <div className="flex flex-wrap items-center -mx-4">
          <div className="w-full lg:w-3/12 flex px-4 mb-6 lg:mb-0">
            <img
              className="w-10 h-10 mr-4 object-cover rounded-full"
              // src={"https://exam-admin.web5days.com/static/media/defaultUser.4aa827c3440249505e81.jpg"}
              src={
                user?.user?.anh_dai_dien
                  ? `${baseUrl}/${user?.user?.anh_dai_dien}`
                  : "https://exam-admin.web5days.com/static/media/defaultUser.4aa827c3440249505e81.jpg"
              }
              alt="profile "
            />
            <div>
              <p className="text-sm font-medium">{user?.user?.ten_nhan_vien}</p>
              <p className="text-xs text-gray-500">{user?.user?.email}</p>
            </div>
          </div>
          <div className="w-1/2 lg:w-2/12 px-4 mb-6 lg:mb-0">
            <span className="inline-flex items-center px-3 py-0.5 rounded-lg text-sm font-medium text-gray-50 bg-purple-300">
              {user?.user?.nhom_nhan_vien?.ten_nhom}
            </span>
          </div>
          <div className="w-1/2 lg:w-2/12 px-4 mb-6 lg:mb-0">
            <p className="text-sm font-medium">
              Username:{" "}
              <span className="text-base mr-2  text-bold text-yellow-500">
                {user.user?.ten_tai_khoan}
              </span>
            </p>
          </div>
          <div className="w-full flex lg:w-4/12 px-4  mb-6 lg:mb-0">
            <p className="inline-block py-1 px-2 mr-2 mb-1 lg:mb-0 text-xs">
              Name:{" "}
              <span className="text-base mr-2 text-bold text-yellow-500">
                {user.user?.ten_nhan_vien}
              </span>
            </p>
          </div>
          <div className="w-1/2 lg:w-2/12 px-4 mb-6 lg:mb-0">
            <p className="text-sm font-medium">
              Status:{" "}
              <span className="text-base mr-2  text-bold text-yellow-500">
                {user.user?.trang_thai}
              </span>
            </p>
          </div>
          <div className="w-full lg:w-1/12 px-4">
            <div className="flex items-center">
            <p className="text-sm font-medium">
              Created Date:{" "}
              <span className="text-base mr-2  text-bold text-yellow-500">
                {moment(user.user?.ngay_tao).format("DD MMM YYYY")}
              </span>
            </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersListItem;
