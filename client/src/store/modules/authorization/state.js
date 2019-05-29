/* ============
 * State of the authorization module
 * ============
 *
 * The initial state of the authorization module.
 */

export default {
  status: null,
  token: localStorage.getItem('token') || null,
  userId: null
}
