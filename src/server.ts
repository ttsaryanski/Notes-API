import app from "./app.js";
import mongooseInit from "./config/mongooseInit.js";

const PORT = 3000;

mongooseInit().then(() => {
    app.listen(PORT, () =>
        console.log(`Server running on http://localhost:${PORT}`)
    );
});
