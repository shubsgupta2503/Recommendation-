package constants

type Item struct {
	Title          string `json:"title"`
	AmazonPrice    string `json:"amazon_price"`
	FlipkartPrice  string `json:"flipkart_price"`
	JiomartPrice   string `json:"jiomart_price"`
	AmazonRating   string `json:"amazon_rating"`
	FlipkartRating string `json:"flipkart_rating"`
	JiomartRating  string `json:"jiomart_rating"`
	Reviews        string `json:"reviews"`
	AmazonUrl      string `json:"amazon_url"`
	FlipkartUrl    string `json:"flipkart_url"`
	JiomartUrl     string `json:"jiomart_url"`
	ImageUrl       string `json:"image_url"`
}

type Resp struct {
	Items []Item `json:"items"`
}

type User struct {
	FirstName   string `json:"firstname"`
	LastName    string `json:"lastname"`
	Email       string `json:"email"`
	Password    string `json:"password"`
	PhoneNumber string `json:"phone"`
}

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}
