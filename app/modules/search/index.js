import Utils from '../../utils'
import { apiSuccessMessage, httpConstants } from '../../common/constants'
import BLManager from './manage'

export default class Index {
  async searchData (request, response) {
    // lhtWebLog('Inside testRoute', request.body, 'testRoute', 0, '')
    console.log("string")
    const [error, getMetersRes] = await Utils.parseResponse(new BLManager().search(request.body))
    if (!getMetersRes) { return Utils.handleError(error, request, response) }
    return Utils.response(response, getMetersRes, apiSuccessMessage.FETCH_SUCCESS, httpConstants.RESPONSE_STATUS.SUCCESS, httpConstants.RESPONSE_CODES.OK)
  }
}

