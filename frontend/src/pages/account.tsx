// pages/account.tsx
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";
import { Layout } from "../components/Layout";

export default function Account() {
  const { address } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });
  return (
    <Layout>
      <div className="mt-4 p-4">
        <h1 className="text-2xl font-bold">Account check</h1>
        <div className="mt-4">
          {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
          {address && (
            <div>{ensName ? `${ensName} (${address})` : address}</div>
          )}
        </div>
      </div>
    </Layout>
  );
}
