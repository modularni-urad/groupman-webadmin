import Actions from './actions.js'

export default {
  props: ['query', 'cfg'],
  components: { Actions },
  template: `
  <ACListView :query="query" :cfg="cfg">
    <template v-slot:tbody="{ items, fields, doEdit }">

      <tr v-for="row,rowidx in items" :key="rowidx">
        <td>{{ row.slug }}</td>
        <td>{{ row.name }}</td>
        <td>{{ row.created | datetime }}</td>
        <Actions key="actions" :doEdit="doEdit" :row="row" :cfg="cfg" />
      </tr>

    </template>
  </ACListView>
  `
}
