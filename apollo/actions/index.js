import { useLazyQuery, useQuery, useMutation } from "@apollo/client";
import {
  GET_PORTFOLIOS,
  GET_PORTFOLIO,
  GET_USER_PORTFOLIOS,
  CREATE_PORTFOLIO,
  UPDATE_PORTFOLIO,
  DELETE_PORTFOLIO,
  SIGN_UP,
  SIGN_IN,
  SIGN_OUT,
  GET_USER,
  FORUM_CATEGORIES,
  TOPICS_BY_CATEGORY,
  CREATE_TOPIC,
  TOPIC_BY_SLUG,
} from "@/apollo/queries";

// Apollo Client hooks
// const [getPortfolios, { loading, data }] = useLazyQuery(GET_PORTFOLIOS); // lazyquery to be used with useEffect.
export const useGetPortfolios = () => useQuery(GET_PORTFOLIOS);

export const useGetPortfolio = (options) => useQuery(GET_PORTFOLIO, options);

export const useGetUserPortfolios = () => useQuery(GET_USER_PORTFOLIOS);

// no need to pass in portfolio ID here, apollo can figure it out
export const useUpdatePortfolio = () =>
  useMutation(UPDATE_PORTFOLIO, { errorPolicy: "all" });

// use cache option: immediately update page when clicked
export const useDeletePortfolio = () =>
  useMutation(DELETE_PORTFOLIO, {
    errorPolicy: "all",
    // "deletePortfolio" is the deleted portfolio object
    update(cache, { data: { deletePortfolio } }) {
      const { userPortfolios } = cache.readQuery({
        query: GET_USER_PORTFOLIOS,
      });
      const newPortfolios = userPortfolios.filter(
        (p) => p._id !== deletePortfolio
      );
      cache.writeQuery({
        query: GET_USER_PORTFOLIOS,
        // data is the same as data in Portfolios component const { data } = useGetPortfolios();
        data: { userPortfolios: newPortfolios },
      });
    },
  });

export const useCreatePortfolio = () =>
  useMutation(CREATE_PORTFOLIO, {
    errorPolicy: "all",
    // update(cache, { data: { createPortfolio } }) {
    //   // get old portfolios from cache
    //   const { portfolios } = cache.readQuery({ query: GET_PORTFOLIOS });
    //   // add newly created portfolio into cache
    //   cache.writeQuery({
    //     query: GET_PORTFOLIOS, // re-run getPortfolios query
    //     data: { portfolios: [...portfolios, createPortfolio] },
    //   });
    // },
  });

// Auth actions start -----------------------

export const useSignUp = () => useMutation(SIGN_UP, { errorPolicy: "all" });

// to immediately update login status on NavBar, need to use cache
export const useSignIn = () =>
  useMutation(SIGN_IN, {
    errorPolicy: "all",
    // "signIn" is the signed in user object
    update(cache, { data: { signIn } }) {
      cache.writeQuery({
        query: GET_USER,
        // "data" here is the same as the "data" in login component const [signIn, { data, error }] = useSignIn();
        data: { user: signIn },
      });
    },
  });

export const useSignOut = () => useMutation(SIGN_OUT);

export const useLazyGetUser = () => useLazyQuery(GET_USER);

export const useGetUser = () => useQuery(GET_USER);

// Auth actions end -----------------------

// Forum actions start -----------------------

export const useGetForumCategories = () => useQuery(FORUM_CATEGORIES);

export const useGetTopicsByCategory = (options) =>
  useQuery(TOPICS_BY_CATEGORY, options);

export const useGetTopicBySlug = (options) => useQuery(TOPIC_BY_SLUG, options);

export const useCreateTopic = () =>
  useMutation(CREATE_TOPIC, {
    update(cache, { data: { createTopic } }) {
      try {
        const { topicsByCategory } = cache.readQuery({
          query: TOPICS_BY_CATEGORY,
          variables: { category: createTopic.forumCategory.slug },
        });
        cache.writeQuery({
          query: TOPICS_BY_CATEGORY,
          data: { topicsByCategory: [...topicsByCategory, createTopic] },
          variables: { category: createTopic.forumCategory.slug },
        });
      } catch (e) {}
    },
  });

// Forum actions end -----------------------
