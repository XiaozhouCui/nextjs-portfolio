import { useState, useRef } from "react";
import { getDataFromTree } from "@apollo/react-ssr";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import withApollo from "@/hoc/withApollo";
import BaseLayout from "@/layouts/BaseLayout";
import PostItem from "@/components/forum/PostItem";
import {
  useGetTopicBySlug,
  useGetPostsByTopic,
  useGetUser,
  useCreatePost,
} from "@/apollo/actions";
import Replier from "@/components/shared/Replier";
import AppPagination from "@/components/shared/Pagination";

const useInitialData = (pagination) => {
  const router = useRouter();
  const { slug } = router.query;
  // fetch topic data with apollo/client
  const { data: dataT } = useGetTopicBySlug({ variables: { slug } });
  // fetch posts data
  // fetchMore() is returned from apollo/client useQuery()
  const { data: dataP, fetchMore } = useGetPostsByTopic({
    variables: { slug, ...pagination }, // pagination: {pageNum: 1, pageSize: 5}
  });
  // fetch user data with apollo/client
  const { data: dataU } = useGetUser();

  const topic = (dataT && dataT.topicBySlug) || {};
  // postsData includes posts:[post] and count:Int
  const postsData = (dataP && dataP.postsByTopic) || { posts: [], count: 0 };
  const user = (dataT && dataU.user) || null;

  return { topic, ...postsData, user, fetchMore };
};

const PostPage = () => {
  const [pagination, setPagination] = useState({ pageNum: 1, pageSize: 5 });
  const { topic, posts, ...rest } = useInitialData(pagination);

  return (
    <BaseLayout>
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>{topic.title}</h1>
          </div>
        </div>
      </section>
      <Posts
        posts={posts}
        topic={topic}
        {...rest}
        {...pagination}
        onPageChange={(pageNum, pageSize) => {
          setPagination({ pageNum, pageSize });
        }}
      />
    </BaseLayout>
  );
};

const Posts = ({
  posts,
  topic,
  user,
  fetchMore,
  count,
  pageSize,
  pageNum,
  onPageChange,
}) => {
  const pageEnd = useRef();
  const [createPost, { error }] = useCreatePost();
  const [isReplierOpen, setReplierOpen] = useState(false);
  const [replyTo, setReplyTo] = useState(null);

  const handleCreatePost = async (reply, resetReplier) => {
    if (replyTo) {
      // append original opst if it is a reply
      reply.parent = replyTo._id;
    }

    // append topic to reply arg
    reply.topic = topic._id;
    await createPost({ variables: reply });

    // use fetchMore() to immediately re-render, alternative approach to cache
    // fetchMore() will send a second async gql request
    await fetchMore({
      updateQuery: (previousResults, { fetchMoreResult }) => {
        return Object.assign({}, previousResults, {
          // postsByTopic comes from apollo query POSTS_BY_TOPIC
          postsByTopic: [...fetchMoreResult.postsByTopic],
        });
      },
    });

    resetReplier();
    cleanup();
  };

  const cleanup = () => {
    setReplierOpen(false);
    toast.success("Post has been updated", { autoClose: 3000 });
    // once posted, scroll down to the bottom <div ref={pageEnd}></div>
    scrollToBottom();
  };

  const scrollToBottom = () => {
    pageEnd.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="pb-5">
      <div className="jc-post-list">
        {topic._id && <PostItem post={topic} className="topic-post-lead" />}

        {posts.map((post) => (
          <div key={post._id} className="row">
            <div className="col-md-9">
              <PostItem
                post={post}
                canCreate={user !== null}
                onReply={(reply) => {
                  setReplyTo(reply);
                  setReplierOpen(true);
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="row mt-2 mx-0">
        <div className="col-md-9">
          <div className="posts-bottom">
            {user && (
              <div className="pt-2 pb-2">
                <button
                  className="btn btn-lg btn-outline-primary"
                  onClick={() => {
                    setReplyTo(null);
                    setReplierOpen(true);
                  }}
                >
                  Create New Post
                </button>
              </div>
            )}
            <div className="pagination-container ml-auto">
              <AppPagination
                count={count}
                pageSize={pageSize}
                pageNum={pageNum}
                onChange={onPageChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div ref={pageEnd}></div>
      <Replier
        onSubmit={handleCreatePost}
        isOpen={isReplierOpen}
        hasTitle={false}
        replyTo={(replyTo && replyTo.user.username) || topic.title}
        onClose={() => setReplierOpen(false)}
      />
    </section>
  );
};

export default withApollo(PostPage, { getDataFromTree });
