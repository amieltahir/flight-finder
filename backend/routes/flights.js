// backend/routes/flights.js

export default async function flightRoutes (fastify, options) {
    //health check route
fastify.get('/', async (request, reply) => {

    return { message: 'Flight Finder API is running'};
});

// Main search route
  fastify.post('/search', async (request, reply) => {
    const {
      origin,
      destination,
      departureDate,
      returnDate,
      isRoundTrip,
      budget,
      enableBudget,
    } = request.body;

    // Temporary response (mock)
    return {
      success: true,
      data: {
        origin,
        destination,
        departureDate,
        returnDate,
        isRoundTrip,
        budget: enableBudget ? budget : 'Not applied',
      },
      note: '🔧 Connect this to a real flight API (e.g., Skyscanner, Amadeus)',
    };
  });

}
















