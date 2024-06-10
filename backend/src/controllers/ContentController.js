const Annotations = require('../models/AnnotationData');

module.exports = {

    async update(request, response) {
        const { id } = request.params;
        const { title, notes } = request.body;

        const annotation = await Annotations.findOne({ _id : id });

        if (notes) {
            annotation.notes = notes;

            await annotation.save();
        }

        if (title) {
            annotation.title = title;

            await annotation.save();
        }

        return response.json({annotation});
    }

}