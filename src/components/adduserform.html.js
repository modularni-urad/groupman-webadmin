export default `
<form @submit.prevent="handleSubmit">

  <div class="row">
    <div class="col-sm-6">

        <b-form-group label="NEčlenové" label-for="name-input">
          <b-form-select :options="available" value-field="id" text-field="name"
            :select-size="10" v-on:change="addMember">
          </b-form-select>
        </b-form-group>

    </div>

    <div class="col-sm-6">

        <b-form-group label="členové" label-for="name-input">
          <b-form-select :options="members" value-field="id" text-field="name" 
            :select-size="10" v-on:change="removeMember">
          </b-form-select>
        </b-form-group>

    </div>
  </div>

</form>
`
