import BaseLayout from "@/layouts/BaseLayout";

const CV = () => {
  return (
    <BaseLayout>
      <div className="row mt-4">
        <div className="col-md-8 offset-md-2">
          <iframe
            style={{ width: "100%", minHeight: "800px" }}
            src="/Joe_CV.pdf"
            frameBorder="0"
          ></iframe>
        </div>
      </div>
    </BaseLayout>
  );
};

export default CV;
