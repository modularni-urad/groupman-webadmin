export default `
<ValidationObserver v-slot="{ invalid }">
  <form @submit.prevent="handleSubmit">
    <div class="row">
      <div class="col-sm-12">

        <validation-provider rules="required" v-slot="{ errors }">
          <b-form-group :state="errors.length === 0" label="Jméno"
            label-for="name-input" :invalid-feedback="errors[0]"
          >
            <b-form-input id="name-input" v-model="name"
              :state="errors.length === 0" :disabled="disabled">
            </b-form-input>
          </b-form-group>
        </validation-provider>

      </div>
    </div>

    <div class="row">
      <div class="col-sm-12">

        <validation-provider rules="required" v-slot="{ errors }">
          <b-form-group :state="errors.length === 0" label="Jméno"
            label-for="slug-input" :invalid-feedback="errors[0]"
          >
            <b-form-input id="slug-input" v-model="slug"
              :state="errors.length === 0" :disabled="disabled">
            </b-form-input>
          </b-form-group>
        </validation-provider>

      </div>
    </div>

    <b-button v-if="!disabled" type="submit" class="mt-3" block :disabled="invalid">
      Save
    </b-button>
  </form>
</ValidationObserver>
`
