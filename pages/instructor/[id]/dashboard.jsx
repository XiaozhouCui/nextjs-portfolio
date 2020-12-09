import { Card, Button } from "react-bootstrap";
import { getDataFromTree } from "@apollo/react-ssr";
import Link from "next/link";

import withApollo from "@/hoc/withApollo";
import withAuth from "@/hoc/withAuth";
import BaseLayout from "@/layouts/BaseLayout";
import { useGetUserPortfolios, useDeletePortfolio } from "@/apollo/actions";
import { formatDate } from "@/utils/functions";

const InstructorDashboard = () => {
  const { data } = useGetUserPortfolios();
  const [deletePortfolio] = useDeletePortfolio();
  const userPortfolios = (data && data.userPortfolios) || [];

  return (
    <BaseLayout>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-12">
            <h1 className="page-title">Instructor Portfolios</h1>
            {userPortfolios.map((p) => (
              <Card key={p._id} className="mb-2">
                <Card.Header>{p.jobTitle}</Card.Header>
                <Card.Body>
                  <Card.Title>{p.title}</Card.Title>
                  <Card.Text>
                    {formatDate(p.startDate)} -{" "}
                    {p.endDate ? formatDate(p.endDate) : "Present"}
                  </Card.Text>
                  <Link
                    // dynamic url using next/link
                    href="/portfolios/[id]/edit"
                    as={`/portfolios/${p._id}/edit`}
                  >
                    <a className="btn btn-warning mr-1">Update</a>
                  </Link>
                  <Button
                    variant="danger"
                    onClick={() =>
                      deletePortfolio({ variables: { id: p._id } })
                    }
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default withApollo(
  withAuth(InstructorDashboard, ["admin", "instructor"]),
  { getDataFromTree } // render this page from server
);
