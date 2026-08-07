const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [
            true,
            "Title is required"
        ]
    },
    numberOfPages: {
        type: Number,
        required: [
            true,
            "Pages is required"
        ]
    }    
}, { timestamps: true });