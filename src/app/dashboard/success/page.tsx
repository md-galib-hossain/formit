const SuccessPage = ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { userId, session_id } = searchParams;
  return (
    <div>
      <h2>
        Thank you for your Subscription- {userId} - {session_id}
      </h2>
    </div>
  );
};

export default SuccessPage;
