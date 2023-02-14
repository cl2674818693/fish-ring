/**
 * 源自iconpark图标库
 * @link https://iconpark.oceanengine.com/home
 */
import {
	Fishing,
	ViewGridDetail,
	Send
} from '@icon-park/vue-next';
export default function installIcons(Vue:any) {
	Vue.component("Fishing", Fishing)
	Vue.component("ViewGridDetail", ViewGridDetail)
	Vue.component("Send", Send)
}
