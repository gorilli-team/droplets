export const convertIpfsToHttp = (ipfsUrl: string) => {
  if (!ipfsUrl) return "";
  let result = ipfsUrl.replace("ipfs://", "https://gw.ipfs-lens.dev/ipfs/");
  result = ipfsUrl.replace(
    "https://lens.infura-ipfs.io/ipfs",
    "https://gw.ipfs-lens.dev/ipfs/"
  );
  return result;
};
