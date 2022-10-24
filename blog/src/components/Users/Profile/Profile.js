import { useEffect } from "react";
import _ from "lodash";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingComponent from "../../../utils/LoadingComponent";
import moment from "moment";
import { userProfileAction } from "../../../redux/slices/users/usersActions";
import baseUrl from "../../../utils/baseURL";

export default function Profile(props) {
  const { id } = useParams();
  const dispatch = useDispatch();

  //User data from store
  const users = useSelector((state) => state.users);
  const { profileLoading, profileAppErr, profileServerErr } = users;
  const userAuth = _.get(users, "userAuth.data", {});
  const profile = _.get(users, "profile.data", {});

  //fetch user profile
  useEffect(() => {
    console.log('Profile')
    dispatch(userProfileAction(id));
  }, [id, dispatch]);

  return (
    <>
      <div className="min-h-screen bg-green-600 justify-center items-center">
        {profileLoading ? (
          <LoadingComponent />
        ) : profileAppErr || profileServerErr ? (
          <h2 className="text-yellow-400 text-2xl">
            {profileServerErr} {profileAppErr}
          </h2>
        ) : (
          <div className="h-screen flex overflow-hidden bg-white">
            {/* Static sidebar for desktop */}

            <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
              <div className="flex-1 relative z-0 flex overflow-hidden">
                <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
                  <article>
                    {/* Profile header */}
                    <div>
                      <div>
                        <img
                          className="h-32 w-full object-cover lg:h-48"
                          src={
                            profile?.anh_dai_dien
                              ? `${baseUrl}/${profile?.anh_dai_dien}`
                              : "https://exam-admin.web5days.com/static/media/defaultUser.4aa827c3440249505e81.jpg"
                          }
                          alt={profile?.ten_nhan_vien}
                        />
                      </div>
                      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                          <div className="flex -mt-20">
                            <img
                              className="h-24 w-24 rounded-full  ring-4 ring-white sm:h-32 sm:w-32"
                              src={
                                profile?.anh_dai_dien
                                  ? `${baseUrl}/${profile?.anh_dai_dien}`
                                  : "https://exam-admin.web5days.com/static/media/defaultUser.4aa827c3440249505e81.jpg"
                              }
                              alt={profile?.ten_nhan_vien}
                            />
                          </div>
                          <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                            <div className=" flex flex-col 2xl:block mt-10 min-w-0 flex-1">
                              <h1 className="text-2xl font-bold text-gray-900 uppercase">
                                {profile?.ten_nhan_vien}
                              </h1>
                              <div class="my-2">
                                {/* Display if verified or not */}
                                {profile?.trang_thai ? (
                                  <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-600 text-gray-300">
                                    Active
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-red-600 text-gray-300">
                                    Inactive
                                  </span>
                                )}
                              </div>
                              <p className=" text-lg">
                                Date Joined: {""}
                                {moment(profile?.ngay_tao).format(
                                  "DD MMM YYYY"
                                )}
                              </p>

                              {/* is login user */}
                            </div>
                          </div>
                        </div>
                        <div className="hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1">
                          <p class="leading-normal text-size-sm">
                            {profile?.gioi_thieu ||
                              `Hi, I'm Alec Thompson, Decisions: If you can't
                            decide, the answer is no. If two equally difficult
                            paths, choose the one more painful in the short term
                            (pain avoidance is creating an illusion of
                            equality).`}
                          </p>
                          <hr class="h-px my-6 bg-transparent bg-gradient-horizontal-light" />
                          <ul class="flex flex-col pl-0 mb-0 rounded-lg">
                            <li class="relative block px-4 py-2 pt-0 pl-0 leading-normal bg-white border-0 rounded-t-lg text-size-sm text-inherit">
                              <strong class="text-slate-700">
                                Account Type:
                              </strong>{" "}
                              &nbsp; {profile?.nhom?.ten_nhom}
                            </li>
                            <li class="relative block px-4 py-2 pl-0 leading-normal bg-white border-0 border-t-0 text-size-sm text-inherit">
                              <strong class="text-slate-700">Mobile:</strong>{" "}
                              &nbsp; {profile?.so_dien_thoai}
                            </li>
                            <li class="relative block px-4 py-2 pl-0 leading-normal bg-white border-0 border-t-0 text-size-sm text-inherit">
                              <strong class="text-slate-700">Email:</strong>{" "}
                              &nbsp; {profile?.email}
                            </li>
                            <li class="relative block px-4 py-2 pl-0 leading-normal bg-white border-0 border-t-0 text-size-sm text-inherit">
                              <strong class="text-slate-700">Gender:</strong>{" "}
                              &nbsp; {profile?.gioi_tinh === 1 ? "Nam" : "Nữ"}
                            </li>
                            <li class="relative block px-4 py-2 pb-0 pl-0 bg-white border-0 border-t-0 rounded-b-lg text-inherit">
                              <strong class="leading-normal text-size-sm text-slate-700">
                                Address:
                              </strong>{" "}
                              &nbsp;
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </article>
                </main>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
