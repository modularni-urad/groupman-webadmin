export default `
<div>
  <div>
    <b-breadcrumb class="float-left">
      <b-breadcrumb-item to="/"><i class="fas fa-home"></i></b-breadcrumb-item>
      <b-breadcrumb-item active>Uživatelé</b-breadcrumb-item>
    </b-breadcrumb>

    <div class="float-right">
      <b-button v-if="$store.getters.isMember('group_admin')" variant="primary" @click="add">
        <i class="fas fa-plus"></i> Přidat
      </b-button>
    </div>

    <b-table small striped hover sort-icon-left no-local-sorting
      ref="table"
      primary-key="id"
      :current-page="currentPage"
      :per-page="perPage"
      :busy.sync="isBusy"
      :items="myProvider"
      :fields="fields"
    >
      <template v-slot:cell(manager)="data">
        {{ data.item.manager | username }}
      </template>
      <template v-slot:cell(username)="data">
        <a href="javascript:void(0)" v-on:click="edit(data.item)">
          {{ data.item.username }}
        </a>
      </template>
      <template v-slot:cell(status)="data">
        {{ data.item.status | status }}
      </template>
      <template v-slot:cell(actions)="data">
        <b-button size="sm" variant="primary" v-on:click="edit(data.item)">
          <i class="fas fa-edit"></i> upravit
        </b-button>
        <b-button size="sm" variant="success" v-on:click="addusers(data.item)">
          <i class="fas fa-edit"></i> přidat uživatele
        </b-button>
      </template>
    </b-table>

    <b-pagination v-model="currentPage"
      :total-rows="totalRows" :per-page="perPage">
    </b-pagination>

    <b-dropdown id="pagesize-dropup" dropup text="Velikost stránky"
      variant="primary" class="m-2">
      <b-dropdown-item @click="setPageSize(5)">5</b-dropdown-item>
      <b-dropdown-item @click="setPageSize(10)">10</b-dropdown-item>
      <b-dropdown-item @click="setPageSize(50)">50</b-dropdown-item>
    </b-dropdown>

    <b-modal size="xl" id="modal-add" title="Upravit" hide-footer>
      <item-form v-bind:onSubmit="onItemSubmit" v-bind:item="curr">
      </item-form>
    </b-modal>
    <b-modal size="xl" id="modal-addusers" title="Při" hide-footer>
      <adduser-form v-bind:item="curr"></adduser-form>
    </b-modal>    
  </div>
</div>
`
