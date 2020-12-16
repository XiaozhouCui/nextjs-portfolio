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

const useInitialData = () => {
  const router = useRouter();
  const { slug } = router.query;
  // topic data
  const { data: dataT } = useGetTopicBySlug({ variables: { slug } });
  // posts data
  const { data: dataP } = useGetPostsByTopic({ variables: { slug } });
  // user data
  const { data: dataU } = useGetUser();

  const topic = (dataT && dataT.topicBySlug) || {};
  const posts = (dataP && dataP.postsByTopic) || [];
  const user = (dataT && dataU.user) || null;

  return { topic, posts, user };
};

const PostPage = () => {
  const { topic, posts, user } = useInitialData();

  return (
    <BaseLayout>
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>{topic.title}</h1>
          </div>
        </div>
      </section>
      <Posts posts={posts} topic={topic} user={user} />
    </BaseLayout>
  );
};

const Posts = ({ posts, topic, user }) => {
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

    // once posted, scroll down to the bottom <div ref={pageEnd}></div>
    resetReplier();
    setReplierOpen(false);
    toast.success("Post has been updated", { autoClose: 3000 });
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
              <AppPagination />
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
