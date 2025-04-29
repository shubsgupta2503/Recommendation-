package products

import (
	"encoding/json"
	"os"
	"project/constants"
	"project/products/amazon"
	"project/products/flipkart"
)

func GetProducts(filter ...int) (constants.Resp, error) {
	category := constants.ALL_PRODUCTS
	if len(filter) > 0 {
		category = filter[0]
	}
	var resp constants.Resp

	k, _ := amazon.GetProducts(category)
	resp.Items = append(resp.Items, k.Items...)
	k, _ = flipkart.GetProducts(category)
	resp.Items = append(resp.Items, k.Items...)

	return resp, nil
}

func GetStaples(filter ...int) (constants.Resp, error) {
	data, err := os.ReadFile("products/staples.json")
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

func GetSnacks(filter ...int) (constants.Resp, error) {
	data, err := os.ReadFile("products/snacks_beverages.json")
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

func GetPersonal(filter ...int) (constants.Resp, error) {
	data, err := os.ReadFile("products/personal_care.json")
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

func GetPackaged(filter ...int) (constants.Resp, error) {
	data, err := os.ReadFile("products/packaged_food.json")
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

func GetHousehold(filter ...int) (constants.Resp, error) {
	data, err := os.ReadFile("products/household_care.json")
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

func GetDairy(filter ...int) (constants.Resp, error) {
	data, err := os.ReadFile("products/dairy_eggs.json")
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
