<template>
  <form @submit.prevent="sendMessage">
    <div class="form-control">
      <label for="email">Your Email</label>
      <input type="email" id="email" v-model.trim="email" />
    </div>
    <div class="form-control">
      <label for="message">Your message</label>
      <textarea id="message" rows="5" v-model.trim="message"></textarea>
    </div>
    <p class="errors" v-if="!inputIsValid">
      please fix the above errors and submit again
    </p>
    <div class="actions">
      <base-button>Send Message</base-button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      message: '',
      inputIsValid: true
    };
  },
  methods: {
    validation() {
      this.imputIsValid = true;

      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.message === ''
      ) {
        this.inputIsValid = false;
      }
    },
    sendMessage() {
      this.validation();
      if (this.inputIsValid === false) {
        return;
      }

      const messageData = {
        coachId: this.$route.params.coachId,
        email: this.email,
        message: this.message
      };
      this.$store.dispatch('requests/contactCoach', messageData);
      this.$router.replace('/coaches')
      
      
    }
  }
};
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>
