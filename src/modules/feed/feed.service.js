import {
  findFollowingIdsByUserId,
  findRecentMediaStatusesByUsers,
  findRecentReviewsByUsers,
} from "./feed.repository.js";

const getFeedService = async (userId) => {
  const following = await findFollowingIdsByUserId(userId);

  const followingIds = following.map((item) => item.followingId);

  if (followingIds.length === 0) {
    return [];
  }

  const [reviews, mediaStatuses] = await Promise.all([
    findRecentReviewsByUsers(followingIds),
    findRecentMediaStatusesByUsers(followingIds),
  ]);

  const reviewActivities = reviews.map((review) => ({
    id: `review-${review.id}`,
    type: "REVIEW",
    createdAt: review.createdAt,
    user: review.user,
    media: review.media,
    review: {
      id: review.id,
      rating: review.rating,
      content: review.content,
    },
  }));

  const statusActivities = mediaStatuses.map((mediaStatus) => ({
    id: `status-${mediaStatus.id}`,
    type: "MEDIA_STATUS",
    createdAt: mediaStatus.createdAt,
    user: mediaStatus.user,
    media: mediaStatus.media,
    status: mediaStatus.status,
  }));

  const feed = [...reviewActivities, ...statusActivities]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 40);

  return feed;
};

export { getFeedService };