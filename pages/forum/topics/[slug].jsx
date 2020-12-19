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

const useInitialData = (slug, pagination) => {
  // fetch topic data with apollo/client
  const { data: dataT } = useGetTopicBySlug({ variables: { slug } });
  // fetch posts data
  // fetchMore() is returned from apollo/client useQuery()
  const { data: dataP, fetchMore } = useGetPostsByTopic({
    variables: { slug, ...pagination }, // pagination: {pageNum: 1, pageSize: 5}
    // re-fetch data every 60 seconds to check if there is a new post added by others
    pollInterval: 60000,
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
  const router = useRouter();
  // query string (?pageNum=1&pageSize=5) has been added to URL by onPageChange()
  const { slug, pageNum = 1, pageSize = 5 } = router.query;
  const [pagination, setPagination] = useState({
    pageNum: parseInt(pageNum, 10),
    pageSize: parseInt(pageSize, 10),
  });
  const { topic, posts, ...rest } = useInitialData(slug, pagination);

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
          router.push(
            "/forum/topics/[slug]",
            `/forum/topics/${slug}?pageNum=${pageNum}&pageSize=${pageSize}`,
            { shallow: true } // don't fetch data
          );
          setPagination({ pageNum, pageSize });
        }}
      />
    </BaseLayout>
  );
};

const Posts = ({ posts, topic, user, fetchMore, ...pagination }) => {
  // ...pagination: {count, pageSize, pageNum, onPageChange}
  const pageEnd = useRef();
  const [createPost, { error }] = useCreatePost();
  const [isReplierOpen, setReplierOpen] = useState(false);
  const [replyTo, setReplyTo] = useState(null);
  const { pageSize, count, pageNum } = pagination;

  const handleCreatePost = async (reply, resetReplier) => {
    if (replyTo) {
      // append original opst if it is a reply
      reply.parent = replyTo._id;
    }

    // append topic to reply arg
    reply.topic = topic._id;
    await createPost({ variables: reply });

    const lastPage = count === 0 ? 1 : Math.ceil(count / pageSize);

    // use fetchMore() to immediately re-render, this is an alternative approach to cache
    // fetchMore() will send a second async gql request
    lastPage === pageNum &&
      (await fetchMore({
        // only fetch data for the last page
        variables: { pageSize, pageNum: lastPage },
        updateQuery: (previousResults, { fetchMoreResult }) => {
          return Object.assign({}, previousResults, {
            // postsByTopic comes from apollo query POSTS_BY_TOPIC
            postsByTopic: { ...fetchMoreResult.postsByTopic },
          });
        },
      }));

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
        {topic._id && pagination.pageNum === 1 && (
          <PostItem post={topic} className="topic-post-lead" />
        )}

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
              <AppPagination {...pagination} />
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
