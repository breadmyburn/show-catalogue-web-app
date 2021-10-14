const express = require("express");
const showModel = require("./../models/show");
const router = express.Router();

router.get('/new', (req, res) => {
    res.render('shows/new', { show: new showModel() });
})

router.get('/edit/:id', async (req, res) => {
    const show = await showModel.findById(req.params.id);
    res.render('shows/edit', { show: show });
})

router.get('/:slug', async(req, res) => {
    const show = await showModel.findOne({ slug: req.params.slug });
    if (show == null) res.redirect('/');
    res.render('shows/show', { show: show });
})

router.post('/', async(req, res, next) => {
    req.show = new showModel();
    next();
}, saveAndRedirect('new'))

router.put('/:id', async (req, res, next) => {
    req.show = await showModel.findById(req.params.id);
    next();
}, saveAndRedirect('edit'))

router.delete('/:id', async (req, res) => {
    await showModel.findByIdAndDelete(req.params.id);
    res.redirect('/');
})

function saveAndRedirect(path) {
    return async (req, res) => {
        let show = req.show;
        show.title = req.body.title;
        show.genres = req.body.genres;
        show.studios = req.body.studios;
        show.type = req.body.type;
        show.status = req.body.status;
        show.episodes = req.body.episodes;
        show.duration = req.body.duration;
        show.image = req.body.image;
        show.banner = req.body.banner;
        show.synopsis = req.body.synopsis;
        try {
            show = await show.save();
            res.redirect(`/shows/${show.slug}`);
        } catch (e) {
            res.render(`shows/${path}`, { show: show });
        }
    }
}

module.exports = router;