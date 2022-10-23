import React, { useEffect } from "react";
import _ from "lodash";
import { Link, useParams, Navigate } from "react-router-dom";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import LoadingComponent from "../../utils/LoadingComponent";
import {
  deletePostAction,
  fetchPostDetailsAction,
} from "../../redux/slices/posts/postActions";
import moment from "moment";
import baseUrl from "../../utils/baseURL";

const PostDetails = () => {
  // TODO: Add comments list
  const { id } = useParams();
  const dispatch = useDispatch();

  //select post details from store
  const post = useSelector((state) => state?.post);
  const { loading, appErr, serverErr, isDeleted } = post;
  const postDetails = _.get(post, "postDetails.data", {});
  const postImage = postDetails?.anh_dai_dien;

  console.log("postDetails", postDetails);
  useEffect(() => {
    dispatch(fetchPostDetailsAction(id));
  }, [id, dispatch]);

  //Get login user
  const user = useSelector((state) => state.users);
  const currentUser = _.get(user, "userAuth.data", {});

  const isCreatedBy = postDetails?.nguoi_tao === currentUser?.nhan_vien_id;
  if (isDeleted) return <Navigate to="/posts" />;
  return (
    <>
      {loading ? (
        <div className="h-screen">
          <LoadingComponent />
        </div>
      ) : appErr || serverErr ? (
        <h1 className="h-screen text-red-400 text-xl">
          {serverErr} {appErr}
        </h1>
      ) : (
        <section className="py-20 2xl:py-40 bg-gray-800 overflow-hidden">
          <div className="container px-4 mx-auto">
            {/* Post Image */}
            <img
              className="mb-24 w-full h-96 object-cover"
              src={
                postImage
                  ? `${baseUrl}/${postImage}`
                  : "https://via.placeholder.com/150"
              }
              alt=""
            />
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="mt-7 mb-14 text-6xl 2xl:text-7xl text-white font-bold font-heading">
                {postDetails?.tieu_de}
              </h2>
              <p class="text-gray-500 mb-14">{postDetails?.mo_ta}</p>
              {/* User */}
              <div className="inline-flex pt-14 mb-14 items-center border-t border-gray-500">
                <div className="text-left">
                  <h4 className="mb-1 text-2xl font-bold text-gray-50">
                    <span className="text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-yellow-200 to-orange-600 ">
                      {postDetails?.nguoi_tao}
                    </span>
                  </h4>
                  <p className="text-gray-500">
                    {moment(postDetails?.ngay_tao).format("DD MMM YYYY")}
                  </p>
                </div>
              </div>
              {/* Post description */}
              <div class="max-w-xl mx-auto">
                <p class="mb-6 text-left  text-xl text-gray-200">
                  {
                    <div
                      dangerouslySetInnerHTML={{
                        __html: postDetails?.noi_dung,
                      }}
                    />
                  }
                  {/* Show delete and update  if it was created by the user */}
                  {isCreatedBy ? (
                    <p class="flex">
                      <Link to={`/update-post/${postDetails?.tin_tuc_id}`} class="p-3">
                        <PencilAltIcon class="h-8 mt-3 text-yellow-300" />
                      </Link>
                      <button
                        onClick={() =>
                          dispatch(deletePostAction(postDetails?.tin_tuc_id))
                        }
                        class="ml-3"
                      >
                        <TrashIcon class="h-8 mt-3 text-red-600" />
                      </button>
                    </p>
                  ) : null}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default PostDetails;
