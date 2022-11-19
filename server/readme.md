This is a template for an organized folder structure in accordance to lean and single use responsibility principles. Please insert the code as and when required and merge this when the first layer of dependencies are accurately inserted.
Continue to add code into the template and scale up keeping this framework in mind.

Here are some legends

models - Any database schema goes here. You can further categorize in sub folders

routes - Any api route handling with routers goes here. There should ideally be one router for every model.

controllers- Individual controllers for models with addition functional controllers as and when required. Eg- Auth is not a model but there is an authController to handle all auth related functions. Controllers are files that perform operation on our database collections. Every collection should ideally have a controller i.e controller per model.

utils- Utiliies i.e files that are needed by our controllers as dependencies. Eg- error handler, async error handler

services- All outbound requests from server go here. Eg-api calls to third party api.

Some general guidelines

1. Always comment parts of complex code to help with readability as and when required

2. Extract repetetive code in functions and classes and use them as and when required.

3. Keep it short and concise but prioritize readability of code.

4. Store sensetive data in environment variables.

5. Follow REST principles while defining routes. Eg- instead of router.post('/placeOrder', fn) and router.get('/getOrdrer, fn*) route define it as router.route('/order).get(fn).post(fn*)

6. Please ensure variable names are meaningful in the context.Eg: const x is ambiguous, const orderId is specific. Go with the latter. Same goes for functions and classes.

7. Keep functions short and modular. A single function should perform a single task.

8. DRY- Do not repeat yourself.

9. Use proper naming conventions. camelCase for javascript.

Note- These are guidelines and not a iron clad framework. Feel free to add and modify folder structures and files as per your requirement keeping the end goal and code simplicity, readability and maintainability in mind.

Happy coding!!
