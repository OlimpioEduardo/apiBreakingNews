import NewsRepositories from "../repositories/news.repositories.js";

async function createNewsService({ title, banner, text }, userId) {
  if (!title || !banner || !text)
    throw new Error("Submit all fields for registration");

  const { id } = await NewsRepositories.createNewsRepository(
    title,
    banner,
    text,
    userId
  );

  return {
    message: "Post created successfully!",
    post: { id, title, banner, text },
  };
}

async function findAllNewsService(limit, offset, currentUrl) {
  limit = Number(limit);
  offset = Number(offset);

  if (!limit) {
    limit = 5;
  }

  if (!offset) {
    offset = 0;
  }

  const news = await NewsRepositories.findAllNewsRepository(offset, limit);

  const total = await NewsRepositories.countNews();

  const next = offset + limit;
  const nextUrl =
    next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

  const previous = offset - limit < 0 ? null : offset - limit;
  const previousUrl =
    previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null;

  news.shift();

  return {
    nextUrl,
    previousUrl,
    limit,
    offset,
    total,

    results: news.map((news) => ({
      id: news._id,
      title: news.title,
      banner: news.banner,
      text: news.text,
      likes: news.likes,
      comments: news.comments,
      name: news.user.name,
      username: news.user.username,
      avatar: news.user.avatar,
    })),
  };
}

async function topNewsService() {
  const news = await NewsRepositories.topNewsRepository();

  if (!news) throw new Error("There is no registered post");

  return {
    news: {
      id: news._id,
      title: news.title,
      banner: news.banner,
      text: news.text,
      likes: news.likes,
      comments: news.comments,
      name: news.user.name,
      username: news.user.username,
      avatar: news.user.avatar,
    },
  };
}

async function searchNewsService(title) {
  const foundNews = await NewsRepositories.searchNewsRepository(title);

  if (foundNews.length === 0)
    throw new Error("There are no posts with this title");

  return {
    foundNews: foundNews.map((news) => ({
      id: news._id,
      title: news.title,
      banner: news.banner,
      text: news.text,
      likes: news.likes,
      comments: news.comments,
      name: news.user.name,
      username: news.user.username,
      avatar: news.user.avatar,
    })),
  };
}

async function findNewsByIdService(id) {
  const news = await NewsRepositories.findNewsByIdRepository(id);

  if (!news) throw new Error("Post not found");

  return {
    id: news._id,
    title: news.title,
    banner: news.banner,
    text: news.text,
    likes: news.likes,
    comments: news.comments,
    name: news.user.name,
    username: news.user.username,
    avatar: news.user.avatar,
  };
}

async function findNewsByUserIdService(id) {
  const news = await NewsRepositories.findNewsByUserIdRepository(id);

  return {
    newsByUser: news.map((news) => ({
      id: news._id,
      title: news.title,
      banner: news.banner,
      text: news.text,
      likes: news.likes,
      comments: news.comments,
      name: news.user.name,
      username: news.user.username,
      avatar: news.user.avatar,
    })),
  };
}

async function updateNewsService(id, title, banner, text, userId) {
  if (!title && !banner && !text)
    throw new Error("Submit at least one field to update the post");

  const news = await NewsRepositories.findNewsByIdRepository(id);

  if (!news) throw new Error("Post not found");

  if (news.user._id != userId) throw new Error("You didn't create this post");

  await NewsRepositories.updateNewsRepository(id, title, banner, text);
}

async function deleteNewsService(id, userId) {
  const news = await NewsRepositories.findNewsByIdRepository(id);

  if (!news) throw new Error("Post not found");

  if (news.user._id != userId) throw new Error("You didn't create this post");

  await NewsRepositories.deleteNewsRepository(id);
}

async function likeNewsService(id, userId) {
  const newsLiked = await newService.likesService(id, userId);

  if (postLiked.lastErrorObject.n === 0) {
    await newService.likesDeleteService(id, userId);
    return { message: "Like successfully removed" };
  }

  return { message: "Like done successfully" };
}

async function commentNewsService(postId, message, userId) {
  if (!message) throw new Error("Write a message to comment");

  const news = await NewsRepositories.findNewsByIdRepository(postId);

  if (!news) throw new Error("Post not found");

  await NewsRepositories.commentsRepository(postId, message, userId);
}

async function commentDeleteNewsService(postId, userId, idComment) {
  const news = await NewsRepositories.findNewsByIdRepository(postId);

  if (!news) throw new Error("Post not found");

  await NewsRepositories.commentsDeleteRepository(postId, userId, idComment);
}

export default {
  createNewsService,
  findAllNewsService,
  topNewsService,
  searchNewsService,
  findNewsByIdService,
  findNewsByUserIdService,
  updateNewsService,
  deleteNewsService,
  likeNewsService,
  commentNewsService,
  commentDeleteNewsService,
}; 