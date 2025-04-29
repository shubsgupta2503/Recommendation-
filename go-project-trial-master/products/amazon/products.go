package amazon

import (
	"encoding/json"

	// "fmt"
	"os"
	"project/constants"
)

func GetMilkProducts() (constants.Resp, error) {
	data, err := os.ReadFile("products/amazon/milk_products.json")
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
	data, err := os.ReadFile("products/amazon/snacks.json")
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
	data, err := os.ReadFile("products/amazon/grocery.json")
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
		// fmt.Println("MILK ", len(list.Items))
	case constants.SNACKS:
		list, _ = GetSnacks()
	case constants.GROCERIES:
		list, _ = GetGroceries()
		// fmt.Println("Groceries ", len(list.Items))
	default:
		list = constants.Resp{}
	}

	return list, nil
}
