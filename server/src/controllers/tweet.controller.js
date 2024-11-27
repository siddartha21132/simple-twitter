import Tweet from "../models/tweet.js";
import Profile from "../models/profile.js";

// Utility function to remove circular references
function removeCircularReferences(obj) {
  const seen = new Set();
  return JSON.parse(JSON.stringify(obj, (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return; // Skip circular references
      }
      seen.add(value);
    }
    return value;
  }));
}

export const getTweet = async (req, res) => {
  const { id, page } = req.query;
  const limit = 10;
  const total = page * limit;

  if (id) {
    const tweet = await Tweet.find({ _id: id });
    res.send(removeCircularReferences(tweet)); // Use the utility function here
  } else {
    const tweets = await Tweet.find({
      $or: [{ type: "tweet" }, { type: "retweet" }],
    })
      .sort("-createdAt")
      .limit(total);
    res.send(removeCircularReferences(tweets)); // Use the utility function here
  }
};

export const getFollowingTweets = async (req, res) => {
  const { page } = req.query;
  const user = req.user;
  const limit = 10;
  const total = page * limit;

  const tweet = await Tweet.find({
    author: { $in: [...user.following, user._id] },
    $or: [{ type: "tweet" }, { type: "retweet" }],
  })
    .sort("-createdAt")
    .limit(total);

  res.send(removeCircularReferences(tweet)); // Use the utility function here
};

export const getProfileTweets = async (req, res) => {
  const { username } = req.query;
  const profile = await Profile.find({ username: username });
  const tweets = await Tweet.find({ author: profile[0]._id }).sort("-createdAt");

  res.send(removeCircularReferences(tweets)); // Use the utility function here
};

export const newTweet = async (req, res) => {
  const { body } = req.body;
  const user = req.user;

  const tweet = await Tweet.create({
    type: "tweet",
    body: body,
    author: user,
  });

  await user.tweet(tweet);
  res.send(removeCircularReferences(tweet)); // Use the utility function here
};

export const deleteTweet = async (req, res) => {
  const { id } = req.query;
  const profile = req.user;
  profile.deleteTweet(id);

  Tweet.deleteOne({ _id: id })
    .then(async (result) => {
      res.send(removeCircularReferences(result)); // Use the utility function here
    })
    .catch((err) => res.status(err.code).json({ Errors: [{ msg: err }] }));
};

export const editTweet = async (req, res) => {
  const { id } = req.query;
  const { body } = req.body;
  const user = req.user;

  const tweet = await Tweet.findOne({ _id: id });
  await user.editTweet(tweet, body);
  res.send(removeCircularReferences(tweet)); // Use the utility function here
};

export const likeTweet = async (req, res) => {
  const { id } = req.query;
  const profile = req.user;

  const tweet = await Tweet.findOne({ _id: id });
  await profile.like(tweet);
  res.send(removeCircularReferences(tweet)); // Use the utility function here
};

export const unlikeTweet = async (req, res) => {
  const { id } = req.query;
  const profile = req.user;

  const tweet = await Tweet.findOne({ _id: id });
  await profile.unlike(tweet);
  res.send(removeCircularReferences(tweet)); // Use the utility function here
};

export const retweet = async (req, res) => {
  const { id } = req.query;
  const profile = req.user;
  const tweet = await Tweet.findOne({ _id: id });
  await profile.retweet(tweet);
  res.send(removeCircularReferences(profile)); // Use the utility function here
};

export const newReply = async (req, res) => {
  const { id } = req.query;
  const { body } = req.body;
  const profile = req.user;
  const tweet = await Tweet.findOne({ _id: id });
  const reply = await Tweet.create({
    type: "reply",
    body: body,
    author: profile,
  });
  await profile.newReply(tweet, reply);
  res.send(removeCircularReferences(reply)); // Use the utility function here
};

export const deleteReply = async (req, res) => {
  const { tweetId, commentId } = req.query;
  const tweet = await Tweet.find({ _id: tweetId });
  res.send(removeCircularReferences(tweet)); // Use the utility function here
};
