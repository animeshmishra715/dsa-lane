const axios = require("axios");

/**
 * Fetch Codeforces rating for a given handle.
 * Returns the current rating (number) or null if not found / unrated.
 */
async function getCodeforcesRating(handle) {
    if (!handle || handle.trim() === "") return null;

    try {
        const res = await axios.get(
            `https://codeforces.com/api/user.info?handles=${encodeURIComponent(handle.trim())}`
        );

        if (res.data.status === "OK" && res.data.result.length > 0) {
            const rating = res.data.result[0].rating;
            return typeof rating === "number" ? rating : null; // unrated users have no rating field
        }

        return null;
    } catch (err) {
        console.log("Codeforces API error:", err.message);
        return null;
    }
}

/**
 * Fetch LeetCode contest rating for a given username.
 * Uses LeetCode's public GraphQL endpoint.
 * Returns the contest rating (number) or null if not found / unrated.
 */
async function getLeetcodeRating(username) {
    if (!username || username.trim() === "") return null;

    try {
        const query = `
            query userContestRankingInfo($username: String!) {
                userContestRanking(username: $username) {
                    rating
                }
            }
        `;

        const res = await axios.post("https://leetcode.com/graphql", {
            query,
            variables: { username: username.trim() }
        }, {
            headers: { "Content-Type": "application/json" }
        });

        const ranking = res.data?.data?.userContestRanking;

        if (ranking && typeof ranking.rating === "number") {
            return Math.round(ranking.rating);
        }

        return null;
    } catch (err) {
        console.log("LeetCode API error:", err.message);
        return null;
    }
}

/**
 * Fetch ratings from both platforms and return the average.
 * - If both ratings exist → average of both
 * - If only one exists → that rating
 * - If neither exists → 0 (will map to "Starter")
 */
async function getAverageRating(codeforcesHandle, leetcodeUsername) {
    const [cfRating, lcRating] = await Promise.all([
        getCodeforcesRating(codeforcesHandle),
        getLeetcodeRating(leetcodeUsername)
    ]);

    console.log(`Ratings fetched — CF: ${cfRating}, LC: ${lcRating}`);

    if (cfRating !== null && lcRating !== null) {
        return Math.round((cfRating + lcRating) / 2);
    }

    if (cfRating !== null) return cfRating;
    if (lcRating !== null) return lcRating;

    return 0;
}

module.exports = { getCodeforcesRating, getLeetcodeRating, getAverageRating };
