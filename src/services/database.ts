import { LinkModel, SerializedLink } from './models';

const LOCAL_STORAGE_KEY = 'HEPSIBURADA_LINK_VOTE';

class Database {
  createLink = (link: Omit<LinkModel, 'createdAt'>) => {
    const links = this._getAllLinks();
    const createdLink: LinkModel = {
      ...link,
      createdAt: new Date().toString(),
    };

    links.push(createdLink);

    this.setLocalStorage(links);

    return this.serialize(createdLink);
  };

  getAllLinks = () => this._getAllLinks().map(this.serialize);

  private _getAllLinks = (): LinkModel[] => {
    const dataString = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (!dataString) {
      this.setLocalStorage([]);
      return [];
    }

    return JSON.parse(dataString);
  };

  private setLocalStorage = (data: LinkModel[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  };
  private serialize = (link: LinkModel): SerializedLink => {
    return {
      ...link,
      createdAt: new Date(link.createdAt),
      score: link.upVoteCount - link.downVoteCount,
    };
  };
}

const database = new Database();

export default database;
