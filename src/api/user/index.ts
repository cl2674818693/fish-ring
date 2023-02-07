import http from '../http'
import {ActiveInfo,CheckPfpParams,CheckPfpItem} from './types';


class ActivityApi {
    /**
     * @description 获取活动详情
     */
    static activityInfo(params: {id:string}): Promise<Axios.Response<ActiveInfo>> {
        return http.get('/activity/activity-info', { params } )
    }
	/**
	 * @description 检测券
	 */
	static checkCode(params: {code:string}): Promise<Axios.Response> {
		return http.get('/coupons/check-coupon-code', { params } )
	}

	/**
	 * @description pfp列表
	 */
	 static couponsPfpList(params: {coupon_id:number,cursor:string}): Promise<Axios.Response> {
		return http.get('/coupons/coupons-nft-list', { params } )
	}
	/**
	 * @description pfp可兑换商品列表
	 */
	 static checkCouponsPfpList(params:CheckPfpParams): Promise<Axios.List<CheckPfpItem>> {
		return http.get('/coupons/coupons-nft-info', { params } )
	}

}

export default ActivityApi


