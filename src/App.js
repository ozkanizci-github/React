import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import CategoryList from "./CategoryList";
import Navi from "./Navi";
import ProductList from "./ProductList";
import alertify from "alertifyjs";
import { Switch, Route } from "react-router-dom";
import NotFound from "./NotFound";
import CartList from "./CartList";
import FormDemo1 from "./FormDemo1";
import FormDemo2 from "./FormDemo2";
export default class App extends Component {
  //Array State
  state = { currentCategory: "", products: [], cart: [] };

  componentDidMount() {
    this.getProducts();
  }
  //Category işlemleri
  changeCategory = (category) => {
    this.setState({ currentCategory: category.categoryName });
    this.getProducts(category.id);
  };

  getProducts = (categoryId) => {
    let url = "http://localhost:3000/products";
    if (categoryId) {
      url += "?categoryId=" + categoryId;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => this.setState({ products: data }));
  };

  //Cart işlemleri
  addToCart = (product) => {
    let newCart = this.state.cart;
    var addedItem = newCart.find((c) => c.product.id === product.id);
    if (addedItem) {
      addedItem.quantity += 1;
    } else {
      newCart.push({ product: product, quantity: 1 });
    }
    this.setState({ cart: newCart });
    alertify.success(product.productName + "add to cart", 2);
  };
  //Remove from cart

  removeFromCart = (product) => {
    let newCart = this.state.cart.filter((c) => c.product.id !== product.id);
    this.setState({ cart: newCart });
    alertify.error(product.productName + "rempved from cart", 2);
  };

  render() {
    let categoryInfo = { title: "Category List" };
    let productInfo = { title: "Product List" };
    return (
      <div className="App">
        <Container>
          <Row>
            <Navi removeFromCart={this.removeFromCart} cart={this.state.cart} />
          </Row>
          <Row>
            <Col xs="3">
              <CategoryList
                currentCategory={this.state.currentCategory}
                changeCategory={this.changeCategory}
                info={categoryInfo}
              />
            </Col>
            <Col xs="9">
              <Switch>
                <Route
                  exact
                  path="/"
                  render={(props) => (
                    <ProductList
                      {...props}
                      products={this.state.products}
                      addToCart={this.addToCart}
                      currentCategory={this.state.currentCategory}
                      info={productInfo}
                    />
                  )}
                ></Route>
                <Route
                  exact
                  path="/cart"
                  render={(props) => (
                    <CartList
                      {...props}
                      cart={this.state.cart}
                      removeFromCart={this.removeFromCart}
                    />
                  )}
                ></Route>
                <Route path="/form1" component={FormDemo1}></Route>
                <Route path="/form2" component={FormDemo2}></Route>
                <Route component={NotFound}></Route>
              </Switch>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

//Node.js kuruyoruz.
//npm i - create-react-project indiriyoruz.
//Eklenttileri install ediyoruz.
//Proje folde oluşturuyoruz.
//sonra terminalde ilgili klasöre gidip proje oluşturuyoıruz ve npm start yapıyoruz.
//son open folder proje açıyoruz.
//app.cs, index.cs, logo, ve test.cs siliyoruz ve diğer sayfalarda uzantıları kaldırıyoruz.
//Component yapısıs-
//jsx yapaısı
//npm install bootstrap ekliyoruz sıkışınca bootstapta yoksa reactstrap ekle
//Props: Bir componenette baska componentte data , veri taaşıma yöntemidir.
//State:
