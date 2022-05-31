import AccountH2Component from "~/components/header/account-h2.component";

const UserItem = () => {
  return (
    <tr className="border">
      <td className="border p-dimen-xs">20</td>
      <td className="border p-dimen-xs">John Doe</td>
      <td className="border p-dimen-xs">johndoe@gmail.com</td>
      <td className="border p-dimen-xs">09030572411</td>
      <td className="border p-dimen-xs">12th June, 2022</td>
      <td className="border p-dimen-xs">Active</td>
      <td className="border p-dimen-xs">
        <button className="table-danger-button">Deactivate</button>
      </td>
    </tr>
  );
}

export default function Users() {
  return (
    <div className="container">

      <AccountH2Component text="Users" />

      <section className="table-container">
      
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="border p-dimen-xs text-left">ID</th>
              <th className="border p-dimen-xs text-left">Full name</th>
              <th className="border p-dimen-xs text-left">Email</th>
              <th className="border p-dimen-xs text-left">Phone number</th>
              <th className="border p-dimen-xs text-left">Registered on</th>
              <th className="border p-dimen-xs text-left">Status</th>
              <th className="border p-dimen-xs text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            <UserItem />
            <UserItem />
            <UserItem />
            <UserItem />
          </tbody>
        </table>

      </section>
    </div>
  );
}
