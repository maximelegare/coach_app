<template>
  <section>
    <base-card>
      <h2>Register as a Coach now!</h2>
      <coach-form @form-data="AddCoachVuex"></coach-form>
    </base-card>
  </section>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';
import BaseCard from '../../components/ui/BaseCard.vue';

export default {
  components: { CoachForm, BaseCard },
  methods:{
    AddCoachVuex(formData){
      this.$store.dispatch('coaches/addCoach', formData)
    }
  }
};
</script>
