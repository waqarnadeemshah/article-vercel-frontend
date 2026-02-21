import { configureStore } from "@reduxjs/toolkit";
import authreducer from "../features/auth";
import articlereducer from "../features/article";
import userarticlereducer from "../features/userarticle";
const store = configureStore({
  reducer: {
    auth: authreducer,
    article: articlereducer,
    articleuser: userarticlereducer,
  },
});
export default store;
