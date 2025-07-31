export default class ProductModel{
    constructor(_id,_name,_desc,_price,_imageUrl){
        this.id=_id;
        this.name=_name;
        this.desc=_desc;
        this.price=_price;
        this.imageUrl=_imageUrl;
    }

    static get(){ //directly call with just class name
        return products;
    }
}

//sample data
var products=[
    new ProductModel(1,'Product1','Description for product 1','150','https://dummyimage.com/200/ffffff/0c0d21&text=Sample+Image'),
    new ProductModel(2,'Product1','Description for product 1','150','https://dummyimage.com/200/ffffff/0c0d21&text=Sample+Image'),
    new ProductModel(3,'Product1','Description for product 1','150','https://dummyimage.com/200/ffffff/0c0d21&text=Sample+Image')
];