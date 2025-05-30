const ArticleModel = require("../models/article");

module.exports = {
    createArticle: async (req, res) => {
        const {title, description, body, shortName, category, imageUrl} = req.body;

        try {
            const article = new ArticleModel({
                title,
                description,
                shortName,
                body,
                creator: req.user._id,
                category,
                imageUrl,
                isPublished: true,
            });

            await article.save();

            const populatedArticle = await ArticleModel.findById(article._id)
                .populate("creator", "-password")
                .lean();

            return res.status(201).json(populatedArticle);
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            })
        }
    },
    getAllArticle: async (req, res) => {
        try {
            const articles = await ArticleModel.find()
                .populate("creator", "name")
                .sort({_id: -1})
                .lean()

            return res.json(articles);
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            })
        }
    },
    getArticleById: async (req, res) => {
        const {id} = req.params;

        try {
            const article = await ArticleModel.findById(id)
                .populate("category")
                .populate("creator", "-password")
                .lean();

            if (!article) {
                return res.status(404).json({
                    success: false,
                    message: "No article with this id"
                })
            }

            res.json(article);
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            })
        }
    },
    remove: async (req, res) => {
        const deletedArticle = await ArticleModel.findByIdAndDelete(req.params.id);

        if (!deletedArticle) {
            return res.status(404).json({
                success: false,
                message: "Article Not Found!"
            });
        }

        return res.json(deletedArticle);
    },
}

