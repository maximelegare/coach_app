<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{invalid : !firstName.isVal}">
      <label for="firstname" >Fiststname</label>
      <input type="text" id="firstname" v-model.trim="firstName.val" @blur="clearValidity('firstName')"/>
    </div>
    <div class="form-control" :class="{invalid : !lastName.isVal}">
      <label for="lastname">Lastname</label>
      <input type="text" id="lastname" @blur="clearValidity('lastName')" v-model.trim="lastName.val"/>
    </div>
    <div class="form-control" :class="{invalid : !description.isVal}">
      <label for="description">Description</label>
      <textarea
        name=""
        id="description"
        cols="5"
        v-model.trim="description.val"
        @blur="clearValidity('description')"
      ></textarea>
    </div>
    <div class="form-control" :class="{invalid : !rate.isVal}">
      <label for="rate">Hourly Rate</label>
      <input type="number" id="rate" v-model.number="rate.val" @blur="clearValidity('rate')"/>
    </div>
    <div class="form-control" :class="{invalid : !areas.isVal}">
      <h3>Areas of Experties</h3>
      <div>
        <input type="checkbox" id="frontend" value="frontend" v-model="areas.val" @blur="clearValidity('areas')"/>
        <label for="frontend" :class="{'.invalid label' :firstName.isVal}">Frontend Development</label>
      </div>
      <div>
        <input type="checkbox" id="backend" value="backend" v-model="areas.val" />
        <label for="backend">Backend Development</label>
      </div>
      <div>
        <input type="checkbox" id="career" value="career" v-model="areas.val" />
        <label for="career">Career Advisory</label>
      </div>
    </div>
    <p v-if="!inputIsValid">Please fix the above errors and submit again.</p>
    <base-button>Register</base-button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      firstName: {
        val : '',
        isVal:true
      },
      lastName: {
        val:'',
        isVal:true
      },
      description: {
        val:'',
        isVal:true
      },
      rate: {
        val:null,
        isVal:true
      },
      areas: {
        val:[],
        isVal:true
      },
      inputIsValid:true
    };
  },
  methods:{
    clearValidity(input){
      this[input].isVal = true
      this.inputIsValid = true
    },
      validateForm(){
        this.formIsValid = true
        if(this.firstName.val === ''){
          this.firstName.isVal = false
          this.inputIsValid = false
        }
        if(this.lastName.val === ''){
          this.lastName.isVal = false
          this.inputIsValid = false
        }
        if(this.description.val === ''){
          this.description.isVal = false
          this.inputIsValid = false
        }
        if(!this.rate.val || this.rate.val < 0 ){
          this.rate.isVal = false
          this.inputIsValid = false
        }
        if(this.areas.val.length === 0){
          this.areas.isVal = false
          this.inputIsValid = false
        }
      },
      submitForm() {
        this.validateForm()

        if(!this.inputIsValid){
          console.log('cannot submit')
          return;
        }

        const formData = {
          first: this.firstName.val,
          last: this.lastName.val,
          desc: this.description.val,
          rate: this.rate.val,
          areas: this.areas.val
        };
        this.$emit('form-data', formData)
        this.$router.push('/coaches')
      } 
  }
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.error{
  color: red
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
