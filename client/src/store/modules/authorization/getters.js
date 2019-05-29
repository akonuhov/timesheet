/* ============
 * Getters for the authorization module
 * ============
 *
 * The getters that are available on the
 * authorization module.
 */

export default {
  isLoggedIn: state => !!state.token,
  authStatus: state => state.status
}
