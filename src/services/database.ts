import { LinkModel, SerializedLink } from './models';

const LOCAL_STORAGE_KEY = 'HEPSIBURADA_LINK_VOTE';

class Database {
  createLink = (link: Omit<LinkModel, 'createdAt' | 'id' | 'score'>) => {
    const links = this._getAllLinks();
    const createdLink: LinkModel = {
      ...link,
      id: link.url,
      createdAt: new Date().toISOString(),
      score: 0,
    };

    links.push(createdLink);

    this.setLocalStorage(links);

    return this.serialize(createdLink);
  };

  updateLink = (
    id: string,
    params: Partial<Omit<LinkModel, 'id' | 'createdAt'>>,
  ) => {
    this.setLocalStorage(
      this._getAllLinks().map((link) => {
        if (link.id !== id) {
          return link;
        }

        return {
          ...link,
          ...params,
        };
      }),
    );
  };

  deleteLink = (id: string) => {
    this.setLocalStorage(this._getAllLinks().filter((link) => link.id !== id));
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

  private serialize = (link: LinkModel): SerializedLink => ({
    ...link,
    createdAt: new Date(link.createdAt),
    // createdAt: new Date(),
  });
}

const database = new Database();

export default database;
