// models/recommendation.js
import { model, models, Schema } from "mongoose";

const RecommendationSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, auto: true, },
    userId: { type: Schema.Types.ObjectId, required: true },
    bookName: { type: String, required: true },
    recommendationName: { type: String, required: true, unique: true },
})

const Recommendation = models.Recommendation || model("Recommendation", RecommendationSchema);
Recommendation.schema.set('collection', 'Recommendations');

export default Recommendation;