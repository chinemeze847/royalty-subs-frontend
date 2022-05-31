
const Detail = ({ heading, body }: { heading: string, body: string }) => {
  return (
    <div className="flex gap-x-dimen-sm mb-dimen-md shadow p-dimen-sm rounded-lg">
      <dt className="font-bold">{ heading }:</dt>
      <dd>{ body }</dd>
    </div>
  );
}

export default function Transaction() {
  return (
    <section>

      <dl>
        <Detail heading="Reference" body="RYL_83JJDS883" />
        <Detail heading="Amount" body="NGN 200.00" />
        <Detail heading="Type" body="Deposit" />
        <Detail heading="Status" body="Approved" />
        <Detail heading="Date" body="12th June, 2022" />
      </dl>

    </section>
  );
}
