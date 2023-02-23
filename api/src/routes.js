const { Router } = require('express');
const router = Router();
const ContactController = require('./app/controllers/ContactController');
const CategoryController = require('./app/controllers/CategoryController');

module.exports = router;

router.get(
  '/contacts',
  (request, response, next) => {
    request.appId = 'MeuAppID';
    next();
  },
  ContactController.index,
);

router.get('/contacts/:id', ContactController.show);
router.delete('/contacts/:id', ContactController.delete);
router.post('/contacts', ContactController.store);
router.put('/contacts/:id', ContactController.update);
router.get('/categories', CategoryController.index);
router.post('/categories', CategoryController.store);
