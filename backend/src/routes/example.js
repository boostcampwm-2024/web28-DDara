/**
 * @swagger
 * /example:
 *   get:
 *     summary: Example endpoint
 *     description: Returns a simple "Hello World" message
 *     responses:
 *       200:
 *         description: Successful response
 */
app.get('/example', (req, res) => {
  res.send('Hello World');
});
