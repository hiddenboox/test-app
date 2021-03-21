import { getEnv } from "../../../../utils/getEnv";
import { pipe } from "../../../../utils/fn";

const USER_API_ENDPOINT = getEnv("REACT_APP_USER_API_ENDPOINT");

const pageOption = ({ page }) => (options) => {
  const url = new URL(options.url);

  url.searchParams.append("_page", page);

  return new Request(url, options);
};

const limitOption = ({ limit }) => (options) => {
  const url = new URL(options.url);

  url.searchParams.append("_limit", limit);

  return new Request(url, options);
};

const prepareOptions = ({ page, limit }) => {
  const fns = [];

  if (page) {
    fns.push(pageOption({ page }));
  }

  if (limit) {
    fns.push(limitOption({ limit }));
  }

  return pipe(...fns);
};

class UserService {
  constructor({ url }) {
    this.url = url;
  }

  list = async ({ page, limit } = {}) => {
    const req = new Request(this.url);
    const options = prepareOptions({ page, limit })(req);
    const response = await fetch(options);
    const json = await response.json();

    const totalCount = parseInt(response.headers.get("x-total-count"), 10);
    const link = response.headers
      .get("link")
      .split(",")
      .map((part) => part.split(";").map((str) => str.trim()))
      .reduce((acc, [link, direction]) => {
        const dir = /!?("\w+")/.exec(direction)[0];
        const url = link.slice(1, link.length - 1);
        return {
          ...acc,
          [dir]: url,
        };
      }, {});
    return {
      users: json,
      meta: {
        link,
        totalCount,
      },
    };
  };

  get = (email) => {
    const url = new URL(this.url);
    url.searchParams.append("email", email);

    return fetch(url)
      .then((response) => response.json())
      .then((users) => users[0]);
  };
}

export const userService = new UserService({ url: USER_API_ENDPOINT });
