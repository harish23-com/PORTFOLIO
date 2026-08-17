const singletonController = (Model) => ({
  get: async (req, res, next) => {
    try {
      let doc = await Model.findOne();
      if (!doc) {
        return res.status(200).json({ success: true, data: {} });
      }
      res.status(200).json({ success: true, data: doc });
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      let doc = await Model.findOne();
      if (!doc) {
        doc = await Model.create(req.body);
      } else {
        doc = await Model.findByIdAndUpdate(doc._id, req.body, {
          new: true,
          runValidators: true,
        });
      }
      res.status(200).json({ success: true, data: doc });
    } catch (error) {
      next(error);
    }
  },
});

const listController = (Model, options = {}) => ({
  getAll: async (req, res, next) => {
    try {
      const filter = {};
      if (options.filterableFields) {
        options.filterableFields.forEach((field) => {
          if (req.query[field]) filter[field] = req.query[field];
        });
      }
      const sortField = options.sortField || 'order';
      const docs = await Model.find(filter).sort(sortField);
      res.status(200).json({ success: true, count: docs.length, data: docs });
    } catch (error) {
      next(error);
    }
  },
  getOne: async (req, res, next) => {
    try {
      const doc = await Model.findById(req.params.id);
      if (!doc) return res.status(404).json({ success: false, message: 'Not found' });
      res.status(200).json({ success: true, data: doc });
    } catch (error) {
      next(error);
    }
  },
  create: async (req, res, next) => {
    try {
      const doc = await Model.create(req.body);
      res.status(201).json({ success: true, data: doc });
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!doc) return res.status(404).json({ success: false, message: 'Not found' });
      res.status(200).json({ success: true, data: doc });
    } catch (error) {
      next(error);
    }
  },
  remove: async (req, res, next) => {
    try {
      const doc = await Model.findByIdAndDelete(req.params.id);
      if (!doc) return res.status(404).json({ success: false, message: 'Not found' });
      res.status(200).json({ success: true, message: 'Deleted successfully' });
    } catch (error) {
      next(error);
    }
  },
});

module.exports = { singletonController, listController };
