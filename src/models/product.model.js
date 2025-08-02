export default class ProductModel {
  constructor(_id, _name, _desc, _price, _imageUrl) {
    this.id = _id;
    this.name = _name;
    this.description = _desc;
    this.price = _price;
    this.imageUrl = _imageUrl;
  }

  //to get product
  static get() {
    //directly call with just class name
    return products;
  }

  //to add product
  static add(productObj) {
    let newProduct = new ProductModel(
      products.length + 1,
      productObj.name,
      productObj.description,
      productObj.price,
      productObj.imageUrl
    );
    products.push(newProduct);
  }

  //to get product by id
  static getProductById(id){
    return products.find((p)=>p.id==id); //find returns the first matching element
  }

  //to update product data
  static update(productObj){
    const index=products.findIndex((p)=>p.id==productObj.id);
    products[index]=productObj;
  }
}

//sample data
var products = [
  new ProductModel(
    1,
    "Product1",
    "Description for product 1",
    "150",
    "https://dummyimage.com/200/ffffff/0c0d21&text=Sample+Image"
  ),
  new ProductModel(
    2,
    "Product1",
    "Description for product 1",
    "150",
    "https://dummyimage.com/200/ffffff/0c0d21&text=Sample+Image"
  ),
  new ProductModel(
    3,
    "Product1",
    "Description for product 1",
    "150",
    "https://dummyimage.com/200/ffffff/0c0d21&text=Sample+Image"
  ),
  new ProductModel(
    4,
    "Product1",
    "Description for product 1",
    "150",
    "https://dummyimage.com/200/ffffff/0c0d21&text=Sample+Image"
  ),
  new ProductModel(
    5,
    "Product1",
    "Description for product 1",
    "150",
    "https://dummyimage.com/200/ffffff/0c0d21&text=Sample+Image"
  ),
  new ProductModel(
    6,
    "Product1",
    "Description for product 1",
    "150",
    "https://dummyimage.com/200/ffffff/0c0d21&text=Sample+Image"
  ),
  new ProductModel(
    7,
    "Product1",
    "Description for product 1",
    "150",
    "https://dummyimage.com/200/ffffff/0c0d21&text=Sample+Image"
  ),
];
