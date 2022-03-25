import GroupMan from './components/grouplist.js'
import MembershipEditor from './components/member_editor.js'
import formconfig from './formconfig.js'
import { ROUTE_NAMES } from './consts.js'

export function createMenu (user) {
  return user.groups.indexOf('user_admins') >= 0
    ? { label: 'skupiny', to: { name: ROUTE_NAMES.list } }
    : null
}

export async function setupRoutes (routes, path, cfg, initConfig) {

  Object.assign(cfg, { 
    conf: formconfig,
    default_sort: 'slug:asc',
    idattr: 'slug'
  })

  await initConfig(cfg)

  routes.push({ 
    path, 
    name: ROUTE_NAMES.list, 
    component: GroupMan, 
    props: route => {
      return { query: route.query, cfg }
    }
  })

  const membershipEditorCfg = Object.assign({}, cfg, {})

  routes.push({ 
    path: `${path}:id`, 
    name: ROUTE_NAMES.members, 
    component: MembershipEditor, 
    props: route => {
      return { query: route.query, id: route.params.id, cfg: membershipEditorCfg }
    }
  })
}