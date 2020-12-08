import withApollo from "@/hoc/withApollo";
import withAuth from "@/hoc/withAuth";
import { useRouter } from "next/router";
import BaseLayout from "@/layouts/BaseLayout";
import { Card, Button } from "react-bootstrap";
import { useGetUserPortfolios } from "@/apollo/actions";
import { getDataFromTree } from "@apollo/react-ssr";

const InstructorDashboard = () => {
  const { data } = useGetUserPortfolios();
  const userPortfolios = (data && data.userPortfolios) || [];

  const router = useRouter();

  return (
    <BaseLayout>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-12">
            <h1 className="page-title">Instructor Portfolios</h1>
            {userPortfolios.map((p) => (
              <Card key={p._id}>
                <Card.Header>{p.jobTitle}</Card.Header>
                <Card.Body>
                  <Card.Title>{p.title}</Card.Title>
                  <Card.Text>
                    {p.startDate} - {p.endDate}
                  </Card.Text>
                  <Button variant="primary">Go Somewhere</Button>
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
