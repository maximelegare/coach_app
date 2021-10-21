<template>
  <div>
    <base-dialog
      :show="!!error"
      title="Something went wrong!"
      @close="handleError"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <base-card>
        <header>
          <h2>Requests Received</h2>
        </header>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasRequests">
          <request-item
            v-for="req in showRequests"
            :key="req.id"
            :email="req.userEmail"
            :message="req.userMessage"
          ></request-item>
        </ul>
        <h3 v-else>You haven't received any requests yet!</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import requestItem from '../../components/requests/RequestsItem.vue';
import BaseSpinner from '../../components/ui/BaseSpinner.vue';
export default {
  data() {
    return {
      error: null,
      isLoading: false
    };
  },
  components: {
    requestItem,
    BaseSpinner
  },
  created() {
    this.loadRequests();
  },
  computed: {
    showRequests() {
      return this.$store.getters['requests/requests'];
    },

    hasRequests() {
      return this.$store.getters['requests/hasRequests'];
    }
  },
  methods: {
    async loadRequests() {
      this.isLoading = true;
      console.log(this.isLoading);
      try {
        await this.$store.dispatch('requests/loadRequests');
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.isLoading = false;
      console.log(this.isLoading);
    },
    handleError() {
      this.error = null;
    }
  }
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
