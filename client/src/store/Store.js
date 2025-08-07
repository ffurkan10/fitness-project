import { configureStore } from "@reduxjs/toolkit";
import statReducer from "../features/stats/StatSlice";
import userReducer from "../features/users/UserSlice";
import modalReducer from "../features/modal/ModalSlice";
import layoutReducer from "../features/layout/LayoutSlice";
import membershipReducer from "../features/membership/MembershipSlice";
import nutritionReducer from "../features/nutrition/NutritionSlice";
import bodyFeatureReducer from "../features/body/BodyFeatureSlice";
import authReducer from "../features/auth/AuthSlice";
import notificationReducer from "../features/notification/NotificationSlice";
import lessonReducer from "../features/lesson/lessonSlice";

const Store = configureStore({
  reducer: {
    stats: statReducer,
    users: userReducer,
    modal: modalReducer,
    layout: layoutReducer,
    membership: membershipReducer,
    nutrition: nutritionReducer,
    bodyFeature: bodyFeatureReducer,
    auth: authReducer,
    notification: notificationReducer,
    lesson: lessonReducer
  },
});


export default Store;