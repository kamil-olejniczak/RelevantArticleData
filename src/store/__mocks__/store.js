const state = {
    article: {
        recentlyVisited: ['111', '222', '333', '444']
    }
};
const store = {
    getState: () => (state),
    fillUpArray: () => {
        state.article.recentlyVisited.push(555);
    }
};

export default store;