import _sortBy from 'lodash.sortby';
import _chunk from 'lodash.chunk';
import database from './database';
import { SerializedLink } from './models';

interface CreateLinkParam {
  name: string;
  url: string;
}

const wait = (time: number) => new Promise((res) => setTimeout(res, time));

export async function createLink({
  name,
  url,
}: CreateLinkParam): Promise<SerializedLink> {
  await wait(1000);

  const prevLinks = database.getAllLinks();

  const hasLinkInDatabase =
    prevLinks.findIndex((prev) => prev.url === url) > -1;
  if (hasLinkInDatabase) {
    throw new Error('This link is available, please enter a different url.');
  }

  const newLink = database.createLink({
    name,
    url,
    downVoteCount: 0,
    upVoteCount: 0,
  });

  return newLink;
}

interface GetLinksParam {
  page: number;
  sortBy: 'score' | 'date';
  order: 'asc' | 'desc';
}

type PaginationResponse = {
  page: number;
  pageCount: number;
  values: SerializedLink[];
};

const LIMIT = 5;

export async function getLinks({
  order,
  page,
  sortBy,
}: GetLinksParam): Promise<PaginationResponse> {
  await wait(1000);

  if (page < 1) {
    throw new Error('page must be greater than 0.');
  }

  const links = database.getAllLinks();
  const sorterArray: (keyof SerializedLink)[] =
    sortBy === 'score' ? ['score', 'createdAt'] : ['createdAt', 'score'];

  let sortedLinks = _sortBy(links, sorterArray);

  if (order === 'asc') {
    sortedLinks = sortedLinks.reverse();
  }

  const pages = _chunk(sortedLinks, LIMIT).map((values, index) => ({
    values,
    page: index + 1,
  }));

  if (pages.length < page) {
    return {
      page,
      values: [],
      pageCount: pages.length,
    };
  }

  return {
    ...pages[page - 1],
    pageCount: pages.length,
  };
}
