import * as axios from 'axios'

declare module 'axios' {
	interface AxiosInstance {
		(config: AxiosRequestConfig): Promise<any>
	}
}

declare global {
	namespace Axios {
		interface Response<T = any> { //公司后端接口统一返回格式
			code: number;
			message: string;
			data: T;
		}
		interface List<T = any> { //公司后端列表类型接口统一返回格式
			code: number;
			message: string;
			data: {
				list: T[];
				total_count: number;
				page: number;
				page_size: number;
				[x:string]:any;
			};
		}
	}
	namespace List {
		interface PageParams{
			page:number;
			page_size:number;
		}
	}

	interface Window {
		ethereum:any
		givenProvider:any
	}
}
