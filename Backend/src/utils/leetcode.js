import axios from "axios";

export const fetchLeetCodeSubmissions = async (username) => {
    const query = `
    query recentAcSubmissions($username: String!, $limit: Int!) {
      recentAcSubmissionList(username: $username, limit: $limit) {
        title
        titleSlug
        timestamp
      }
    }`;

    try {
        const response = await axios.post("https://leetcode.com/graphql", {
            query,
            variables: { username, limit: 20 }
        });
        return response.data.data.recentAcSubmissionList;
    } catch (error) {
        console.error("LeetCode Fetch Error:", error);
        return [];
    }
};