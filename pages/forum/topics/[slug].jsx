import { getDataFromTree } from "@apollo/react-ssr";
import { useRouter } from "next/router";
import withApollo from "@/hoc/withApollo";
import BaseLayout from "@/layouts/BaseLayout";
import PostItem from "@/components/forum/PostItem";
import { useGetTopicBySlug, useGetPostsByTopic } from "@/apollo/actions";

const useInitialData = () => {
  const router = useRouter();
  const { slug } = router.query;
  // topic data
  const { data: dataT } = useGetTopicBySlug({ variables: { slug } });
  // posts data
  const { data: dataP } = useGetPostsByTopic({ variables: { slug } });

  const topic = (dataT && dataT.topicBySlug) || {};
  const posts = (dataP && dataP.postsByTopic) || [];

  return { topic, posts };
};

const Posts = () => {
  const { topic, posts } = useInitialData();

  return (
    <BaseLayout>
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>{topic.title}</h1>
          </div>
        </div>
      </section>
      <section>
        <div className="jc-post-list">
          {topic._id && <PostItem post={topic} className="topic-post-lead" />}

          {posts.map((post) => (
            <div key={post._id} className="row">
              <div className="col-md-9">
                <PostItem post={post} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </BaseLayout>
  );
};

export default withApollo(Posts, { getDataFromTree });
