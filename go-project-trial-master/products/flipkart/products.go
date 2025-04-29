package flipkart

import (
	"encoding/json"
	// "fmt"
	"os"
	"project/constants"
)

// https://www.flipkart.com/search?q=milk+dairy+products&sid=eat%2Czn0&as=on&as-show=on&otracker=AS_QueryStore_OrganicAutoSuggest_1_14_na_na_na&otracker1=AS_QueryStore_OrganicAutoSuggest_1_14_na_na_na&as-pos=1&as-type=RECENT&suggestionId=milk+dairy+products%7CMilk&requestId=8257f51e-a09e-490c-bd13-0d1defef0142&as-searchtext=dairy%20products
// https://www.flipkart.com/food-products/fresh-fruit/pr?sid=eat,w2q,b0g&q=vegetables+and+fruits&otracker=categorytree
// https://www.flipkart.com/search?q=snacks&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off

func GetMilkProducts() (constants.Resp, error) {
	data, err := os.ReadFile("products/flipkart/milk_products.json")
	if err != nil {
		return constants.Resp{}, err
	}
	var res constants.Resp
	err = json.Unmarshal(data, &res)
	// fmt.Println(err)
	if err != nil {
		return constants.Resp{}, err
	}
	return res, nil
}

func GetSnacks() (constants.Resp, error) {
	data, err := os.ReadFile("products/flipkart/snacks.json")
	if err != nil {
		return constants.Resp{}, err
	}
	var res constants.Resp
	err = json.Unmarshal(data, &res)
	// fmt.Println(err)
	if err != nil {
		return constants.Resp{}, err
	}
	return res, nil
}

func GetGroceries() (constants.Resp, error) {
	data, err := os.ReadFile("products/flipkart/grocery.json")
	if err != nil {
		return constants.Resp{}, err
	}
	var res constants.Resp
	err = json.Unmarshal(data, &res)
	// fmt.Println(err)
	if err != nil {
		return constants.Resp{}, err
	}
	return res, nil
}

func GetProducts(filter ...int) (constants.Resp, error) {
	if len(filter) == 0 || filter[0] == 0 {
		var list []constants.Item
		j, _ := GetGroceries()
		k, _ := GetMilkProducts()
		l, _ := GetSnacks()
		list = append(list, j.Items...)
		list = append(list, k.Items...)
		list = append(list, l.Items...)
		return constants.Resp{
			Items: list,
		}, nil
	}
	var list constants.Resp
	switch filter[0] {
	case constants.MILK_PRODUCTS:
		list, _ = GetMilkProducts()
	case constants.SNACKS:
		list, _ = GetSnacks()
	case constants.GROCERIES:
		list, _ = GetGroceries()
	default:
		list = constants.Resp{}
	}

	return list, nil
}
