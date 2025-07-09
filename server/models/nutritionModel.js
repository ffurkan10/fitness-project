const mongoose = require('mongoose');

const nutritionProgramSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    totalKcal: { 
        type: String, 
        required: true 
    }, 
    totalProtein: { 
        type: String, 
        required: true 
    },
    totalCarbs: { 
        type: String, 
        required: true 
    }, 
    totalOil: { 
        type: String, 
        required: true 
    }, 
    mealsByTime: [
        {
        title: { type: String, required: true }, //! "Kahvaltı", "Öğle" vs.
        meals: [
            {
            id: Number,               //! Sıralama için kullanılabilir
            name: String,             //! "Yumurta"
            kcal: String,             //! "70"
            scale: String             //! "1 adet"
            }
        ]
        }
    ]
}, { timestamps: true });

const Nutrition = mongoose.model('Nutrition', nutritionProgramSchema);
module.exports = Nutrition;
