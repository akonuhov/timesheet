/* ============
 * Getters for the authorization module
 * ============
 *
 * The getters that are available on the
 * authorization module.
 */

export default {
  getSelectSubdivisionWorkerGroup: state => name => {
    if (name) {
      return state.list.filter(item => item.subdivision_number === name)
    } else {
      return []
    }
  }
}
