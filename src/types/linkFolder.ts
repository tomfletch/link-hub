type Link = {
  id: string;
  url: string;
  name: string;
};

export type LinkFolder = {
  id: string,
  userId: string,
  parentLinkFolderId: string | null;
  name: string;
  createdAt: string;
  updatedAt: string;
  links: Link[];
};
