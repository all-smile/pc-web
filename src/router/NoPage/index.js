export default {
  path: 'nopage',
  name: 'NoPage',
  meta: {
    keepAlive: false,
    title: '404'
  },
  component: () => import('@/pages/Main/no-page/index')
}
