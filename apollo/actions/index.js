import { useLazyQuery, useQuery, useMutation } from "@apollo/client";
import {
  GET_PORTFOLIOS,
  CREATE_PORTFOLIO,
  UPDATE_PORTFOLIO,
  DELETE_PORTFOLIO,
  SIGN_UP,
  SIGN_IN,
  GET_USER,
} from "@/apollo/queries";

// Apollo Client hooks
// const [getPortfolios, { loading, data }] = useLazyQuery(GET_PORTFOLIOS); // lazyquery to be used with useEffect.
export const useGetPortfolio = () => useQuery(GET_PORTFOLIOS);

// no need to pass in portfolio ID here, apollo can figure it out
export const useUpdatePortfolio = () => useMutation(UPDATE_PORTFOLIO);

// use cache option: immediately update page when clicked
export const useDeletePortfolio = () =>
  useMutation(DELETE_PORTFOLIO, {
    // "deletePortfolio" is the deleted portfolio object
    update(cache, { data: { deletePortfolio } }) {
      const { portfolios } = cache.readQuery({ query: GET_PORTFOLIOS });
      const newPortfolios = portfolios.filter((p) => p._id !== deletePortfolio);
      cache.writeQuery({
        query: GET_PORTFOLIOS,
        // data is the same as data in Portfolios component const { data } = useGetPortfolio();
        data: { portfolios: newPortfolios },
      });
    },
  });

export const useCreatePortfolio = () =>
  useMutation(CREATE_PORTFOLIO, {
    update(cache, { data: { createPortfolio } }) {
      // get old portfolios from cache
      const { portfolios } = cache.readQuery({ query: GET_PORTFOLIOS });
      // add newly created portfolio into cache
      cache.writeQuery({
        query: GET_PORTFOLIOS, // re-run getPortfolios query
        data: { portfolios: [...portfolios, createPortfolio] },
      });
    },
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
        // "data" here is the same as the "data" in NavBar's const [getUser, { data, error }] = useLazyGetUser();
        data: { user: signIn },
      });
    },
  });

export const useLazyGetUser = () => useLazyQuery(GET_USER);

// Auth actions end -----------------------
