/* ============
 * Getters for the authorization module
 * ============
 *
 * The getters that are available on the
 * authorization module.
 */

import Transformer from '../../../utilities/transformers/api/workers/list'

export default {
  getSelectSubdivisionWorkerGroup: state => name => {
    if (name) {
      let stateListCopy = Transformer.get(state.list)
      return stateListCopy.filter(item => item.subdivision_number === name)
    } else {
      return []
    }
  }
}
