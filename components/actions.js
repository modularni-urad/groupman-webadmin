import { ROUTE_NAMES } from '../consts.js'

export default {
  props: ['doEdit', 'cfg', 'row'],
  computed: {
    muzuUpravit: function () {
      return this.$store.getters.isMember(this.row.group)
    }
  },
  methods: {
    showMembers: function (i) {
      this.$router.push({ name: ROUTE_NAMES.members, params: { id: i.slug } })
    }
  },
  template: `
  <td>
    <b-button-group>
      <b-button size="sm" variant="primary" @click="doEdit(row)">
        <i class="fas fa-edit"></i> upravit
      </b-button>
      <b-button size="sm" variant="secondary" @click="showMembers(row)">
        <i class="fas fa-users"></i> členové
      </b-button>
    </b-button-group>
  </td>
  `
}
