
export const randomImage = (num) => {
    const option = ["notes", "books", "3d", "life", "study", "cars", "files"]
    return `https://source.unsplash.com/random/?${option[num]}`
}


export const getTimeAgo = (timestamp) => {
    const now = new Date();
    const givenTime = new Date(timestamp);
    const diff = (now - givenTime) / 1000; // Calculate difference in seconds

    if (diff < 60) {
        return `${Math.floor(diff)}s ago`;
    } else if (diff < 3600) {
        return `${Math.floor(diff / 60)}m ago`;
    } else if (diff < 86400) {
        return `${Math.floor(diff / 3600)}h ago`;
    } else {
        return `${Math.floor(diff / 86400)}d ago`;
    }
}

