export default function ProfileDLItemComponent(
  { heading, body }: { heading: string, body: any }
) {
  return (
    <div className="flex gap-x-dimen-sm mb-dimen-md shadow p-dimen-sm rounded-lg">
      <dt className="font-bold">{ heading }:</dt>
      <dd>{ body }</dd>
    </div>
  );
}
