import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import './styles.css'

export default class Main extends Component {
    state = {
        products: [],
        productInfo: {},
        page: 1,
    }

    componentDidMount() { //método executado assim que o componente surge em tela
        this.loadProducts();
    }
    loadProducts = async (page = 1) => { // não é possível usar o this se criarmos funções nossas sem arrow-function
        const response = await api.get(`/products?page=${page}`);

        const { docs, ...productInfo } = response.data; // criando as duas ao mesmo tempo
    
        this.setState({ products: docs, productInfo, page });
    };

    prevPage = () => {
        const { page, productInfo } = this.state;

        if (page == 1) return;

        const pageNumber = page - 1;
        
        this.loadProducts(pageNumber);
    }

    nextPage = () => {
        const { page, productInfo } = this.state;

        if (page == productInfo.pages) return;
        
        const pageNumber = page + 1;

        this.loadProducts(pageNumber);
    }

    render() {
        const { products, page, productInfo } = this.state;

        return (
            <div className="product-list">
                {products.map(product => (
                    <article key={product._id}>
                        <strong>{product.title}</strong>
                        <p>{product.description}</p>

                        <Link to={`/products/${product._id}`}>Acessar</Link>
                    </article>
                ))}
                <div className="actions">
                    <button disabled={page == 1} onClick={this.prevPage}>Anterior</button>
                    <button disabled={page == productInfo.pages} onClick={this.nextPage}>Próxima</button>
                </div>
            </div>
        )
    }
}
