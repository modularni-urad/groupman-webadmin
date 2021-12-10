// import UserSelect from './userselect.js'

export default {
  data: () => {
    return {
      memberships: [],
      members: [],
      data: { user: null }
    }
  },
  computed: {
    statusOpts: () => _.map(STATUS_LABELS, (v, k) => ({ value: k, text: v }))
  },
  props: ['query', 'cfg', 'id'],
  async created () {    
    const mshipReq = await this.$store.dispatch('send', { method: 'get', url: this.cfg.url + this.id })
    this.memberships = mshipReq.data
    const membersReqs = await Promise.all(this.memberships.map(i => {
      return this.$store.dispatch('send', { method: 'get', url:`${this.cfg.userinfo_url}${i}` })
    }))
    this.members = membersReqs.map(i => i.data)
  },
  // components: { UserSelect },
  methods: {
    remove: async function (row) {
      await this.$store.dispatch('send', { method: 'delete', url:`${this.cfg.url}${this.id}/mship/${row.id}` })
      const idx = this.members.indexOf(row)
      this.members.splice(idx, 1)
    },
    onUserSelect: async function (user) {
      await this.$store.dispatch('send', { method: 'post', url: `${this.cfg.url}${this.id}/${user.id}` })
      this.members.push(user)
    }
  },
  template: `
  <div class="row">
    <div class="col-sm-6">
      <h1>skupina {{ id }}</h1>
      <h3>přidat člena</h3>
      <form>
        <user-select :config="cfg" :onUserSelect="onUserSelect" />
      </form>
      <h3>členové</h3>
      <ul>
        <li v-for="row,idx in members" :key="idx">
          {{ row.name }} <b-button @click="remove(row)">x</b-button>
        </li>
      </ul>
    </div>
  </div>
  `
}
