import { gql } from "@apollo/client";

export const GET_PORTFOLIO = gql`
  query Portfolio($id: ID) {
    portfolio(id: $id) {
      title
      company
      companyWebsite
      location
      jobTitle
      description
      startDate
      endDate
    }
  }
`;
