export default {
  async contactCoach(context, payload) {
    console.log('in actions');
    const newRequest = {
      userEmail: payload.email,
      userMessage: payload.message
    };
    const response = await fetch(
      `https://find-a-coach-71353-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newRequest)
      }
    );

    if (!response.ok) {
        const error = new Error(responseData.message || 'Failed to send data!');
        throw error;
      }

    const responseData = await response.json();

    newRequest.id = responseData.name;
    newRequest.coachId = payload.coachId;

    context.commit('addRequest', newRequest);
  },
  async loadRequests(context) {
    const coachId = context.rootGetters.userId;
    const response = await fetch(
      `https://find-a-coach-71353-default-rtdb.firebaseio.com/requests/${coachId}.json`
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch data!');
      throw error;
    }

    const requests = [];

    for (const key in responseData) {
      const request = {
        id: key,
        coachId: coachId,
        userEmail: responseData[key].userEmail,
        userMessage: responseData[key].userMessage
      };
      requests.push(request);
    }
    context.commit('loadRequests', requests);
  }
};
