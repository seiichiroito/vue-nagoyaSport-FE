import { createApp } from "vue";
import App from "./App.vue";

import "./index.css";

const app = createApp(App);

// Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(fas);
app.component("font-awesome-icon", FontAwesomeIcon);

// Router
import { router } from "./router";

app.use(router);

app.mount("#app");
