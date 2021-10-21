import axios from 'axios';
export default {
  async addCoach(context, payload) {
    const userId = context.rootGetters.userId;
    const coachData = {
      id: context.rootGetters.userId,
      firstName: payload.first,
      lastName: payload.last,
      description: payload.desc,
      hourlyRate: payload.rate,
      areas: payload.areas
    };
    axios.put(
      `https://find-a-coach-71353-default-rtdb.firebaseio.com/coaches/${userId}.json`,
      coachData
    );

    //const responseData = await response.json();

    context.commit('addCoach', {
      ...coachData,
      id: userId
    });
  },
  async loadCoaches(context) {
    const response = await fetch(
      'https://find-a-coach-71353-default-rtdb.firebaseio.com/coaches.json'
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'failed to fetch!');
      throw error;
    }

    const coaches = [];

    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas
      };
      coaches.push(coach);
      context.commit('setCoaches', coaches);
    }
  }
};
