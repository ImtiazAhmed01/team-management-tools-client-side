import axios from "axios";
const extractMentions = (text) => {
    const mentionRegex = /@([a-zA-Z0-9_]+)/g;
    const mentions = [];
    let match;
    while ((match = mentionRegex.exec(text)) !== null) {
        mentions.push(match[1]);
    }
    return mentions;
};
const sendMentionNotifications = async (comment, taskId, senderName) => {
    try {
        const { data: users } = await axios.get("https://teammanagementtools.vercel.app/user");
        const mentions = extractMentions(comment);
        if (mentions.length === 0) return;
        const mentionedUsers = users.filter((user) => mentions.includes(user.fullName));
        if (mentionedUsers.length === 0) return;
        const notificationPromises = mentionedUsers.map((user) => {
            const notificationData = {
                email: user.email,
                subject: `You were mentioned in a task comment`,
                message: `${senderName} mentioned you in a comment on task "${taskId}":\n\n"${comment}"\n\nCheck it out at: [Your App URL]/tasks/${taskId}`,
            };
            return axios.post("https://teammanagementtools.vercel.app/send-email", notificationData);
        });
        await Promise.all(notificationPromises);
        console.log("Notifications sent successfully to:", mentionedUsers.map(u => u.email));
    } catch (error) {
        console.error("Error sending mention notifications:", error);
    }
};

export default sendMentionNotifications;