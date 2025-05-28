import NewsService from "../services/news.service.js";

async function createNewsController(req, res) {
  const { title, banner, text } = req.body;
  const userId = req.userId;

  try {
    const news = await NewsService.createNewsService(
      { title, banner, text },
      userId 
    );
    return res.status(201).send(news);
    
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function findAllNewsController(req, res) {
  const { limit, offset } = req.query;
  const currentUrl = req.baseUrl;

  try {
    const news = await NewsService.findAllNewsService(
      limit,
      offset,
      currentUrl
    );
    return res.send(news);
  } catch (e) {
    res.status(500).send(e.message);
  }
}

async function topNewsController(req, res) {
  try {
    const news = await NewsService.topNewsService();
    return res.send(news);
  } catch (e) {
    res.status(500).send(e.message);
  }
}

async function searchNewsController(req, res) {
  const { title } = req.query;

  try {
    const foundNews = await NewsService.searchNewsService(title);

    return res.send(foundNews);
  } catch (e) {
    res.status(500).send(e.message);
  }
}

async function findNewsByIdController(req, res) {
  const { id } = req.params;

  try {
    const news = await NewsService.findNewsByIdService(id);
    return res.send(news);
  } catch (e) {
    res.status(404).send(e.message);
  }
}

async function findNewsByUserIdController(req, res) {
  const id = req.userId;
  try {
    const news = await NewsService.findNewsByUserIdService(id);
    return res.send(news);
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

async function updateNewsController(req, res) {
  const { title, banner, text } = req.body;
  const { id } = req.params;
  const userId = req.userId;

  try {
    await NewsService.updateNewsService(id, title, banner, text, userId);

    return res.send({ message: "Post successfully updated!" });
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

async function deleteNewsController(req, res) {
  const { id } = req.params;
  const userId = req.userId;

  try {
    await NewsService.deleteNewsService(id, userId);
    return res.send({ message: "Post deleted successfully" });
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

async function likesNewsController(req, res) {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const response = await NewsService.likeNewsService(id, userId);

    return res.send(response);
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

async function commentNewsController(req, res) {
  const { id: newsId } = req.params;
  const { message } = req.body;
  const userId = req.userId;

  try {
    await NewsService.commentNewsService(newsId, message, userId);

    return res.send({
      message: "Comment successfully completed!",
    });
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

async function commentDeleteNewsController(req, res) {
  const { id: newsId, idComment } = req.params;
  const userId = req.userId;

  try {
    await NewsService.commentDeleteNewsService(newsId, userId, idComment);

    return res.send({ message: "Comment successfully removed" });
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

export default {
  createNewsController,
  findAllNewsController,
  topNewsController,
  searchNewsController,
  findNewsByIdController,
  findNewsByUserIdController,
  updateNewsController,
  deleteNewsController,
  likesNewsController,
  commentNewsController,
  commentDeleteNewsController,
};