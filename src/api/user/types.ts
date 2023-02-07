export interface ActiveInfo {
	id:                number;
    name:              string;
    details_image_url: string;
}

export interface PfpItem {
	token_id:          string;
    uri:               string;
    contract_address:  string;
    last_price:        number;
    nft_name:          string;
    nft_platform_name: string;
    hash:              number;
    nft_id:            number;
    productCount:      number;
}

export interface CheckPfpItem {
	product_id:     number;
	price:          string;
	goods_id:       number;
	show_image_url: string;
	goods_name:     string;
	line_price:     string;
}
export interface CheckPfpParams  extends List.PageParams {
	coupon_id:number
	nft_id:number
}
