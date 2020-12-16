import { useState } from "react";
import { getDataFromTree } from "@apollo/react-ssr";
import { useRouter } from "next/router";
import withApollo from "@/hoc/withApollo";
import BaseLayout from "@/layouts/BaseLayout";
import PostItem from "@/components/forum/PostItem";
import {
  useGetTopicBySlug,
  useGetPostsByTopic,
  useGetUser,
} from "@/apollo/actions";
import Replier from "@/components/shared/Replier";

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
  const [isReplierOpen, setReplierOpen] = useState(false);
  const [replyTo, setReplyTo] = useState(null);

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
          </div>
        </div>
      </div>
      <Replier
        onSubmit={() => {}}
        isOpen={isReplierOpen}
        hasTitle={false}
        replyTo={(replyTo && replyTo.user.username) || topic.title}
        onClose={() => setReplierOpen(false)}
      />
    </section>
  );
};

export default withApollo(PostPage, { getDataFromTree });
