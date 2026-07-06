import { useMsal } from "@azure/msal-react";

const Dashboard = () => {
  const { accounts } = useMsal();

  return (
    <div>
      {accounts.length > 0 &&
                <h3>
                    Welcome {accounts[0].name}
                </h3>
            }
      <div>Dashboard</div>
    </div>
  )
}

export default Dashboard
