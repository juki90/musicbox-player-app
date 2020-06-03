declare module "react-router-dom";

type Item = {
  id: number;
  added: Date;
  link: string;
  title: string;
  desc: string;
};

type StateProps = {
  collection: Item[];
};
