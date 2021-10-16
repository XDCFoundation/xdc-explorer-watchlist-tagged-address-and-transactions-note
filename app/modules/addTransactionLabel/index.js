import Utils from '../../utils'
import { apiSuccessMessage, httpConstants } from '../../common/constants'
import BLManager from './manger'

export default class Index {
  async addTransactionLabel (request, response) {
    // lhtWebLog('Inside testRoute', request.body, 'testRoute', 0, '')
    const [error, getMetersRes] = await Utils.parseResponse(new BLManager().addTransactionLabel(request.body))
    if (!getMetersRes) { return Utils.handleError(error, request, response) }
    return Utils.response(response, getMetersRes, apiSuccessMessage.FETCH_SUCCESS, httpConstants.RESPONSE_STATUS.SUCCESS, httpConstants.RESPONSE_CODES.OK)
  }
}
