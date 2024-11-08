type ProfilePicture = {
  uri: string;
};

type ProfileMetadata = {
  bio: string;
  coverPicture?: {
    optimized?: ProfilePicture;
    raw?: ProfilePicture;
    transformed?: ProfilePicture;
  };
  picture?: {
    optimized?: ProfilePicture;
  };
};

export type Profile = {
  id: string;
  handle: {
    namespace: string;
    localName: string;
  };
  createdAt: string;
  metadata: ProfileMetadata;
  ownedBy: {
    address: string;
    chainId: string;
  };
};
