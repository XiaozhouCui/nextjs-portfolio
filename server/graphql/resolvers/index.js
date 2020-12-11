exports.portfolioQueries = {
  // ctx is the context from apolloServer
  portfolio: (root, { id }, ctx) => {
    // Portfolio is the gql model
    return ctx.models.Portfolio.getById(id);
  },
  portfolios: (root, args, ctx) => {
    return ctx.models.Portfolio.getAll();
  },
  userPortfolios: (root, args, ctx) => {
    return ctx.models.Portfolio.getAllByUser();
  },
};

exports.portfolioMutations = {
  createPortfolio: async (root, { input }, ctx) => {
    const createdPortfolio = await ctx.models.Portfolio.create(input);
    return createdPortfolio;
  },
  updatePortfolio: async (root, { id, input }, ctx) => {
    const updatedPortfolio = await ctx.models.Portfolio.findAndUpdate(
      id,
      input
    );
    return updatedPortfolio;
  },
  deletePortfolio: async (root, { id }, ctx) => {
    const deletedPortfolio = await ctx.models.Portfolio.findAndDelete(id);
    return deletedPortfolio._id;
  },
};

exports.userQueries = {
  // ctx is the apolloServer context
  user: (root, args, ctx) => {
    // User is the gql model
    return ctx.models.User.getAuthUser(ctx);
  },
};

exports.userMutations = {
  // User is the gql model
  signUp: async (root, { input }, ctx) => {
    const registeredUser = await ctx.models.User.signUp(input);
    return registeredUser._id;
  },
  signIn: (root, { input }, ctx) => {
    return ctx.models.User.signIn(input, ctx);
  },
  signOut: (root, args, ctx) => {
    return ctx.models.User.signOut(ctx);
  },
};

exports.forumQueries = {
  forumCategories: async (root, args, ctx) => {
    return ctx.models.ForumCategory.getAll();
  },
  topicsByCategory: async (root, { category }, ctx) => {
    // search for cagegory by slug
    const forumCategory = await ctx.models.ForumCategory.getBySlug(category);
    if (!forumCategory) return null;
    return ctx.models.Topic.getAllByCategory(forumCategory._id);
  },
};
